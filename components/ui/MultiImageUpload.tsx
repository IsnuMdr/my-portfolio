// components/ui/MultiImageUpload.tsx
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { UploadDropzone } from "@/lib/utils/uploadthing";
import { X, Plus } from "lucide-react";
import { UploadedFileResponse } from "@/types/uploadthing";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  className?: string;
}

export function MultiImageUpload({
  value = [],
  onChange,
  maxFiles = 10,
  className = "",
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadComplete = useCallback(
    (res: UploadedFileResponse[]) => {
      if (res && res.length > 0) {
        const newUrls = res.map((file) => file.url);
        const updatedUrls = [...value, ...newUrls].slice(0, maxFiles);
        onChange(updatedUrls);
        setIsUploading(false);
        setUploadError(null);
      }
    },
    [value, onChange, maxFiles]
  );

  const handleUploadError = useCallback((error: Error) => {
    console.error("Upload error:", error);
    setUploadError(error.message || "Failed to upload images");
    setIsUploading(false);
  }, []);

  const handleUploadBegin = useCallback(() => {
    setIsUploading(true);
    setUploadError(null);
  }, []);

  const removeImage = useCallback(
    (indexToRemove: number, url: string) => {
      const updatedUrls = value.filter((_, index) => index !== indexToRemove);
      deleteImageOnServer(url).catch((error) => {
        console.error("Failed to delete image from server:", error);
      });
      onChange(updatedUrls);
    },
    [value, onChange]
  );

  const deleteImageOnServer = async (url: string) => {
    await fetch("/api/uploadthing", {
      method: "DELETE",
      body: JSON.stringify({ url }),
    });
  };

  const canUploadMore = value.length < maxFiles;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Existing Images Preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {value.length > 0 &&
          value.map((url, index) => (
            <div key={`${url}-${index}`} className="relative group">
              <div className="aspect-square relative overflow-hidden rounded-lg border-2 border-gray-200">
                <Image
                  src={url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(index, url)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-all duration-200 transform scale-90 hover:scale-100"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        <div className="aspect-square flex flex-col justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors p-5">
          <UploadDropzone
            endpoint="imageUploader"
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
              uploadIcon: () => <Plus className="w-8 h-8" />,
              label:
                value.length > 0
                  ? "Add more images"
                  : "Choose images to upload",
              allowedContent: "Images up to 4MB each",
            }}
          />
        </div>
      </div>

      {/* Upload Area */}
      {canUploadMore && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {value.length > 0
                ? `Add more images (${value.length}/${maxFiles})`
                : `Upload images (max ${maxFiles})`}
            </p>
            {isUploading && (
              <div className="text-sm text-blue-600 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Uploading...
              </div>
            )}
          </div>
        </div>
      )}

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

      {/* Max Files Reached */}
      {!canUploadMore && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            Maximum number of images reached ({maxFiles}/{maxFiles})
          </p>
        </div>
      )}

      {/* Helper Text */}
      <div className="text-xs text-gray-500">
        <p>• Supported formats: JPEG, PNG, WebP</p>
        <p>• Maximum file size: 4MB per image</p>
        <p>• You can upload multiple images at once</p>
      </div>
    </div>
  );
}
