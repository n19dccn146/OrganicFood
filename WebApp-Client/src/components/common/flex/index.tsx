import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  alignItem?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
};

const Flex = ({
  children,
  className,
  direction,
  alignItem,
  justifyContent,
}: Props) => {
  const initialClassNames = React.useMemo(
    () => [className, direction, alignItem, justifyContent],
    [className, direction, alignItem, justifyContent]
  );
  const initialPrefixes = React.useMemo(
    () => ['', 'flex-', 'items-', 'justify-'],
    []
  );

  const filterClassName = React.useMemo(() => {
    const possibleIndexes = [...initialClassNames].map((e, i) => {
      if (!!e) return i;
      return -1;
    });
    return [
      'flex',
      ...possibleIndexes
        .filter((e) => e !== -1)
        .map((e) => `${initialPrefixes[e]}${initialClassNames[e]}`),
    ].join(' ');
  }, [initialClassNames, initialPrefixes]);

  return <div className={filterClassName}>{children}</div>;
};

export default Flex;
