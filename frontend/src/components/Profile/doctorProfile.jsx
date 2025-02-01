import React, { useState } from "react";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/shadcn/components/ui/card";

import axios from "axios";

const StudentProfile = () => {
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        headline: "",
        grade: "",
        board:"",
        city:"",
        state:"",
        country: "India", // Default to India
        pincode:"",
        stream:"",
        phoneNumber: "",
        dob: ""
      });
      const [errors, setErrors] = useState({});

      const validateAndSave = (e) => {
        e.preventDefault();
        const newErrors = {};
    
        // Validation
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.headline.trim()) newErrors.headline = "Headline is required.";
        if (!formData.grade.trim()) newErrors.grade = "Grade selection is required.";
        if (!formData.stream.trim()) newErrors.stream = "Stream selection is required.";
        if (!formData.board.trim()) newErrors.board = "Board selection is required.";
        if (!formData.city.trim()) newErrors.city = "City selection is required.";
        if (!formData.state.trim()) newErrors.state = "State selection is required.";
        if (!formData.country.trim()) newErrors.country = "Country selection is required.";
        if (!formData.pincode.trim()) newErrors.pincode = "Pincode selection is required.";
    
        if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = "Valid 10-digit phone number is required.";
        }
        if (!formData.dob.trim()) newErrors.dob = "Date of birth is required.";
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
          console.log("Form Data:", formData);
          alert("Profile saved successfully!");
        }
      };
    
      const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));

        if (field === "pincode" && value.length === 6) {
          fetchPincodeDetails(value);
        }
    };

    const fetchPincodeDetails = async (pincode) => {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
  
        const data = response.data;
  
        if (data[0].Status === "Success") {
          const { Division, Circle } = data[0].PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            city: Division || "",
            state: Circle || "",
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            pincode: "Invalid Pincode",
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          pincode: "Error fetching pincode details",
        }));
      }
    };
    
    
  return (
    <Card className="dark:bg-gray-800 w-[60%]">
    <CardHeader>
      <CardTitle>Public Profile</CardTitle>
    </CardHeader>
    <CardContent>
      <form className="space-y-6" onSubmit={validateAndSave}>
        {/* Name */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:flex-1">
          <label className="block text-sm font-medium">
            First Name 
          </label>
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                handleInputChange("firstName", e.target.value)
              }
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </p>
            )}
          </div>
          <div className="w-full md:flex-1">
          <label className="block text-sm font-medium">
            Last Name 
          </label>
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                handleInputChange("lastName", e.target.value)
              }
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        
        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium">
            Phone Number
          </label>
          <Input
            placeholder="1234567890"
            value={formData.phoneNumber}
            onChange={(e) =>
              handleInputChange("phoneNumber", e.target.value)
            }
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-10">
        {/* grade */}
        <div>
        <label className="text-sm font-medium">
            Specialty
          </label>
          <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Cardiology">Cardiology</SelectItem>
                <SelectItem value="Neurology">Neurology</SelectItem>
                <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                <SelectItem value="Dermatology">Dermatology</SelectItem>
                <SelectItem value="Gastroenterology">Gastroenterology</SelectItem>
                <SelectItem value="Oncology">Oncology</SelectItem>
                <SelectItem value="Radiology">Radiology</SelectItem>
                <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                <SelectItem value="Obstetrics and Gynecology">Obstetrics and Gynecology</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">
              {errors.grade}
            </p>
          )}
        </div>

       
        
        {/* stream */}
        <div>
          <label className="text-sm font-medium">
            Doctor ID Number
          </label>
          <input
            type="text"
            value={formData.stream} // Change this to the corresponding field for Doctor ID
            onChange={(e) => handleInputChange("stream", e.target.value)} // Update the field name as needed
            className="w-full py-3 px-4 text-sm text-gray-700 border rounded-md dark:bg-gray-900 hover:border-blue-500 transition-all"
            placeholder="Enter Doctor ID Number"
            required
          />
          {errors.stream && (
            <p className="text-red-500 text-sm mt-1">
              {errors.stream}
            </p>
          )}
        </div>


          {/* Date of Birth */}
          <div>
          <label className="block text-sm font-medium">
            Date of Birth
          </label>
          <Input
            type="date"
            value={formData.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>
        </div>

        <div className="flex flex-wrap gap-10">

              {/* City */}
              <div>
                <label className="block text-sm font-medium">
                  City
                </label>
                
                <Select
                value={formData.city}
                onValueChange={(value) =>
                  handleInputChange("city", value)
                }
              >
                <SelectTrigger
                >
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Arakkonam">Arakkonam</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city}
                  </p>
                )}
              </div>

              {/* State/Province */}
              <div>
                <label className="block text-sm font-medium">
                  State/Province
                </label>
                <Select
                value={formData.state}
                onValueChange={(value) =>
                  handleInputChange("state", value)
                }
              >
                <SelectTrigger
                >
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="TamilNadu">Tamil Nadu</SelectItem>
                    <SelectItem value="AndhraPradesh">Andhra Pradesh</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state}
                  </p>
                )}
              </div>


        {/* Country */}
        <div>
          <label className="block text-sm font-medium">
            Country
          </label>
          <Input
            placeholder="e.g India"
            value={formData.country}
            onChange={(e) =>
              handleInputChange("country", e.target.value)
            }
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country}
            </p>
          )}
        </div>


        {/* Pincode */}
        <div>
          <label className="block text-sm font-medium">
            Pincode
          </label>
          <Input
            placeholder="e.g 600XXX"
            value={formData.pincode}
            onChange={(e) =>
              handleInputChange("pincode", e.target.value)
            }
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pincode}
            </p>
          )}
        </div>
        </div>

        {/* Save Button */}
        <Button type="submit" className="mt-4 w-full md:w-auto">
          Save
        </Button>
      </form>
    </CardContent>
  </Card>
  )
}

export default StudentProfile