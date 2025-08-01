"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { X, Upload } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadComplete = useCallback(
    (res: any[]) => {
      if (res && res.length > 0) {
        onChange(res[0].url);
        setIsUploading(false);
        setUploadError(null);
      }
    },
    [onChange]
  );

  const handleUploadError = useCallback((error: Error) => {
    console.error("Upload error:", error);
    setUploadError(error.message || "Failed to upload image");
    setIsUploading(false);
  }, []);

  const handleUploadBegin = useCallback(() => {
    setIsUploading(true);
    setUploadError(null);
  }, []);

  const removeImage = useCallback(() => {
    onChange("");
  }, [onChange]);

  if (value) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="relative group max-w-lg">
          <div className="aspect-video relative overflow-hidden rounded-lg border-2 border-gray-200">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <button
                type="button"
                onClick={removeImage}
                className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 transform scale-90 hover:scale-100"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={removeImage}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Remove image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {isUploading && (
        <div className="text-sm text-blue-600 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          Uploading...
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors p-5">
        <UploadDropzone
          endpoint="singleImageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          onUploadBegin={handleUploadBegin}
          config={{
            mode: "auto",
          }}
          appearance={{
            container: "border-none bg-transparent",
            uploadIcon: "text-gray-400",
            label: "text-gray-600 text-sm",
            allowedContent: "text-gray-500 text-xs",
            button:
              "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm ut-ready:bg-blue-600 ut-uploading:bg-blue-500",
          }}
          content={{
            uploadIcon: () => <Upload className="w-8 h-8" />,
            label: "Choose an image to upload",
            allowedContent: "Image up to 4MB",
          }}
        />
      </div>

      {/* Upload Error */}
      {uploadError && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <div className="flex">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{uploadError}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                type="button"
                onClick={() => setUploadError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="text-xs text-gray-500">
        <p>• Supported formats: JPEG, PNG, WebP</p>
        <p>• Maximum file size: 4MB</p>
      </div>
    </div>
  );
}
