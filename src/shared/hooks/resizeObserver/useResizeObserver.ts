import { useEffect }              from 'react';
import type { UseResizeCallback } from './useResizeObserver.types';

function useResize(element?: Element | null, callback?: UseResizeCallback) {
  useEffect(() => {
    if (!element) {
      return;
    }
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      for (let entry of entries) {
        callback?.(entry, observer);
      }
    });
    resizeObserver.observe(element);
    return () => {
      resizeObserver.disconnect();
    };
  }, [element]);
}
export default useResize;