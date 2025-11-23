import { useCallback, useRef } from 'react';
import type { DebouncedState } from './useDebounceCallback.types.ts';

function useDebounceCallback<T extends(
  ...args: any) => ReturnType<T>>(
  callback: T,
  delay = 300,
): DebouncedState<T> {
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const debouncedFuncInstance = useCallback((...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback?.(...args);
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