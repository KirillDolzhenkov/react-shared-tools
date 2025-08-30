import { useEffect }              from 'react';
import type { UseResizeCallback } from './useResizeObserver.types';

/**
 * Хук для наблюдения за изменением размеров DOM-элемента с использованием ResizeObserver API.
 *
 * @param {Element | null | undefined} element - DOM-элемент, за размерами которого будет вестись наблюдение. Обычно получается через React `ref`. Если `null` или `undefined`, хук ничего не делает.
 * @param {UseResizeCallback} [callback] - Функция, вызываемая при изменении размеров наблюдаемого элемента. Получает объект `ResizeObserverEntry` и `ResizeObserver` в качестве аргументов.
 *
 * @example
 * import { useRef } from 'react';
 * import useResize from './useResize';
 *
 * const MyComponent = () => {
 *   const divRef = useRef<HTMLDivElement>(null);
 *
 *   useResize(divRef.current, (entry) => {
 *     const { width, height } = entry.contentRect;
 *     console.log(`Размеры элемента: ${width}px x ${height}px`);
 *   });
 *
 *   return (
 *     <div ref={divRef} style={{ width: '100px', height: '100px', resize: 'both', overflow: 'auto' }}>
 *       Измените мой размер!
 *     </div>
 *   );
 * };
 */

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