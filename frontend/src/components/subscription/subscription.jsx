import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/components/ui/card";
import { Button } from "@/shadcn/components/ui/button";

const Certificate = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setError(""); // Reset error on new selection

    if (uploadedFile) {
      const allowedFormats = ["png", "jpeg", "jpg"];
      const fileExtension = uploadedFile.name.split(".").pop().toLowerCase();

      if (!allowedFormats.includes(fileExtension)) {
        setError("Invalid file format. Only PNG, JPEG, and JPG are allowed.");
        setFile(null);
      } else {
        setFile(uploadedFile);
      }
    }
  };

  return (
    <Card className="w-[60%] mx-auto dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload IMC Certificate</CardTitle>
      </CardHeader>
      <div className="flex flex-col items-center text-white py-8">
        <Card className="dark:bg-gray-700 w-[70%] text-center rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold">IMC Certificate Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-6">
              Please upload your IMC certificate in PNG, JPEG, or JPG format.
            </p>

            {/* IMC Certificate Upload */}
            <div className="mb-6">
              <label className="block text-left text-sm dark:text-gray-400 mb-3">
                Upload IMC Certificate (PNG, JPEG, JPG)
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className={`w-full py-3 px-4 text-sm text-gray-700 border rounded-md dark:bg-gray-900 hover:border-blue-500 transition-all ${
                    error ? "border-red-500" : "border-gray-300"
                  }`}
                  accept=".png,.jpeg,.jpg"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
              {file && <p className="mt-2 text-green-500">{file.name}</p>}
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <Button
              className="mt-6 w-full py-3 px-6 rounded-md shadow-md transform hover:scale-105 transition-transform duration-300"
              disabled={!file || error}
            >
              Submit Certificate
            </Button>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
};

export default Certificate;
