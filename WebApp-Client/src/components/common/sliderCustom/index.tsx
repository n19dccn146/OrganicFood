import React from 'react';
import Slider, { Settings } from 'react-slick';

interface SliderCustomProps {
  children: Array<React.ReactNode> | React.ReactNode;
  customSettings: Settings;
}

const SliderCustom = React.forwardRef((props: SliderCustomProps, ref: any) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    // slidesToShow: 3,
    // slidesToScroll: 2,
    adaptiveHeight: true,
    // lazyLoad: 'progressive',
  };
  const { children, customSettings } = props;
  const sliderSettings = { ...settings, ...customSettings };
  return (
    <Slider ref={(slider) => (ref.current = slider)} {...sliderSettings}>
      {children}
    </Slider>
  );
});

SliderCustom.displayName = 'SliderCustom';

export default SliderCustom;
