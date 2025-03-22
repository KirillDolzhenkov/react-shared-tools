import { useCallback, useRef } from 'react';

interface ControlFunctions {
  isPending(): boolean;
}

export type DebouncedState<T extends (...args: any[]) => ReturnType<T>> = ((
    ...args: Parameters<T>
) => void) & ControlFunctions;

function useDebounceCallback<T extends(
    ...args: any[]) => ReturnType<T>>(
    callback: T,
    delay = 300,
): DebouncedState<T> {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFuncInstance = useCallback((...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(...args);
      timerRef.current = null;
    }, delay);
  }, [callback, delay]);

  const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => {
    debouncedFuncInstance(...args);
  };

  wrappedFunc.isPending = () => {
    return !!timerRef.current;
  };

  return wrappedFunc;
}

export default useDebounceCallback;