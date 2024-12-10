import { useState, useEffect, useCallback, useRef } from 'react';

// Voor waarden (voor FAQ component)
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Voor callbacks (voor admin functionaliteit)
export const useDebounceCallback = (delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback((callback: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [delay]);
};