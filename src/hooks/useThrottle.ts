import { useEffect, useState } from 'react';

export const useThrottle = <T>(value: T, delay: number): T => {
    const [throttledValue, setThrottledValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setThrottledValue(value);
        }, delay);

        // Очистка таймера, если значение или задержка изменяются
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return throttledValue;
};