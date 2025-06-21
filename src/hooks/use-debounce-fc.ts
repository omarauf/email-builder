import { useRef, useState, useEffect, useCallback } from 'react';

type DebouncedFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export function useDebounceFC<T extends (...args: any[]) => void>(
  callback: T,
  delay = 500
): DebouncedFunction<T> {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback<DebouncedFunction<T>>(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedCallback;
}

export function useDebounce<T>(value: T, onChange: (value: T) => T, delay = 500) {
  const [innerValue, setInnerValue] = useState(value);

  const debounceValue = useDebounceFC((debouncedValue: T) => {
    const n = onChange(debouncedValue);
    setInnerValue(n);
  }, delay);

  useEffect(() => setInnerValue(value), [value]);

  return { innerValue, setInnerValue, debounceValue };
}
