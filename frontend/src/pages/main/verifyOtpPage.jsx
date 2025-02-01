import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BackgroundBeams } from "@/shadcn/components/ui/background-beams";
import { Button } from "@/shadcn/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const VerifyOtpPage = () => {
    const navigate = useNavigate();
    const { error, isLoading, verifyEmail, user } = useAuthStore();
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        const newCode = [...code];
        if (value.length > 1) {
            // Handle pasted input
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            // Focus on the last input field after pasting
            const lastFilledIndex = pastedCode.findIndex((digit) => digit === "");
            const focusIndex = lastFilledIndex === -1 ? 5 : lastFilledIndex;
            inputRefs.current[focusIndex]?.focus();
        } else {
            // Handle single-digit input
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const submitCode = async (e) => {
        if (e) e.preventDefault(); // Prevent form submission if event exists

        const verificationCode = code.join("");
        if (verificationCode.length !== 6) {
            toast.error("Please enter a valid 6-digit code.");
            return;
        }

        try {
            await verifyEmail(verificationCode);
            console.log(user.role)
            if (user.role === "doctor") {
            navigate("/doctor/dashboard");
            } else {
            navigate("/patient/dashboard");
            }
            toast.success("Email verified successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Verification failed. Please try again.");
        }
    };

    const handleSubmit = (e) => {
        submitCode(e);
    };

    useEffect(() => {
        if (code.every((digit) => digit !== "")) {
            submitCode(); // Automatically submit when all fields are filled
        }
    }, [code]);

    return (
        <>
            <Toaster />
            <div className="flex items-center justify-center h-screen overflow-x-hidden">
                <BackgroundBeams />
                <div className="max-w-xl m-4 p-8 rounded-lg border-gray-200 border-2 bg-transparent animate-fade-in-right">
                    <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text">
                        Verify Your Email
                    </h2>
                    <p className="text-center mb-6">Enter the 6-digit code sent to your email address.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={(e) => {
                                        e.preventDefault(); // Prevent default paste behavior
                                        const pastedData = e.clipboardData.getData("text");
                                        handleChange(index, pastedData);
                                    }}
                                    className="w-12 h-12 text-center text-2xl font-bold bg-transparent text-white border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                                />
                            ))}
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit" className="bg-gray-800 text-white hover:bg-gray-700">
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default VerifyOtpPage;