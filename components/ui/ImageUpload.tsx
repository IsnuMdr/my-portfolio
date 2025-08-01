// src/components/ImageUpload.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { UploadDropzone } from "@/lib/utils/uploadthing";

interface ImageUploadProps {
  value?: string;
  onChange: (url?: string) => void;
  disabled?: boolean;
  className?: string;
  showPreview?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  disabled,
  className = "",
  showPreview = true,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const deleteValue = async (value: string) => {
    await fetch("/api/uploadthing", {
      method: "DELETE",
      body: JSON.stringify({ url: value }),
    });
  };

  const handleRemove = (value: string) => {
    onChange(undefined);
    deleteValue(value);
  };

  // Show preview if image exists and showPreview is true
  if (value && showPreview) {
    return (
      <div
        className={`relative w-full h-96 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 ${className}`}
      >
        <Image
          src={value}
          layout="fill"
          alt="Uploaded image"
          className="object-cover"
        />
        {!disabled && (
          <button
            onClick={() => handleRemove(value)}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
            type="button"
            title="Remove image"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Upload completed:", res);
          if (res && res.length > 0) {
            onChange(res[0].ufsUrl);
          }
          setIsUploading(false);
        }}
        onUploadError={(error) => {
          console.error("Upload error:", error);
          alert(`Upload failed: ${error.message}`);
          setIsUploading(false);
        }}
        onUploadBegin={(name) => {
          console.log("Upload started for:", name);
          setIsUploading(true);
        }}
        config={{
          mode: "auto",
        }}
        appearance={{
          container: `border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors ${
            disabled || isUploading
              ? "opacity-50 cursor-not-allowed"
              : "hover:border-gray-400 hover:bg-gray-50"
          }`,
          uploadIcon: "text-gray-400",
          label: "text-gray-600 text-sm font-medium",
          allowedContent: "text-gray-500 text-xs",
        }}
        content={{
          label: isUploading
            ? "Uploading..."
            : "Click to upload or drag and drop",
          allowedContent: "PNG, JPG, GIF up to 4MB",
        }}
        disabled={disabled || isUploading}
      />

      {/* Show current image URL if exists but preview is disabled */}
      {value && !showPreview && (
        <div className="mt-2 p-2 bg-gray-100 rounded border">
          <p className="text-xs text-gray-600">Current image:</p>
          <p className="text-xs text-blue-600 truncate">{value}</p>
          {!disabled && (
            <button
              onClick={() => handleRemove(value)}
              className="mt-1 text-xs text-red-600 hover:text-red-800"
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}
