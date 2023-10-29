import React from 'react';

type Props = {
  src: string;
  alt?: string;
  height?: string;
  width?: string;
  arbitrary?: boolean;
  className?: string;
};

const ImageRender = ({
  src,
  alt = '',
  //   height,
  //   width,
  //   arbitrary = false,
  className = '',
}: Props) => {
  //   const _height = height ? (arbitrary ? `[${height}]` : `${height}`) : 'auto';
  //   const _width = width ? (arbitrary ? `[${width}]` : `${width}`) : 'auto';
  //   const imageContainer = `h-${_height} w-${_width}`;
  return (
    <div className={className}>
      <img src={src} alt={alt} className="w-full h-full object-contain" />
    </div>
  );
};

export default ImageRender;
