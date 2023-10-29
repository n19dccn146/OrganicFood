import { useRef, useEffect, useCallback } from 'react';

const useDebounce = (func: any, waitFor = 300) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const savedFunc = useRef(func);

  useEffect(() => {
    savedFunc.current = func;
  }, [waitFor]);

  return useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    timer.current = setTimeout(() => savedFunc.current?.(...args), waitFor);
  }, []);
};

export default useDebounce;
