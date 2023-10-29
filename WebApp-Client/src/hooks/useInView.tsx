import React from 'react';

export const useInView = (target: any, options: IntersectionObserverInit) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);
  const [observer, setObserver] = React.useState(null);

  React.useEffect(() => {
    const callback = (entries) => {
      setIsIntersecting(entries[0].isIntersecting);
    };

    observer?.disconnect();

    if (target.current) {
      const _observer = new IntersectionObserver(callback, options);
      _observer.observe(target);
      setObserver(_observer);
    }

    return () => {
      observer?.disconnect();
    };
  }, [target.current, options.root, options.rootMargin, options.threshold]);

  return isIntersecting;
};
