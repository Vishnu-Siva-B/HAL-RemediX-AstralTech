import React, { useState, useEffect, useRef } from "react";
import { Menu, Package2, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import signinImg from "../../static/main/images/patient.jpg";
import ImageUpload from "../../components/imageUpload/imageUpload";
import PatientProfile from "@/components/Profile/patientProfile";
import AccountSecurity from "../../components/accountSecurity/accountSecurity";
import CloseAccount from "../../components/closeAccount/closeAccount";
import { BackgroundBeams } from "@/shadcn/components/ui/background-beams";

const PatientProfiles = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  const sections = [
    { id: "profile", component: <PatientProfile /> },
    { id: "photo", component: <ImageUpload /> },
    { id: "account-security", component: <AccountSecurity /> },
    { id: "close-account", component: <CloseAccount /> },
  ];

  const sectionRefs = useRef(sections.map(() => React.createRef()));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelectedSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const scrollToSection = (id) => {
    const section = sectionRefs.current.find((ref) => ref.current.id === id);
    if (section?.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
    }
    setSelectedSection(id);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden md:flex flex-row items-center gap-5 lg:gap-6">
          <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <Package2 className="h-6 w-6" />
            <span className="sr-only">HealthCare</span>
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/dashboard")}>
            Dashboard
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/doctor")}>
            Doctors
          </a>
          <a href="#" className="text-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/profile")}>
            Profile
          </a>
          <a href="#" className="text-muted-foreground transition-colors hover:text-foreground" onClick={() => navigate("/patient/support")}>
            Support
          </a>
          
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Toggle Button */}
        <div className={`md:hidden bg-theme-color rounded-full fixed p-4 top-4 left-4 z-50 shadow-md ${isSidebarOpen ? "hidden" : "block"}`}>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-30" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        {/* Sidebar */}
        <div ref={sidebarRef} className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-100 dark:bg-gray-800 shadow-md transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
          <div className="flex flex-col items-start p-6 space-y-6">
          <div className="flex flex-col items-center space-y-4 mt-12"> {/* Increased margin-top from mt-6 to mt-10 */}
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img src={signinImg} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
                Vishnu Siva B
              </h2>
            </div>
            <nav className="flex flex-col w-full space-y-4">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(section.id); }}
                   className={`font-semibold hover:text-theme-color px-2 py-2 w-full text-left transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedSection === section.id ? "bg-gray-300 dark:bg-gray-900 text-theme-color" : ""}`}>
                  {section.id.replace("-", " ").toUpperCase()}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <BackgroundBeams className="-z-10 fixed" />

        {/* Main Content */}
        <div className="w-full p-8 space-y-6 lg:p-0 lg-space-y-0 overflow-y-auto">
          {sections.map((section, index) => (
            <div key={section.id} id={section.id} ref={sectionRefs.current[index]} className="min-h-screen min-w-screen flex flex-col items-center justify-center">
              {section.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientProfiles;
