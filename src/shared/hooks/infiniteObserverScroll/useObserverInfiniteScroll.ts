import { useEffect, useRef } from 'react';
import {IUseObserverInfiniteScroll} from "./useObserverInfiniteScroll.types.ts";

/**
 * Хук для реализации бесконечной прокрутки с использованием Intersection Observer API.
 *
 * @param {IUseObserverInfiniteScroll} props - Объект с параметрами для настройки наблюдения.
 * @param {Function} [props.callBack] - Функция, которая будет вызвана при попадании элемента в область наблюдения.
 * @param {React.RefObject<HTMLDivElement>} props.triggerRef - Элемент, который будет вызывать срабатывание callback при попадании в область наблюдения.
 * @param {React.RefObject<HTMLDivElement>} [props.wrapperRef] - Элемент, который будет использоваться как корневой элемент для наблюдения. Если не указан, то как корневой элемент будет использоваться viewport (Экран пользователя).
 * @param {string} [props.rootMargin='100px 0px'] - Отступы к корневому элементу. Например, "100px 0px" будет вызван, когда элемент находится на 100px вниз и 0px вправо от корневого элемента.
 * @param {number | number[]} [props.threshold=1.0] - Пороговое значение. Например, 0.5 будет вызван, когда элемент находится на 50% видимости.
 *
 * @example
 * const MyComponent = () => {
 *   const triggerRef = useRef<HTMLDivElement>(null);
 *   const wrapperRef = useRef<HTMLDivElement>(null);
 *
 *   useObserverInfiniteScroll({
 *     callBack: () => console.log('Element is visible!'),
 *     triggerRef,
 *     wrapperRef,
 *     rootMargin: '100px 0px',
 *     threshold: 0.5
 *   });
 *
 *   return (
 *     <div ref={wrapperRef}>
 *       <div ref={triggerRef}>Scroll down to see the magic happen!</div>
 *     </div>
 *   );
 * };
 */

const useObserverInfiniteScroll = <
    T extends HTMLElement>(
        props: IUseObserverInfiniteScroll<T>
) => {
    const {
        callBack,
        rootMargin = '100px 0px',
        threshold = 1.0,
        triggerRef,
        wrapperRef
    } = props;

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef ? wrapperRef.current : null;
        const triggerElement = triggerRef.current;

        if (callBack) {
            const options: IntersectionObserverInit = {
                root: wrapperElement,
                rootMargin: rootMargin,
                threshold: threshold
            };

            observer.current = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callBack();
                }
            }, options);

            observer.current.observe(triggerElement);
        }

        return () => {
            if (observer.current && triggerElement) {
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callBack, triggerRef, wrapperRef]);

    return { triggerRef, wrapperRef };
};

export default useObserverInfiniteScroll;
