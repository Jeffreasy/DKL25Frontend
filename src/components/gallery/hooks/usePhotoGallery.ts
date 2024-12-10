import { useState, useCallback, useEffect } from 'react';
import type { Photo } from '../types';

export const usePhotoGallery = (photos: Photo[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev: number) => (prev === 0 ? photos.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, photos.length]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev: number) => (prev === photos.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, photos.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Space') setIsAutoPlaying((prev: boolean) => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  return {
    currentIndex,
    isAnimating,
    isAutoPlaying,
    setIsAutoPlaying,
    handlePrevious,
    handleNext,
    touchStart,
    setTouchStart,
    setCurrentIndex
  };
}; 