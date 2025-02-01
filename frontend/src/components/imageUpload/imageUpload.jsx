import { CloudUpload, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Progress } from "@/shadcn/components/ui/progress";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/components/ui/card";

const simulateUpload = (file, setProgressCallback) => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (progress >= 100) {
      clearInterval(interval);
      setProgressCallback(file, 100);
    } else {
      setProgressCallback(file, progress);
    }
  }, 500);
};

const ImageUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const updateProgress = (file, progress) => {
    setFilesToUpload((prev) =>
      prev.map((item) =>
        item.File === file ? { ...item, progress } : item
      )
    );
    if (progress === 100) {
      // Replace the old file with the new file in the uploadedFiles state
      setUploadedFiles([file]);
      setFilesToUpload((prev) =>
        prev.filter((item) => item.File !== file)
      );
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      setErrorMessage("You can upload only one image at a time.");
      return;
    }

    // Check if the file is of valid type (png, jpeg, jpg)
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const file = acceptedFiles[0];

    if (!validTypes.includes(file.type)) {
      setErrorMessage("Only PNG, JPEG, or JPG image formats are supported.");
      return;
    }

    setErrorMessage(""); // Clear error if the drop is successful

    const newFiles = acceptedFiles.map((file) => ({
      progress: 0,
      File: file,
      source: null,
    }));
    setFilesToUpload((prev) => [...prev, ...newFiles]);

    // Start simulating upload
    newFiles.forEach((file) => simulateUpload(file.File, updateProgress));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/png, image/jpeg, image/jpg" });

  const removeFile = (file) => {
    setFilesToUpload((prev) => prev.filter((item) => item.File !== file));
    setUploadedFiles((prev) => prev.filter((item) => item !== file));
  };

  const getFileIconAndColor = (file) => {
    return { icon: <CloudUpload className="dark:text-gray-100 text-gray-800" />, color: "text-gray-800" };
  };

  const handleUpload = () => {
    if (filesToUpload.length === 0) {
      setErrorMessage("No image selected for upload.");
    } else {
      // Simulate image upload
      filesToUpload.forEach((file) => simulateUpload(file.File, updateProgress));
    }
  };

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      console.log("Uploaded Files:", uploadedFiles.map((file) => file.name));
    } else {
      console.log("No files uploaded.");
    }
  }, [uploadedFiles]);

  return (
    <Card className="w-[60%] mx-auto dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <label
            {...getRootProps()}
            className="relative flex flex-col items-center justify-center w-[50%] p-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 mx-auto"
          >
            <div className="text-center">
              <div className="border p-2 rounded-md max-w-min mx-auto">
                <CloudUpload size={20} className="text-gray-800" />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold">Drag files</span>
              </p>
              <p className="text-xs text-gray-500">
                Click to upload a single image (PNG or JPEG, under 10 MB)
              </p>
            </div>
          </label>
          <input
            {...getInputProps()}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="flex justify-center items-center w-full mt-2">
            <p className="text-red-500 text-sm">{errorMessage}</p>
          </div>
        )}

        {/* Files to Upload */}
        {filesToUpload.length > 0 && (
          <div>
            <ScrollArea className="h-40">
              <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">
                Files to upload
              </p>
              <div className="space-y-2 pr-3">
                {filesToUpload.map((fileUploadProgress) => (
                  <div
                    key={fileUploadProgress.File.lastModified}
                    className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2"
                  >
                    <div className="flex items-center flex-1 p-2">
                      <div className="text-white">
                        {getFileIconAndColor(fileUploadProgress.File).icon}
                      </div>
                      <div className="w-full ml-2 space-y-1">
                        <div className="text-sm flex justify-between">
                          <p className="text-muted-foreground ">{fileUploadProgress.File.name.slice(0, 25)}</p>
                          <span className="text-xs">{fileUploadProgress.progress}%</span>
                        </div>
                        <Progress
                          value={fileUploadProgress.progress}
                          className={getFileIconAndColor(fileUploadProgress.File).color}
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(fileUploadProgress.File)}
                      className="bg-red-500 text-white transition-all items-center justify-center cursor-pointer px-2 hidden group-hover:flex"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div>
            <p className="font-medium my-2 mt-6 text-muted-foreground text-sm">Uploaded File</p>
            <div className="space-y-2 pr-3">
              {uploadedFiles.map((file) => (
                <div
                  key={file.lastModified}
                  className="flex justify-between gap-2 rounded-lg overflow-hidden border border-slate-100 group hover:pr-0 pr-2 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center flex-1 p-2">
                    <div className="text-white">
                      {getFileIconAndColor(file).icon}
                    </div>
                    <div className="w-full ml-2 space-y-1">
                      <div className="text-sm flex justify-between">
                        <p className="text-muted-foreground ">{file.name.slice(0, 25)}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="bg-red-500 text-white transition-all items-center justify-center px-2 hidden group-hover:flex"
                  >
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-4 flex flex-col items-center">
          {/* Error Message */}
          {errorMessage && (
            <div className="flex justify-center items-center w-full mb-2">
              <p className="text-red-500 text-sm"></p>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className="w-[20%] bg-blue-500 text-white py-2 rounded-lg"
          >
            Upload Image
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
