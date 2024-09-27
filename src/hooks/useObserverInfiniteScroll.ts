import { MutableRefObject, useEffect, useRef } from 'react';

type CSSLength = 'auto' | `${number}%` | `${number}em` | `${number}px` | `${number}rem`;

interface IObserverOptions {
    root: HTMLElement | null;
    rootMargin: `${CSSLength} ${CSSLength} ${CSSLength} ${CSSLength}` | `${CSSLength} ${CSSLength}` | CSSLength;
    threshold: number;
}

type PropsOptions = Omit<IObserverOptions, 'root'>;

export interface IUseObserverInfiniteScroll extends Partial<PropsOptions> {
    callBack?: () => void;
    triggerRef: MutableRefObject<HTMLDivElement>;
    wrapperRef?: MutableRefObject<HTMLDivElement>;
}

/**
 * @param {Object} props - Объект с параметрами для настройки наблюдения.
 * @param {Function} props.callBack - Функция, которая будет вызвана при попадании элемента в область наблюдения.
 * @param {React.MutableRefObject<HTMLDivElement>} props.triggerRef - Элемент, который будет вызывать срабатывание callback при попадании в область наблюдения.
 * @param {React.MutableRefObject<HTMLDivElement>} [props.wrapperRef] - Элемент, который будет использоваться как корневой элемент для наблюдения. Если не указан, то как корневой элемент будет использоваться viewport (Экран пользователя).
 * @param {string} props.rootMargin - Отступы к корневому элементу. Например, "100px 0px" будет вызван, когда элемент находится на 100px вниз и 0px вправо от корневого элемента.
 * @param {number} props.threshold - Пороговое значение. Например, 0.5 будет вызван, когда элемент находится на 50% видимости.
 */

export const useObserverInfiniteScroll = (props: IUseObserverInfiniteScroll) => {
    const { callBack, rootMargin = '100px 0px', threshold = 1.0, triggerRef, wrapperRef } = props;
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef ? wrapperRef.current : null;
        const triggerElement = triggerRef.current;

        if (callBack) {
            const options: IObserverOptions = {
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
