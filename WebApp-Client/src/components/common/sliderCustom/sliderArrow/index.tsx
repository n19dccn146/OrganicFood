interface SliderArrowProps {
  classNameProps: string;
  image: string;
  heightImage: string;
  onClick?: () => void;
}
const SliderArrow = (props: SliderArrowProps) => {
  const { onClick, image, heightImage, classNameProps } = props;
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-black bg-opacity-40 active:bg-opacity-70 rounded-[100%] absolute translate-y-[-50%] flex justify-center items-center z-30 ${classNameProps}`}
    >
      <div className={`${heightImage}`}>
        <img src={image} className="w-full h-full object-cover" alt="" />
      </div>
    </div>
  );
};
export default SliderArrow;
