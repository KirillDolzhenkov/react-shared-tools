import { useMemo, useRef, useEffect }           from 'react';
import type { ThrottledState, ThrottleOptions } from './useThrottleCallback.types.ts';

/**
 * Custom hook for throttling a function — limits the rate at which it can be called.
 * Guarantees that the function is executed at most once every `delay` milliseconds.
 *
 * Fully compatible with lodash.throttle behavior, including `leading` and `trailing` edges.
 *
 * Returns a wrapped function with additional control methods:
 * - `isPending()` — checks whether a throttled (trailing) call is currently scheduled
 * - `cancel()`    — cancels any pending trailing call and resets the throttle
 * - `flush()`     — immediately executes the function with the last passed arguments
 *
 * @template F Type of the function being throttled
 * @param {F} callback The function to throttle
 * @param {number} delay Throttle interval in milliseconds (minimum time between calls)
 * @param {object} [options]
 * @param {boolean} [options.leading=true]  Execute on the leading edge (first call in series)
 * @param {boolean} [options.trailing=true] Execute on the trailing edge (after delay)
 * @returns {ThrottledState<F>} Throttled function with control methods
 *
 * @example
 * // Classic scroll handler — no more than once every 200ms
 * const handleScroll = useThrottleCallback(() => {
 *   console.log('Scroll:', window.scrollY);
 * }, 200);
 *
 * window.addEventListener('scroll', handleScroll);
 *
 * @example
 * // Resize with trailing only (common pattern)
 * const handleResize = useThrottleCallback(() => {
 *   recalculateLayout();
 * }, 100, { leading: false });
 *
 * @example
 * // Force immediate execution
 * if (handleResize.isPending()) {
 *   console.log('Layout update is delayed — forcing now');
 *   handleResize.flush(); // executes immediately with last arguments
 * }
 *
 * // Cancel pending update (e.g. on component unmount)
 * handleResize.cancel();
 */

function useThrottleCallback<F extends (...args: any[]) => ReturnType<F>>(
  callback: F,
  delay: number            = 300,
  options: ThrottleOptions = {},
): ThrottledState<F> {
  const {
          leading  = true,
          trailing = true,
        } = options;

  const timerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastExecTimeRef = useRef<number>(0);
  const pendingArgsRef  = useRef<Parameters<F> | null>(null);
  const callbackRef     = useRef(callback);

  callbackRef.current   = callback;

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [delay]);

  return useMemo(() => {
    const execute = (args: Parameters<F>) => {
      callbackRef.current?.(...args);
      lastExecTimeRef.current = Date.now();
    };

    const throttled = (...args: Parameters<F>) => {
      const now     = Date.now();
      const elapsed = now - lastExecTimeRef.current;

      if (!leading && lastExecTimeRef.current === 0) {
        lastExecTimeRef.current = now;
      }

      const remaining = delay - elapsed;

      if (trailing) {
        pendingArgsRef.current = args;
      }

      if (remaining <= 0 || !leading) {
        if (timerRef.current != null) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }

        if (leading || lastExecTimeRef.current !== 0) {
          execute(args);
        }
        return;
      }

      if (timerRef.current == null) {
        timerRef.current = setTimeout(() => {
          timerRef.current = null;

          if (trailing && pendingArgsRef.current != null) {
            const argsToUse        = pendingArgsRef.current;
            pendingArgsRef.current = null;
            execute(argsToUse);
          }
        }, remaining);
      }
    };

    const func = throttled as ThrottledState<F>;

    func.isPending = () => {
      return timerRef.current != null || pendingArgsRef.current != null;
    };

    func.cancel = () => {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      pendingArgsRef.current = null;
    };

    func.flush = () => {
      if (pendingArgsRef.current != null) {
        const args             = pendingArgsRef.current;
        pendingArgsRef.current = null;

        if (timerRef.current != null) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }

        execute(args);
      }
    };

    return func;
  }, [delay, leading, trailing]);
}

export default useThrottleCallback;