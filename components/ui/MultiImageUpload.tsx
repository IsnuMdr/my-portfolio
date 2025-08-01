// src/components/MultiImageUpload.tsx
"use client";

import Image from "next/image";
import { X, Plus, GripVertical } from "lucide-react";
import { ImageItem } from "@/lib/hooks/useMultiImageUpload";
import { UploadDropzone } from "@/lib/utils/uploadthing";

interface MultiImageUploadProps {
  images: ImageItem[];
  onUploadBegin: (imageId: string) => void;
  onUploadComplete: (imageId: string, url: string) => void;
  onUploadError: (imageId: string, error: Error) => void;
  onRemoveImage: (imageId: string) => void;
  onAddImage: () => string | null;
  canAddMore: boolean;
  disabled?: boolean;
  className?: string;
  maxImages?: number;
}

export default function MultiImageUpload({
  images,
  onUploadBegin,
  onUploadComplete,
  onUploadError,
  onRemoveImage,
  onAddImage,
  canAddMore,
  disabled = false,
  className = "",
  maxImages = 10,
}: MultiImageUploadProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Existing Images */}
        {images.map((image, index) => (
          <div key={image.id} className="relative group">
            {image.url ? (
              // Uploaded Image Preview
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                <Image
                  src={image.url}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {!disabled && (
                  <>
                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md opacity-0 group-hover:opacity-100"
                      type="button"
                      title="Remove image"
                    >
                      <X size={14} />
                    </button>

                    {/* Server Image Indicator */}
                    {image.isFromServer && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
                        Server
                      </div>
                    )}

                    {/* Drag Handle - hanya tampil jika bukan sedang upload */}
                    {!image.isFromServer && (
                      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white rounded p-1 opacity-0 group-hover:opacity-100 cursor-move">
                        <GripVertical size={14} />
                      </div>
                    )}
                  </>
                )}

                {/* Image Number */}
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </div>
              </div>
            ) : (
              // Upload Dropzone
              <div className="aspect-square">
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      onUploadComplete(image.id, res[0].url);
                    }
                  }}
                  onUploadError={(error) => {
                    onUploadError(image.id, error);
                  }}
                  onUploadBegin={() => {
                    onUploadBegin(image.id);
                  }}
                  config={{ mode: "auto" }}
                  appearance={{
                    container: `h-full border-2 border-dashed border-gray-300 rounded-lg p-2 ${
                      disabled || image.isUploading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-gray-400 hover:bg-gray-50"
                    }`,
                    uploadIcon: "text-gray-400",
                    label: "text-gray-600 text-xs font-medium",
                    allowedContent: "text-gray-500 text-xs",
                  }}
                  content={{
                    label: image.isUploading ? "Uploading..." : "Upload",
                    allowedContent: "PNG, JPG up to 4MB",
                  }}
                  disabled={disabled || image.isUploading}
                />

                {/* Remove Empty Slot Button */}
                {!disabled && !image.isUploading && (
                  <button
                    onClick={() => onRemoveImage(image.id)}
                    className="absolute -top-2 -right-2 bg-gray-500 text-white rounded-full p-1 hover:bg-gray-600 transition-colors text-xs"
                    type="button"
                    title="Remove slot"
                  >
                    <X size={12} />
                  </button>
                )}

                {/* Error Display */}
                {image.error && (
                  <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1 rounded-b-lg">
                    Error: {image.error}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add New Image Button */}
        {canAddMore && !disabled && (
          <button
            onClick={onAddImage}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-colors group"
            type="button"
          >
            <Plus
              className="text-gray-400 group-hover:text-gray-600 mb-1"
              size={24}
            />
            <span className="text-xs text-gray-500 font-medium">Add Image</span>
            <span className="text-xs text-gray-400">
              {images.length}/{maxImages}
            </span>
          </button>
        )}
      </div>

      {/* Summary */}
      {images.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <p>
            {images.filter((img) => img.url).length} of {images.length} images
            uploaded
            {images.some((img) => img.isUploading) && " (uploading...)"}
          </p>
        </div>
      )}
    </div>
  );
}
