import { useState } from "react";

interface UseImageUploadProps {
  initialValue?: string;
  onUploadComplete?: (url: string) => void;
  onUploadError?: (error: Error) => void;
}

export function useImageUpload({
  initialValue = "",
  onUploadComplete,
  onUploadError,
}: UseImageUploadProps = {}) {
  const [imageUrl, setImageUrl] = useState<string>(initialValue);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
    setIsUploading(false);
    setError(null);
    onUploadComplete?.(url);
  };

  const handleUploadError = (err: Error) => {
    setIsUploading(false);
    setError(err.message);
    onUploadError?.(err);
  };

  const handleUploadBegin = () => {
    setIsUploading(true);
    setError(null);
  };

  const removeImage = () => {
    setImageUrl("");
    setError(null);
  };

  const resetUpload = () => {
    setImageUrl(initialValue);
    setIsUploading(false);
    setError(null);
  };

  return {
    imageUrl,
    isUploading,
    error,
    setImageUrl,
    handleUploadComplete,
    handleUploadError,
    handleUploadBegin,
    removeImage,
    resetUpload,
    hasImage: !!imageUrl,
  };
}
