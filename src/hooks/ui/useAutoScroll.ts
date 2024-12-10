import { useEffect, useRef, useState, useCallback } from 'react';

interface AutoScrollOptions {
  delay?: number;        // Tijd tussen scrolls in ms
  duration?: number;     // Duur van de scroll animatie
  enabled?: boolean;     // Auto-scroll aan/uit
  pauseOnHover?: boolean; // Pauzeren bij hover
}

interface AutoScrollReturn {
  containerRef: React.RefObject<HTMLElement>;
  isScrolling: boolean;
  isPaused: boolean;
  togglePause: () => void;
  scrollNext: () => void;
  scrollPrev: () => void;
}

export const useAutoScroll = (options: AutoScrollOptions = {}): AutoScrollReturn => {
  const {
    delay = 5000,
    duration = 500,
    enabled = true,
    pauseOnHover = true
  } = options;

  const containerRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const animationRef = useRef<number>();

  const scroll = useCallback((targetPosition: number) => {
    if (!containerRef.current) return;

    const startTime = Date.now();
    const startPosition = containerRef.current.scrollLeft;
    const distance = targetPosition - startPosition;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      if (containerRef.current) {
        containerRef.current.scrollLeft = startPosition + (distance * easeInOutCubic(progress));
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsScrolling(false);
      }
    };

    setIsScrolling(true);
    animationRef.current = requestAnimationFrame(animate);
  }, [duration]);

  const scrollNext = useCallback(() => {
    if (!containerRef.current || isScrolling) return;
    
    const container = containerRef.current;
    const targetPosition = container.scrollLeft + container.clientWidth;
    
    if (targetPosition >= container.scrollWidth) {
      scroll(0);
    } else {
      scroll(targetPosition);
    }
  }, [scroll, isScrolling]);

  const scrollPrev = useCallback(() => {
    if (!containerRef.current || isScrolling) return;
    
    const container = containerRef.current;
    const targetPosition = container.scrollLeft - container.clientWidth;
    scroll(Math.max(0, targetPosition));
  }, [scroll, isScrolling]);

  const togglePause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  useEffect(() => {
    if (!enabled || isPaused || isScrolling) return;
    
    timeoutRef.current = setTimeout(scrollNext, delay);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [enabled, isPaused, isScrolling, scrollNext, delay]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;

    const container = containerRef.current;
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pauseOnHover]);

  return {
    containerRef,
    isScrolling,
    isPaused,
    togglePause,
    scrollNext,
    scrollPrev
  };
}; 