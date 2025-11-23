import { useMemo, useRef, useEffect } from 'react';
import { DebouncedState }             from './useDebounceCallback.types.ts';

/**
 * Custom hook for debouncing a function — delays its execution until a specified
 * number of milliseconds have passed since the last time it was invoked.
 *
 * Returns a wrapped function with additional control methods:
 * - `isPending()` — checks whether a debounced call is currently scheduled
 * - `cancel()`    — cancels the scheduled call
 * - `flush()`     — immediately executes the function (if it was scheduled)
 *
 * @template F Type of the function being debounced
 * @param {F} callback The function to debounce
 * @param {number} [delay=300] Delay in milliseconds
 * @returns {DebouncedState<F>} Debounced function with control methods
 *
 * @example
 * const debouncedSearch = useDebounceCallback((query: string) => {
 *   fetchUsers(query);
 * }, 500);
 *
 * // Calls will be delayed by 500 ms
 * debouncedSearch('react');
 * debouncedSearch('react hook'); // previous call will be cancelled
 *
 * if (debouncedSearch.isPending()) {
 *   console.log('Request has not been sent yet...');
 *   debouncedSearch.flush(); // send immediately
 * }
 *
 * debouncedSearch.cancel(); // cancel completely
 */

function useDebounceCallback<F extends (...args: any[]) => ReturnType<F>>(
  callback: F,
  delay = 300,
): DebouncedState<F> {
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  return useMemo(() => {
    const debounced = (...args: Parameters<F>) => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        callback?.(...args);
      }, delay);
    };

    const func = debounced as DebouncedState<F>;

    func.isPending = () => {
      return !!timerRef.current;
    };

    func.cancel = () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    func.flush = () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        callback?.();
      }
    };

    return func;
  }, [callback, delay]);
}

export default useDebounceCallback;