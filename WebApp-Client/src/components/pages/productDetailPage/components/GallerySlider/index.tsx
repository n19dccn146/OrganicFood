import SliderCustom from '~/components/common/sliderCustom';
import SliderArrow from '~/components/common/sliderCustom/sliderArrow';
import { getLengthArray } from '~/helpers/base.helper';
import React from 'react';
// import ReactPlayer from 'react-player';

const ImageSlide = React.forwardRef(
  (
    {
      images,
    }: {
      images?: Array<{ _id: string; image: string }> | undefined;
    },
    ref
  ) => {
    const [currentImage, setCurrentImage] = React.useState(0);
    if (images && getLengthArray(images) > 0)
      return (
        <div className="w-full h-[400px] relative border border-gray_D9 rounded-[.5rem] bg-white-100">
          <SliderCustom
            ref={ref}
            customSettings={{
              className: 'h-full w-full relative rounded-[5px]',
              arrows: true,
              prevArrow: (
                <SliderArrow
                  heightImage="h-[22px]"
                  image="/assets/icons/ic_arr_left.png"
                  classNameProps="top-[50%] left-[10px] w-[60px] h-[60px] bg-black"
                />
              ),
              nextArrow: (
                <SliderArrow
                  heightImage="h-[22px]"
                  image="/assets/icons/ic_arr_right.png"
                  classNameProps="top-[50%] right-[10px] w-[60px] h-[60px] bg-black"
                />
              ),
              slidesToShow: 1,
              slidesToScroll: 1,
              beforeChange: (index, next) => setCurrentImage(next),
            }}
          >
            {images.map((item, index) => {
              return (
                <div className="h-[398px] outline-none" key={index}>
                  <img
                    src={item.image}
                    className="h-full w-full object-contain"
                    alt="image"
                  />
                </div>
              );
            })}
          </SliderCustom>
          <div className="absolute h-[30px] min-w-[50px] bg-black opacity-70 bottom-1 left-[50%] translate-x-[-50%] rounded-lg">
            <p className="text-white text-center">
              {currentImage + 1}/{getLengthArray(images)}
            </p>
          </div>
        </div>
      );
    else
      return (
        <div className="w-full h-[400px] border border-gray_D9 rounded-[5px] bg-white-100 relative">
          <div className="h-[498px]">
            <img
              src="/assets/images/img_no_image.jpg"
              className="h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="absolute h-[30px] min-w-[50px] bg-black opacity-70 bottom-1 left-[50%] translate-x-[-50%] rounded-lg">
            <p className="text-white text-center">0/0</p>
          </div>
        </div>
      );
  }
);

ImageSlide.displayName = 'ImageSlide';

export default React.memo(ImageSlide);
