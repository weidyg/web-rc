import { useState, useEffect } from 'react';

type CountdownProps = {
    initialCount: number;
    onTiming?: (count: number) => void;
};

const useCountdown = ({ initialCount, onTiming }: CountdownProps) => {
    const [count, setCount] = useState(initialCount);
    const [timing, setTiming] = useState(false);

    const start = () => {
        setTiming(true);
    };

    const stop = () => {
        setTiming(false);
        setCount(initialCount);
    };

    useEffect(() => {
        let interval: number = 0;
        if (timing) {
            interval = window.setInterval(() => {
                setCount((preSecond) => {
                    if (preSecond <= 1) {
                        setTiming(false);
                        clearInterval(interval);
                        // 重置秒数
                        return initialCount;
                    }
                    return preSecond - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timing, initialCount]);

    useEffect(() => {
        if (onTiming) {
            onTiming(count);
        }
    }, [count, onTiming]);

    return { count, timing, start, stop };
};

export default useCountdown;