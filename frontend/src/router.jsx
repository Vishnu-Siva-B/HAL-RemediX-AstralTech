import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const DoctorProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth,user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-otp" />;
  }

  if (user.role === "patient") {
    return <Navigate to="/patient/dashboard" />;
  }
  return children;
}

const PatientProtectedRoute = ({ children }) => {
  const { isAuthenticated, isCheckingAuth,user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-otp" />;
  }

  if (user.role === "doctor") {
    return <Navigate to="/doctor/dashboard" />;
  }
  return children;
}

const RedirectAuthenticatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    if (user.role === "doctor") {
      return <Navigate to="/doctor/dashboard" />;
    } else if (user.role === "patient") {
      return <Navigate to="/patient/dashboard" />;
    }
  }
    return children;
}


const Loader = React.lazy(() => import('./components/loader/loader.jsx'));
const NotFound = React.lazy(() => import('./components/404/404.jsx'));


// Main Module routers
const LandingPage = React.lazy(() => import('./pages/main/landing.jsx'));
const VerifyOtpPage = React.lazy(() => import('./pages/main/verifyOtpPage.jsx'));
const SignInPage = React.lazy(() => import('./pages/main/signinPage.jsx'));
const SignupPage = React.lazy(() => import('./pages/main/patientSignUp.jsx'));
const DoctorSignUp = React.lazy(() => import ('./pages/main/doctorSignUp.jsx'));

//Doctor Module routers
const BookedPatient = React.lazy(() => import('./pages/doctor/patientAppointment.jsx'));
const Dashboard = React.lazy(() => import('./pages/doctor/doctorDashboard.jsx'));
const DoctorProfile = React.lazy(() => import('./pages/doctor/doctorProfile.jsx'));
const DoctorMeet = React.lazy(() => import('./pages/doctor/doctorMeet.jsx'));

// patient module routers
const PatientDashboard = React.lazy(() => import ('./pages/patient/patientDashboard.jsx'));
const BookedDoctors = React.lazy(() => import ('./pages/patient/bookedDoctors.jsx'));
const PatientProfile = React.lazy(() => import ('./pages/patient/patientProfile.jsx'));
const Support = React.lazy(() => import ('./pages/patient/support.jsx'));
const VideoMeet = React.lazy(() => import ('./pages/patient/patientMeet.jsx'));

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/signin" element={<RedirectAuthenticatedUser><SignInPage /></RedirectAuthenticatedUser> } />
        <Route path="/patient/signup" element={<RedirectAuthenticatedUser><SignupPage /></RedirectAuthenticatedUser>} />
        <Route path="/doctor/signup" element={<RedirectAuthenticatedUser><DoctorSignUp /></RedirectAuthenticatedUser>} />


        <Route path="/doctor/dashboard" element={<DoctorProtectedRoute><Dashboard /></DoctorProtectedRoute>} />
        <Route path="/doctor/profile" element={<DoctorProtectedRoute><DoctorProfile /></DoctorProtectedRoute>} />
        <Route path="/doctor/appointment" element={<DoctorProtectedRoute><BookedPatient /></DoctorProtectedRoute>} />
        <Route path="/doctor/meet" element={<DoctorProtectedRoute><DoctorMeet /></DoctorProtectedRoute>} />

        <Route path="/patient/dashboard" element={<PatientProtectedRoute><PatientDashboard /></PatientProtectedRoute>} />
        <Route path="/patient/doctor" element={<PatientProtectedRoute><BookedDoctors /></PatientProtectedRoute>} />
        <Route path="/patient/profile" element={<PatientProtectedRoute><PatientProfile /></PatientProtectedRoute>} />
        <Route path="/patient/support" element={<PatientProtectedRoute><Support /></PatientProtectedRoute>} />
        <Route path="/patient/meet" element={<PatientProtectedRoute><VideoMeet /></PatientProtectedRoute>} />

        <Route path="*" element={<NotFound />} /> 
      </Routes>
    </Suspense>
  );
};

export default Router;
