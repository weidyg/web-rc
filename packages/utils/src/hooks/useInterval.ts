import { useState, useEffect } from 'react';

type IntervalCallback = () => Promise<void>;

const useInterval = (callback: IntervalCallback, delay: number | null) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;

    const tick = async () => {
      try {
        await callback();
      } catch (error) {
        console.error('Interval callback error:', error);
      }
    };

    if (delay !== null && isActive) {
      intervalId = window.setInterval(tick, delay);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [callback, delay, isActive]);

  const start = () => {
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(false);
  };

  return { start, stop, isActive };
};

export default useInterval;
