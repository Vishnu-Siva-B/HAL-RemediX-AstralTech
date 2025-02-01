import { User } from "../models/user.model.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail
} from "../email/email.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    const token = generateTokenAndSetCookie(res, existingUser._id);
    console.log(token);

    existingUser.lastLogin = Date.now();
    await existingUser.save();

    if (isPasswordCorrect) {
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: { ...existingUser._doc, password: undefined }
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid password" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.body;
    const user = await User.findOne({
      verificationToken: verificationToken,
      verificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (!user || user.role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token or admin cannot verify email"
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    sendWelcomeEmail(user.firstName + " " + user.lastName, user.email);

    res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, role, firstName, lastName, ...otherDetails } =
      req.body;
    console.log("Received Data:", req.body);
    console.log("Extracted Fields:", {
      email,
      firstName,
      lastName,
      ...otherDetails
    });

    if (role === "admin") {
      return res
        .status(400)
        .json({ success: false, message: "Cannot sign up as admin directly" });
    }

    // Check top-level required fields
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "email, password, firstName, and lastName are required"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Define role-based required fields
    let requiredFields = ["phno"];

    if (role === "patient") {
      requiredFields.push("city", "state", "pincode");
    }

    if (role === "doctor") {
      requiredFields.push("doctorIdNo", "speciality");
    }

    console.log(requiredFields);

    // Validate other required fields dynamically
    for (const field of requiredFields) {
      if (!otherDetails[field]) {
        return res
          .status(400)
          .json({ success: false, message: `${field} is required` });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default profile image
    const profileImage =
      role === "doctor"
        ? "default_doctor_image.jpg"
        : "default_patient_image.jpg";

    // Generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Create new user
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      role,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      profileImage,
      ...otherDetails
    });

    // Generate token and send email
    generateTokenAndSetCookie(res, newUser._id);
    await sendVerificationEmail(
      `${firstName} ${lastName}`,
      newUser.email,
      verificationToken
    );
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...newUser._doc, password: undefined }
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const signout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Signout successful" });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    sendPasswordResetEmail(
      user.firstName + " " + user.lastName,
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully"
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { resetToken, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    sendPasswordResetSuccessEmail(
      user.firstName + " " + user.lastName,
      user.email
    );

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: user
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
