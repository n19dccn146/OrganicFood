import { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";
import productApi from "../../apis/product/product";
import Updateprod from "../../components/Form/Updateprod";

type Props = {};

const Updateproduct = (props: Props) => {
  const { productId } = useParams();
  const sendId = '_id='+ productId
  useEffect(() => {
    (async () => {

      const result = await productApi.getDetilaProduct(sendId);
      console.log(result);
    })();
  }, []);
  return (
    <div className="flex gap-8">
      <Carousel
        width={700}
        autoPlay={true}
        emulateTouch={true}
        className="text-center"
        thumbWidth={150}
      >
        <div>
          <img src="https://cdn.tgdd.vn/Products/Images/1942/274763/android-sony-4k-43-inch-kd-43x80k-240522-030219-550x340.jpg" />
          {/* <p className="legend">Legend 1</p> */}
        </div>
        <div>
          <img src="https://cdn.tgdd.vn/Products/Images/1942/274763/android-sony-4k-43-inch-kd-43x80k-240522-030219-550x340.jpg" />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img src="https://cdn.tgdd.vn/Products/Images/1942/274763/android-sony-4k-43-inch-kd-43x80k-240522-030219-550x340.jpg" />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
      <div className="flex-1">
        <form>
          <div className="flex items-center mb-4">
            <div className="w-[50px]">Name</div>
            <input className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>

          <div className="flex items-center mb-4">
            <div className="w-[50px]">Name</div>
            <input className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>
          
          <div className="flex items-center mb-4">
            <div className="w-[50px]">Name</div>
            <input className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>

          <div className="flex items-center mb-4">
            <div className="w-[50px]">Name</div>
            <input className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>

          <div className="flex items-center mb-4">
            <div className="w-[50px]">Name</div>
            <input className="w-[300px] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Updateproduct;
