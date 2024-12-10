import React from 'react';
import MainSlider from './MainSlider';
import ThumbnailSlider from './ThumbnailSlider';
import { photos } from './photos.data';
import { usePhotoGallery } from './hooks/usePhotoGallery';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PhotoGallery: React.FC = () => {
  const {
    currentIndex,
    isAnimating,
    isAutoPlaying,
    setIsAutoPlaying,
    handlePrevious,
    handleNext,
    touchStart,
    setTouchStart,
    setCurrentIndex
  } = usePhotoGallery(photos);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      diff > 0 ? handleNext() : handlePrevious();
      setTouchStart(null);
    }
  };

  return (
    <section 
      className="py-16 px-5 bg-white font-['Roboto_Slab']"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Title Section met animatie */}
      <div className="text-center mb-12 relative pb-8 opacity-0 animate-fade-in">
        <h2 className="text-[clamp(2rem,4vw,2.75rem)] text-gray-900 font-semibold mb-3">
          Bekijk onze Foto's
        </h2>
        <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 mb-4">
          De Koninklijke Loop 2024
        </p>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[3px] bg-primary rounded-full" />
      </div>

      {/* Gallery Container met controls */}
      <div className="max-w-[1200px] mx-auto">
        <div className="relative">
          <MainSlider
            photos={photos}
            currentIndex={currentIndex}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isAnimating={isAnimating}
          />

          {/* Auto-play control */}
          <button
            onClick={() => setIsAutoPlaying((prev: boolean) => !prev)}
            className="absolute bottom-4 right-4 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all"
            aria-label={isAutoPlaying ? 'Pause slideshow' : 'Start slideshow'}
          >
            {isAutoPlaying ? (
              <PauseIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <PlayArrowIcon className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ 
                width: `${(currentIndex / (photos.length - 1)) * 100}%`,
                transition: isAutoPlaying ? 'width 5s linear' : 'width 0.3s ease-out'
              }}
            />
          </div>
        </div>

        <ThumbnailSlider
          photos={photos}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
        />

        {/* Keyboard controls info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Gebruik de pijltjestoetsen om te navigeren, spatiebalk voor autoplay</p>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery; 