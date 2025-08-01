"use client";

import { useState, useCallback } from "react";

interface UseMultiImageUploadOptions {
  maxFiles?: number;
  initialUrls?: string[];
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: string) => void;
}

interface UseMultiImageUploadReturn {
  urls: string[];
  isUploading: boolean;
  uploadError: string | null;
  addUrls: (newUrls: string[]) => void;
  removeUrl: (index: number) => void;
  clearUrls: () => void;
  setUrls: (urls: string[]) => void;
  canUploadMore: boolean;
  remainingSlots: number;
}

export function useMultiImageUpload({
  maxFiles = 10,
  initialUrls = [],
  onUploadComplete,
  onUploadError,
}: UseMultiImageUploadOptions = {}): UseMultiImageUploadReturn {
  const [urls, setUrlsState] = useState<string[]>(initialUrls);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const setUrls = useCallback(
    (newUrls: string[]) => {
      const limitedUrls = newUrls.slice(0, maxFiles);
      setUrlsState(limitedUrls);
      onUploadComplete?.(limitedUrls);
    },
    [maxFiles, onUploadComplete]
  );

  const addUrls = useCallback(
    (newUrls: string[]) => {
      setUrls([...urls, ...newUrls]);
    },
    [urls, setUrls]
  );

  const removeUrl = useCallback(
    (indexToRemove: number) => {
      const updatedUrls = urls.filter((_, index) => index !== indexToRemove);
      setUrls(updatedUrls);
    },
    [urls, setUrls]
  );

  const clearUrls = useCallback(() => {
    setUrls([]);
  }, [setUrls]);

  const handleUploadStart = useCallback(() => {
    setIsUploading(true);
    setUploadError(null);
  }, []);

  const handleUploadComplete = useCallback(
    (newUrls: string[]) => {
      setIsUploading(false);
      addUrls(newUrls);
      setUploadError(null);
    },
    [addUrls]
  );

  const handleUploadError = useCallback(
    (error: string) => {
      setIsUploading(false);
      setUploadError(error);
      onUploadError?.(error);
    },
    [onUploadError]
  );

  const canUploadMore = urls.length < maxFiles;
  const remainingSlots = maxFiles - urls.length;

  return {
    urls,
    isUploading,
    uploadError,
    addUrls,
    removeUrl,
    clearUrls,
    setUrls,
    canUploadMore,
    remainingSlots,
  };
}
