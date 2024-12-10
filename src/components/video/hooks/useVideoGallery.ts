import { useState, useCallback } from 'react';
import type { Video } from '../data';

export const useVideoGallery = (videos: Video[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev: number) => (prev === 0 ? videos.length - 1 : prev - 1));
  }, [videos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev: number) => (prev === videos.length - 1 ? 0 : prev + 1));
  }, [videos.length]);

  return {
    currentIndex,
    isLoading,
    setIsLoading,
    handlePrevious,
    handleNext,
    setCurrentIndex
  };
}; 