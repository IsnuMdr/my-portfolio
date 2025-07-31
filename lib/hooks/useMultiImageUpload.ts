import { useState } from "react";

export interface ImageItem {
  id: string;
  url: string;
  isUploading?: boolean;
  error?: string;
}

interface UseMultiImageUploadProps {
  maxImages?: number;
  onUploadComplete?: (images: ImageItem[]) => void;
  onUploadError?: (error: Error, imageId: string) => void;
}

export function useMultiImageUpload({
  maxImages = 10,
  onUploadComplete,
  onUploadError,
}: UseMultiImageUploadProps = {}) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploadingCount, setUploadingCount] = useState(0);

  // Generate unique ID for each image
  const generateId = () =>
    `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // Add a new image slot
  const addImageSlot = () => {
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return null;
    }

    const newId = generateId();
    const newImage: ImageItem = {
      id: newId,
      url: "",
      isUploading: false,
    };

    setImages((prev) => [...prev, newImage]);
    return newId;
  };

  // Handle upload start
  const handleUploadBegin = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, isUploading: true, error: undefined }
          : img
      )
    );
    setUploadingCount((prev) => prev + 1);
  };

  // Handle upload complete
  const handleUploadComplete = (imageId: string, url: string) => {
    setImages((prev) => {
      const updated = prev.map((img) =>
        img.id === imageId
          ? { ...img, url, isUploading: false, error: undefined }
          : img
      );

      onUploadComplete?.(updated.filter((img) => img.url));
      return updated;
    });
    setUploadingCount((prev) => prev - 1);
  };

  // Handle upload error
  const handleUploadError = (imageId: string, error: Error) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId
          ? { ...img, isUploading: false, error: error.message }
          : img
      )
    );
    setUploadingCount((prev) => prev - 1);
    onUploadError?.(error, imageId);
  };

  // Remove image
  const removeImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  // Update image URL (for external updates)
  const updateImageUrl = (imageId: string, url: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === imageId ? { ...img, url } : img))
    );
  };

  // Clear all images
  const clearAllImages = () => {
    setImages([]);
    setUploadingCount(0);
  };

  // Reorder images
  const reorderImages = (startIndex: number, endIndex: number) => {
    setImages((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  };

  // Get uploaded images only
  const getUploadedImages = () =>
    images.filter((img) => img.url && !img.isUploading);

  // Get image URLs only
  const getImageUrls = () => getUploadedImages().map((img) => img.url);

  return {
    images,
    uploadingCount,
    addImageSlot,
    handleUploadBegin,
    handleUploadComplete,
    handleUploadError,
    removeImage,
    updateImageUrl,
    clearAllImages,
    reorderImages,
    getUploadedImages,
    getImageUrls,
    canAddMore: images.length < maxImages,
    hasImages: images.length > 0,
    hasUploadedImages: getUploadedImages().length > 0,
    isUploading: uploadingCount > 0,
  };
}
