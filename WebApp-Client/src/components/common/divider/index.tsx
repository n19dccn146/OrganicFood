import React from 'react';

type Props = {
  className?: string;
  direction?: 'vertical' | 'horizontal';
};

const Divider = ({ direction = 'horizontal', className = '' }: Props) => {
  const _className =
    direction === 'horizontal' ? `w-full ${className}` : `h-full ${className}`;
  return <div className={['bg-gray_F1', _className].join(' ')}></div>;
};
export default Divider;
