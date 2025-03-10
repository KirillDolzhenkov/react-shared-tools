import { useEffect }           from 'react';
import type { UseResizeProps } from './resize.types';

function useResize(props: UseResizeProps) {
  const {
    callback,
    targetRef: element,
  } = props;

  useEffect(() => {
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[], observer: ResizeObserver) => {
      for (let entry of entries) {
        callback(entry, observer);
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [element]);
}

export default useResize;