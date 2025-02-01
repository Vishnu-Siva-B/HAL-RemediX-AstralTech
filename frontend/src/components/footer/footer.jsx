// src/components/footer/Footer.jsx

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/components/ui/avatar";
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="flex flex-col lg:flex-row justify-evenly items-center">
        {/* Left Side: Contact Information */}
        <div className="flex flex-col items-center space-y-4"> {/* Adjust layout for brand name and social icons */}
          <div className="flex items-center space-x-6">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" /> {/* Replace with desired profile image URL */}
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-2xl font-semibold text-gray-100">HealthCare</span>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-500 text-2xl"
            >
              <FaYoutube />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 text-2xl"
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        {/* Right Side: Contact Details */}
        <div className="flex flex-col mt-6 lg:mt-0 space-y-6 ml-6">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p>Phone: +123 456 7890</p>
          <p>Email: contact@healthcare.com</p>
          <p>Address: 123 Health St, Wellness City, 12345</p>
          <p>Pincode: 12345</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

