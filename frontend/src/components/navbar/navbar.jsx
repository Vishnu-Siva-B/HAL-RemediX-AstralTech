// TopNavBar.jsx
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/components/ui/avatar";
import { Button } from "@/shadcn/components/ui/button";
import { Link } from "react-router-dom";

const TopNavBar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-lg bg-white sticky top-0 z-10">
      {/* Left Section: Avatar Image and Brand Name */}
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" /> {/* Replace with desired profile image URL */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <span className="text-xl font-bold text-gray-800">Healthcare</span> {/* Brand Name */}
      </div>

      {/* Right Section: Nav Items */}
      <ul className="flex items-center space-x-6">
        <li>
          <a
            href="#home"
            className="text-gray-600 hover:text-green-500 hover:shadow-md hover:shadow-green-400 transition-all duration-300 font-medium"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-gray-600 hover:text-green-500 hover:shadow-md hover:shadow-green-400 transition-all duration-300 font-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-gray-600 hover:text-green-500 hover:shadow-md hover:shadow-green-400 transition-all duration-300 font-medium"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#faq"
            className="text-gray-600 hover:text-green-500 hover:shadow-md hover:shadow-green-400 transition-all duration-300 font-medium"
          >
            FAQ
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-gray-600 hover:text-green-500 hover:shadow-md hover:shadow-green-400 transition-all duration-300 font-medium"
          >
            Contact
          </a>
        </li>
        {/* signin Button */}
        <li>
                  
        <Button asChild className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
          <Link to="/signin">signin</Link>
        </Button>
        </li>
      </ul>
    </nav>
  );
};

export default TopNavBar;
