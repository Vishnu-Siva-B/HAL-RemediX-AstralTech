import React from "react";
import TopNavBar from "../../components/navbar/navbar";
import landingImage from "../../static/main/images/image.png";
import aboutImage from "../../static/main/images/about.png"; // Import About Us section image
import { Button } from "@/shadcn/components/ui/button"; // Import ShadCN button
import { FaSyringe, FaRobot, FaCalendarAlt, FaComments, FaPills, FaFileMedical, FaShoppingCart, FaHeadset } from 'react-icons/fa'; // Font Awesome icons
import Footer from "../../components/footer/Footer"; // Import the Footer component
import { motion } from "framer-motion"; // Framer Motion for animations
import { useNavigate } from "react-router-dom";


const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0 } },
};


const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each item's animation
    },
  },
};

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top Navigation Bar */}
      <TopNavBar />

      {/* Full-Width Image with Button */}
      <div className="relative w-full h-screen">
        <img
          src={landingImage}
          alt="Landing Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <p className="bg-green-500 text-3xl text-gray-700 font-bold text-center p-6 max-w-5xl rounded-xl bg-opacity-60">Welcome to RemediX! Get AI-powered health insights, remedies, doctor recommendations, and one-on-one video consultations
             </p>
          <Button className="bg-green-500 hover:bg-green-600 text-gray-700 font-semibold px-8 py-4 text-xl rounded-lg shadow-lg"
            onClick={() => navigate("/signin")}
            >
            Know Your Health
          </Button>
        </div>
      </div>


      {/* About Us Section */}
      <motion.section
        className="w-full bg-gray-100 py-16 px-6 lg:px-16"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        <h2 className="text-4xl font-bold text-center mb-10">About Us</h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Left Content */}
          <motion.div className="lg:w-1/2">
            <p className="text-xl text-gray-700 leading-relaxed">
Welcome to RemediX – Your AI-Powered Health Companion!,At RemediX, we make RemediX simple and accessible. Our advanced AI helps you identify potential health conditions based on your symptoms and provides expert-backed remedies. We also connect you with the right specialists, ensuring you get the best medical guidance tailored to your needs.
            </p>
            <p className="mt-6 text-xl text-gray-700 leading-relaxed">
Looking for a one-on-one consultation? Easily request a session with a doctor, who will set the time and fee. Once confirmed, pay securely and connect via a seamless video call. Your health is our priority—quick, reliable, and hassle-free! Have health-related questions? Our intelligent chatbot is here to provide instant answers and guidance. Plus, you can request a one-on-one consultation with a doctor, pay securely, and connect via video call. Your health, simplified and always within reach! 💙








            </p>
          </motion.div>

            {/* Right Image */}
            <motion.div
            className="lg:w-1/2 flex justify-center"
            variants={fadeInVariant}
          >
            <img
              src={aboutImage}
              alt="About Us"
              className="h-[50vh] w-auto rounded-lg shadow-md"
            />
          </motion.div>
        </div>
        </motion.section>

      {/* Services Section */}
      <motion.section
      className="w-full py-16 px-6 lg:px-16 bg-gray-100"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        variants={staggerContainer}
      >
        {[
          {
            icon: <FaSyringe />,
            title: "Symptom Checker",
            desc: "Use our AI-driven tool to check your symptoms and get insights.",
          },
          {
            icon: <FaRobot />,
            title: "AI-driven Diagnosis",
            desc: "Get accurate health diagnoses with the help of AI technology.",
          },
          {
            icon: <FaCalendarAlt />,
            title: "Appointment Scheduling",
            desc: "Schedule your appointments easily through our platform.",
          },
          {
            icon: <FaComments />,
            title: "Telemedicine Consultations",
            desc: "Connect with RemediX professionals remotely via video consultations.",
          },
          {
            icon: <FaPills />,
            title: "Prescription Refills",
            desc: "Request prescription refills easily and quickly through our system.",
          },
          {
            icon: <FaFileMedical />,
            title: "Health Articles/Blogs",
            desc: "Stay updated with the latest health tips, news, and advice from our experts.",
          },
          {
            icon: <FaShoppingCart />,
            title: "Medication Delivery",
            desc: "Get your prescribed medications delivered straight to your door.",
          },
          {
            icon: <FaHeadset />,
            title: "Chat Support/Customer Assistance",
            desc: "Reach out to our customer support team for help whenever you need it.",
          },
        ].map((service, index) => (
          <motion.div
            className="flex items-center gap-6"
            key={index}
            variants={fadeInVariant}
          >
            <div className="text-4xl text-green-500">{service.icon}</div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-lg text-gray-700 mt-2">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>

        {/* FAQ Section */}
      <motion.section
        className="w-full py-16 px-6 lg:px-16 bg-gray-100"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-4xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* FAQ Item */}
          {[
            {
              question: "What is telemedicine and how does it work?",
              answer:
                "Telemedicine allows RemediX providers to consult with patients remotely via video or phone calls. It's convenient and ensures timely care.",
            },
            {
              question: "Are AI-driven diagnoses reliable?",
              answer:
                "AI-based tools analyze vast datasets to provide accurate diagnoses. They complement traditional care but are not a substitute for a doctor.",
            },
            {
              question: "How can I schedule an appointment online?",
              answer:
                "Use our appointment scheduling feature to select your preferred date and time. You'll receive a confirmation email once booked.",
            },
          ].map((faq, index) => (
            <div className="border-b border-gray-300 pb-4" key={index}>
              <button
                className="w-full text-left text-xl font-semibold text-gray-800 flex justify-between items-center"
                onClick={(e) => {
                  e.currentTarget.nextSibling.classList.toggle("hidden");
                }}
              >
                {faq.question}
                <span className="text-green-500 text-2xl">+</span>
              </button>
              <motion.div
                className="hidden mt-2 text-lg text-gray-600"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {faq.answer}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Footer Section */}
      <Footer />

    </div>
  );
};

export default LandingPage;
