import {
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE
} from "./emailTemplates.js";
import { transporter } from "./email.config.js";

export const sendVerificationEmail = async (name, email, verificationToken) => {
  const mailOptions = {
    from: `Vishnu Siva <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    )
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending verification email", error);
    throw new Error(`Error sending verification email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (name, email) => {
  const mailOptions = {
    from: `Vishnu Siva <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Welcome to our app",
    html: WELCOME_TEMPLATE.replace("{userName}", name)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email", error);
    throw new Error(`Error sending welcome email: ${error.message}`);
  }
};

export const sendPasswordResetEmail = async (name, email, resetURL) => {
  const mailOptions = {
    from: `Vishnu Siva <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Password reset",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error(`Error sending password reset email: ${error.message}`);
  }
};

export const sendPasswordResetSuccessEmail = async (name, email) => {
  const mailOptions = {
    from: `Vishnu Siva <${process.env.MAIL_USERNAME}>`,
    to: email,
    subject: "Password changed",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password changed email sent: ", info.messageId);
  } catch (error) {
    console.error("Error sending password changed email", error);
    throw new Error(`Error sending password changed email: ${error.message}`);
  }
};
