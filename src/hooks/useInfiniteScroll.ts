import { useEffect } from 'react';

export interface IUseInfiniteScroll {
  callBack?: () => void;
  distanceToBottom?: number;
}

/**
 * Хук для реализации бесконечной прокрутки.
 *
 * @param {IUseInfiniteScroll} props - Объект с параметрами для настройки бесконечной прокрутки.
 * @param {Function} [props.callBack] - Функция, которая будет вызвана, когда пользователь приблизится к нижней части страницы.
 * @param {number} [props.distanceToBottom=100] - Расстояние от нижней части страницы, при котором будет вызван callBack. По умолчанию 100 пикселей.
 *
 * @example
 * const MyComponent = () => {
 *   useInfiniteScroll({
 *     callBack: () => console.log('Reached the bottom!'),
 *     distanceToBottom: 200
 *   });
 *
 *   return (
 *     <div>
 *       <p>Scroll down to see the magic happen!</p>
 *     </div>
 *   );
 * };
 */

export const useInfiniteScroll = (props: IUseInfiniteScroll) => {
  const { callBack, distanceToBottom = 100 } = props;

  useEffect(() => {
    const handleScroll = () => {
      const TOTAL_PAGE_HEIGHT = document.documentElement.scrollHeight;
      const CURRENT_DISTANCE_FROM_TOP = document.documentElement.scrollTop;
      const VISIBLE_REGION = window.innerHeight;

      if (TOTAL_PAGE_HEIGHT - (VISIBLE_REGION + CURRENT_DISTANCE_FROM_TOP) < distanceToBottom) {
        callBack?.();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [callBack, distanceToBottom]);
};
