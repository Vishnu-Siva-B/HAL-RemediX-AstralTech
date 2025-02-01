import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "patient", "doctor"],
      required: true
    },
    lastsignin: {
      type: Date,
      default: Date.now,
      required: function () {
        return this.role !== "admin"; // Only required for non-admin users
      }
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: function () {
        return this.role !== "admin"; // Only required for non-admin users
      }
    },
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpiresAt: {
      type: Date
    },
    verificationToken: {
      type: String
    },
    verificationTokenExpiresAt: {
      type: Date
    },
    firstName: {
      type: String,
      required: function () {
        return this.role === "patient" || this.role === "doctor"; // Required for patient and doctor
      }
    },
    lastName: {
      type: String,
      required: function () {
        return this.role === "patient" || this.role === "doctor"; // Required for patient and doctor
      }
    },
    phno: {
      type: String,
      required: function () {
        return this.role === "patient" || this.role === "doctor"; // Required for patient and doctor
      }
    },
    city: {
      type: String,
      required: function () {
        return this.role === "patient"; // Required only for patients
      }
    },
    state: {
      type: String,
      required: function () {
        return this.role === "patient"; // Required only for patients
      }
    },
    pincode: {
      type: String,
      required: function () {
        return this.role === "patient"; // Required only for patients
      }
    },
    profileImage: {
      type: String,
      default: function () {
        if (this.role === "doctor") {
          return "default_doctor_profile_image_url"; // Default image for doctor
        } else if (this.role === "patient") {
          return "default_patient_profile_image_url"; // Default image for patient
        }
      },
      required: function () {
        return this.role === "patient" || this.role === "doctor"; // Profile image is required for both patient and doctor
      }
    },
    doctorIdNo: {
      type: String,
      required: function () {
        return this.role === "doctor"; // Required only for doctors
      }
    },
    speciality: {
      type: String,
      required: function () {
        return this.role === "doctor"; // Required only for doctors
      }
    }
    
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
