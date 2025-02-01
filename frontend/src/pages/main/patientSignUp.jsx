import React, { useState } from "react";
import { Input } from "@/shadcn/components/ui/input.jsx";
import { Label } from "@/shadcn/components/ui/label.jsx";
import { Toaster, toast } from "react-hot-toast";
import signinImg from "../../static/main/images/signup.jpg";
import { BackgroundBeams } from "@/shadcn/components/ui/background-beams";
import { useAuthStore  } from "@/store/authStore";

import { useNavigate } from "react-router-dom";

const patientSignupPage = () => {
    const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "patient",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phno: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const { signup, isLoading, error } = useAuthStore();

  // Handle Input Change
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Validate Inputs
  const validateFields = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
      if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email.";
    } else if (step === 2) {
      if (!formData.password.trim()) newErrors.password = "Password is required.";
      if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required.";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
      if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters long.";
    } else if (step === 3) {
      if (!formData.phno.trim()) newErrors.phno = "Phone number is required.";
      if (!/^\d{10}$/.test(formData.phno)) newErrors.phno = "Enter a valid 10-digit phone number.";
      if (!formData.city.trim()) newErrors.city = "City is required.";
      if (!formData.state.trim()) newErrors.state = "State is required.";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required.";
      if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to the Next Step
  const handleNext = () => {
    if (validateFields()) {
      setStep(step + 1);
    } else {
      toast.error("Please fill in all required fields correctly.");
    }
  };

  // Move to Previous Step
  const handleBack = () => setStep(step - 1);

  // Handle Final Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        await signup(formData);
        toast.success("Signup successful!");
        navigate("/verify-otp"); 
        // Optionally, you can redirect the user to another page after successful signup
        // history.push("/doctor/dashboardboard");
      } catch (error) {
        toast.error(error.message || "Signup failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Toaster />
      <div
        className="flex items-center justify-center h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${signinImg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <BackgroundBeams />
        <div className="max-w-md z-50 w-full mx-auto p-6 md:p-8 bg-white dark:bg-black rounded-2xl shadow-lg">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white">Welcome to RemediX</h2>
          <p className="text-gray-600 text-sm mt-2 dark:text-gray-300">Sign up as User</p>

          {/* Progress Bar */}
          <div className="mt-4 mb-8">
            <div className="relative w-full h-2 bg-gray-300 rounded-full">
              <div className="absolute h-2 bg-cyan-500 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">Step {step} of 3</p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <LabelInput name="firstName" label="First Name" value={formData.firstName} error={errors.firstName} onChange={handleInputChange} />
                <LabelInput name="lastName" label="Last Name" value={formData.lastName} error={errors.lastName} onChange={handleInputChange} />
                <LabelInput name="email" label="Email Address" value={formData.email} error={errors.email} onChange={handleInputChange} type="email" />
                <button type="button" onClick={handleNext} className="w-full h-10 bg-cyan-500 text-white rounded-md font-medium mt-4">
                  Next &rarr;
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <LabelInput name="password" label="Password" value={formData.password} error={errors.password} onChange={handleInputChange} type="password" />
                <LabelInput name="confirmPassword" label="Confirm Password" value={formData.confirmPassword} error={errors.confirmPassword} onChange={handleInputChange} type="password" />
                <div className="flex space-x-4 mt-4">
                  <button type="button" onClick={handleBack} className="w-full h-10 bg-gray-300 text-black rounded-md font-medium">
                    &larr; Back
                  </button>
                  <button type="button" onClick={handleNext} className="w-full h-10 bg-cyan-500 text-white rounded-md font-medium">
                    Next &rarr;
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <LabelInput name="phno" label="Phone Number" value={formData.phno} error={errors.phno} onChange={handleInputChange} />
                <LabelInput name="city" label="City" value={formData.city} error={errors.city} onChange={handleInputChange} />
                <LabelInput name="state" label="State" value={formData.state} error={errors.state} onChange={handleInputChange} />
                <LabelInput name="pincode" label="Pincode" value={formData.pincode} error={errors.pincode} onChange={handleInputChange} />
                <div className="flex justify-between space-x-4 mt-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-neutral-300 text-black rounded-md w-1/2 h-10 font-medium"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 h-10 bg-cyan-500 text-white rounded-md font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

// Reusable Label & Input Component
const LabelInput = ({ name, label, value, error, onChange, type = "text" }) => (
  <div className="mb-4">
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} value={value} onChange={(e) => onChange(name, e.target.value)} placeholder={label} type={type} />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default patientSignupPage;