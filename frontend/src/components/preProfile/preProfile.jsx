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

const PreProfile = () => {
      const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        headline: "",
        grade: "",
        board:"",
        city:"",
        state:"",
        country:"",
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
    };
    
  return (
    <Card className="dark:bg-gray-800">
    <CardHeader>
      <CardTitle>Public Profile</CardTitle>
    </CardHeader>
    <CardContent>
      <form className="space-y-6" onSubmit={validateAndSave}>
        {/* Name */}
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:flex-1">
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

        {/* Headline */}
        <div>
          <label className="block text-sm font-medium">
            Headline
          </label>
          <Input
            placeholder="e.g Architect"
            value={formData.headline}
            onChange={(e) =>
              handleInputChange("headline", e.target.value)
            }
          />
          {errors.headline && (
            <p className="text-red-500 text-sm mt-1">
              {errors.headline}
            </p>
          )}
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
            Grade
          </label>
          <Select
            value={formData.grade}
            onValueChange={(value) =>
              handleInputChange("grade", value)
            }
          >
            <SelectTrigger
            >
              <SelectValue placeholder="Select a Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="10">10th</SelectItem>
                <SelectItem value="12">12th</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">
              {errors.grade}
            </p>
          )}
        </div>

        {/* board */}
          <div>
          <label className="text-sm font-medium">
            Board
          </label>
          <Select
            value={formData.board}
            onValueChange={(value) =>
              handleInputChange("board", value)
            }
          >
            <SelectTrigger
            >
              <SelectValue placeholder="Select a Board" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="APBIE">APBIE</SelectItem>
                <SelectItem value="TNSBE">TNSBE</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.board && (
            <p className="text-red-500 text-sm mt-1">
              {errors.board}
            </p>
          )}
        </div>
        
        {/* stream */}
        <div>
          <label className="text-sm font-medium">
            Stream
          </label>
          <Select
            value={formData.stream}
            onValueChange={(value) =>
              handleInputChange("stream", value)
            }
          >
            <SelectTrigger
            >
              <SelectValue placeholder="Select a Stream" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MPC">MPC</SelectItem>
                <SelectItem value="BPC">BPC</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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

      
        {/* Save Button */}
        <Button type="submit" className="mt-4 w-full md:w-auto">
          Save
        </Button>
      </form>
    </CardContent>
  </Card>
  )
}

export default PreProfile