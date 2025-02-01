import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shadcn/components/ui/card";
import { Label } from "@/shadcn/components/ui/label";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/shadcn/components/ui/alert";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore  } from "@/store/authStore";
import { Toaster, toast } from "react-hot-toast";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const { login, error } = useAuthStore();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const response = await login(email, password);
      if (response) {
        toast.success("Signin successful!");
      } else {
        toast.error("Signin failed! Please try again.");
      }
    } else {
        toast.error("Signin failed! Please try again.");
    }
  };

  const handleCloseAlert = () => {
    setAlert({ type: "", message: "" });
  };


  return (<>
          <Toaster />
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      {alert.message && (
        <Alert
          className={`w-full max-w-lg ${
            alert.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          } p-4 rounded-lg flex items-center relative`}
        >
          {alert.type === "success" ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
          <div>
            <AlertTitle>{alert.type === "success" ? "Success" : "Error"}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </div>
          <button
            type="button"
            onClick={handleCloseAlert}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-md text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <XCircle size={20} />
          </button>
        </Alert>
      )}

      <Card className="w-full max-w-xl p-6 border-0 lg:rounded-none lg:border-gray-200 lg:border-l-2 bg-transparent">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-4">
            <CardTitle className="text-5xl font-bold">Login</CardTitle>
            <CardDescription className="text-md">
              Enter your email and password to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-md">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-md"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="password" className="text-md">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <Button type="submit" className="w-full py-3 text-md font-semibold">
                Login
              </Button>
            </div>
          </CardContent>
        </form>
        <div className="mt-6">
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? 
              <Link to="/patient/signup" className="px-1 text-blue-600 font-semibold">Sign up</Link>
            </p>
            <p className="text-gray-600">
            Are you a Doctor?
              <Link to="/doctor/signup" className="px-1 text-blue-600 font-semibold">Sign up</Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
};

export default Signin;
