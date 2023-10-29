import { IconMinus, IconPlus, IconShoppingCartPlus } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import Slider from 'react-slick';
import Breadcrumb from '~/components/common/breadcrumbs';
import Divider from '~/components/common/divider';
import ProductCard from '~/components/common/productCard';
import StarRating from '~/components/common/starRating';
import { API_URL } from '~/constants/api.constant';
import { calculateSalePrice, formatCurrency2 } from '~/helpers/base.helper';
import { DateJS } from '~/helpers/date.helper';
import useCartHook from '~/hooks/useCartHook';
import Layout from '~/layouts/Layout';
import API from '~/services/axiosClient';
import { ReturnListResponse } from '~/services/response.interface';
import useCart from '~/stores/cart';
import GallerySlider from './components/GallerySlider';
import Ratings from './components/RatingsSummary';
import styles from './style.module.css';

// const fakeComments = [
//   { account: 'Tâm', message: 'Mua được đấy, xài tốt', rate: 4.5, at: '' },
//   {
//     account: 'Đạt',
//     message: 'Dùng rất mượt, nhưng giá hơi cao so với chỗ khác',
//     rate: 4,
//     at: '',
//   },
// ];

const ProductDetailPage = (props: any) => {
  const { product, comments: productComments = [] } = props;
  const {
    price = 0,
    sale: salePercent = 0,
    total_rate = 0,
    comments = [],
    name,
    desc,
    supplier_name,
    colors = [],
    image_url,
    enable = true,
    specs = {},
  } = product;
  const [currentColor, setCurrentColor] = React.useState<any>(colors?.[0]);
  const [quantity, setQuantity] = React.useState<number>(1);
  const { addToCart } = useCartHook();
  const [{ products }] = useCart();
  const [hints, setHints] = React.useState([]);
  const { push } = useRouter();

  React.useEffect(() => {
    (async () => {
      const hintProducts = await API.post<ReturnListResponse<any>>({
        url: API_URL.PRODUCT_HINT,
        body: {
          quantity: 5,
          products: products.map((e) => e.product),
        },
      });
      setHints(hintProducts.data);
    })();
  }, [products]);

  const slideImageRef = React.useRef<Slider | null>(null);

  const newPrice = calculateSalePrice(price, salePercent);

  const gallery = React.useMemo(() => {
    const images = image_url ? [{ _id: '', image: image_url }] : [];
    colors?.forEach((element) => {
      images.push({ _id: element?._id, image: element?.image_url });
    });
    return images;
  }, [colors, image_url]);

  const handleAddToCart = () => {
    if (currentColor) {
      addToCart({
        product: product?._id,
        quantity,
        color: currentColor?.color,
      });
      toast.success('Đã thêm vào giỏ hàng');
    } else {
      toast.error('Không thể mua hàng');
    }
  };

  const handleGoToCart = () => {
    if (currentColor) {
      addToCart({
        product: product?._id,
        quantity,
        color: currentColor?.color,
      });
      toast.success('Đã thêm vào giỏ hàng');
      //   window.location.href = '/gio-hang';
      setTimeout(() => {
        window.location.href = '/gio-hang';
      }, 500);
      //   push(`/gio-hang`);
    } else {
      toast.error('Không thể mua hàng');
    }
  };

  const disableButton = currentColor?.quantity === 0;

  const isComingSoon = React.useMemo(() => {
    const inStock = colors?.reduce((e, v) => e + v?.quantity, 0);
    return inStock <= 0;
  }, [colors]);

  const pickColor = React.useCallback(
    (color) => {
      setCurrentColor(color);
      const findColorIndex = gallery.findIndex((e) => e._id === color?._id);
      if (slideImageRef) slideImageRef.current.slickGoTo(findColorIndex);
    },
    [gallery]
  );

  const specsList = React.useMemo(() => {
    const list = Object.keys(specs);
    const result = [];
    list.forEach((spec) => {
      result.push({ label: spec, value: specs[spec] });
    });
    return result;
  }, [specs]);

  return (
    <Layout categories={props?.categories || []}>
      <Breadcrumb
        path={[
          {
            slug: '/san-pham',
            name: 'Sản phẩm',
          },
          {
            slug: '/san-pham',
            name: name,
          },
        ]}
      />
      {/* Info */}
      <div className="mt-4 flex gap-4 items-center">
        <p className="text-[22px] font-semibold">{name}</p>
        <Ratings reviews={comments?.length || 0} rating={total_rate || 0} />
      </div>
      <Divider className="h-[1px] my-2" />

      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-4">
          <GallerySlider images={gallery} ref={slideImageRef} />
        </div>
        <div className="col-span-4">
          <div className="min-h-[400px] flex flex-col">
            {/* Price */}
            <div className="flex items-center gap-4">
              <p className="text-[22px] text-yellow_E3 font-bold">
                {!isComingSoon && formatCurrency2(newPrice)}
              </p>
              {salePercent > 0 && (
                <p className="text-[16px] text-dark_3 font-semibold">
                  <span className="line-through">
                    {' '}
                    {!isComingSoon && formatCurrency2(newPrice)}
                  </span>
                  <span className="ml-4 text-error">Giảm {salePercent}%</span>
                </p>
              )}
            </div>
            {/* Colors */}
            <div className="mt-2">
              <span className="text-gray_C1 font-semibold text-sm">
                Tên sản phẩm
              </span>
              <div className="grid grid-cols-3 gap-2 items-center bg-white">
                {colors.map((e, i) => {
                  const active = currentColor?._id === e._id;
                  return (
                    <div
                      key={i}
                      className={`p-2 col-span-1 w-auto bg-white border ${
                        active
                          ? 'border-yellow_E3'
                          : 'border-gray_D9 hover:border-black'
                      } cursor-pointer rounded-xl grid grid-cols-4 gap-1`}
                      onClick={() => pickColor(e)}
                    >
                      <div className="col-span-1">
                        <div className="h-[36px] w-full">
                          <img
                            src={e?.image_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-start col-span-3">
                        <span className={`text-sm font-semibold max_line-1`}>
                          {e.color}
                        </span>
                        <span className={`text-xs font-normal`}>
                          {e.quantity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Quantity */}
            <QuantityPicker
              productPrice={newPrice}
              quantity={quantity}
              setQuantity={setQuantity}
            />
            {/* Buttons */}
            <div className="mt-4">
              <div className="grid grid-cols-6 gap-2 items-center bg-white">
                {!enable && (
                  <div className="col-span-5 flex h-full items-center justify-center">
                    <span className="text-center text-error italic font-semibold">
                      Sản phẩm ngừng kinh doanh
                    </span>
                  </div>
                )}
                {isComingSoon && (
                  <div className="col-span-5 flex h-full items-center justify-center">
                    <span className="text-center text-gray_B9 italic font-semibold">
                      Sản phẩm sắp ra mắt
                    </span>
                  </div>
                )}
                {(!isComingSoon || !enable) && (
                  <>
                    {disableButton && (
                      <p className="text-error text-lg col-span-5">
                        Sản phẩm tạm thời hết hàng!
                      </p>
                    )}
                    <button
                      className="col-span-3 border-2 border-yellow_E3 disabled:bg-gray_68 disabled:select-none disabled:border-gray_68 bg-yellow_E3 rounded-lg w-full p-[5px] flex flex-col items-center"
                      disabled={disableButton}
                      onClick={handleGoToCart}
                    >
                      <span className="font-bold text-base text-white">
                        MUA NGAY
                      </span>
                      <span className="font-semibold text-[13px] text-white">
                        (Giao hàng tận nơi)
                      </span>
                    </button>
                    <button
                      className="col-span-2 border-2 border-yellow_E3 disabled:border-gray_68 rounded-lg w-full p-[5px] flex flex-col items-center"
                      disabled={disableButton}
                      onClick={handleAddToCart}
                    >
                      <IconShoppingCartPlus
                        size={24}
                        strokeWidth={2}
                        //   color={'yellow_E3'}
                        className="text-yellow_E3"
                      />
                      <span className="font-semibold text-[12px] text-yellow_E3">
                        Thêm vào giỏ hàng
                      </span>
                    </button>
                  </>
                )}
                {/* <FavoriteButton containerClass="col-span-1 border-2 border-gray_D9 bg-gray_D9 rounded-lg w-full p-[15px] flex justify-center" /> */}
                {/* <div className="col-span-1 border-2 border-gray_D9 bg-gray_D9 rounded-lg w-full p-[15px] flex justify-center">
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className={styles.productSpecification}>
            <p className="text-[16px] font-semibold">Thông tin sản phẩm</p>
            <div className="mt-2 border border-gray_C1 rounded-xl">
              {/* {specsList.map((e, i) => (
                <div key={i} className={styles.productSpecificationItem}>
                  <span>{e.label}</span>
                  <span>{e.value}</span>
                </div>
              ))} */}
              <div className={styles.productSpecificationItem}>
                <span>Nhà cung cấp</span>
                <span>{supplier_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider className="h-[1px] my-2" />

      {/* <div className="">
        <p className="text-[20px] font-semibold text-dark_3 mb-2 uppercase">
          Phụ kiện đi kèm
        </p>

        <div className="bg-gray_D9 grid grid-cols-5 gap-x-3 p-2 rounded-xl">
          {similarities.map((e, i) => (
            <div key={i} className="bg-white rounded-xl p-2">
              <div className="w-full max-h-[200px] h-auto">
                <img
                  src={e.thumbnail}
                  alt=""
                  className="w-full h-full max-h-[200px] object-contain"
                />
              </div>
              <Divider className="h-[1px] my-2" />
              <p className="max_line-3 font-semibold text-lg text-center">
                {e.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Divider className="h-[1px] my-2" /> */}

      <div className="">
        <p className="text-[20px] font-semibold text-dark_3 mb-2 uppercase">
          Có thể bạn sẽ thích
        </p>

        <div className="bg-white grid grid-cols-5 gap-x-3 p-2 rounded-xl">
          {hints.map((e, i) => (
            <ProductCard key={i} {...e} />
            // <div key={i} className="bg-white rounded-xl p-2">
            //   <div className="w-full max-h-[200px] h-auto">
            //     <img
            //       src={e.thumbnail}
            //       alt=""
            //       className="w-full h-full max-h-[200px] object-contain"
            //     />
            //   </div>
            //   <Divider className="h-[1px] my-2" />
            //   <p className="max_line-3 font-semibold text-lg text-center">
            //     {e.name}
            //   </p>
            //   <p className="max_line-1 font-semibold text-lg text-yellow_E3 text-center">
            //     {formatCurrency2(e.price)}
            //   </p>
            // </div>
          ))}
        </div>
      </div>
      <Divider className="h-[1px] my-2" />
      <div className="">
        <p className="text-[20px] font-semibold text-dark_3 mb-2 uppercase">
          Thông tin sản phẩm
        </p>

        <div className="bg-gray_F1 grid grid-cols-5 gap-x-3 p-2 rounded-xl">
          {desc}
        </div>
      </div>
      <div className="mt-[20px]">
        <p className="text-[20px] font-semibold text-dark_3 mb-2 uppercase">
          Đánh giá sản phẩm
        </p>

        <div className="bg-gray_F1 p-2 rounded-xl">
          <StarRating total_rate={total_rate} />
          <div className="mt-2">
            {productComments.length <= 0 ? (
              <p className="text-center">Sản phẩm này chưa có đánh giá</p>
            ) : (
              <>
                {productComments.map((e, index) => {
                  return (
                    <div key={index} className="first:mt-0 mt-3">
                      <p>
                        <span className="font-medium">{e?.account}</span>
                        <span className="font-light italic text-sm ml-4">
                          {DateJS.getFormatDate(e?.at, 'DD-MM-YYYY HH:mm')}
                        </span>
                      </p>
                      <div className="bg-white px-3 py-2 rounded-lg">
                        <StarRating total_rate={e?.rate} />
                        {e?.message}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const QuantityPicker = ({
  productPrice = 0,
  quantity,
  setQuantity,
}: {
  productPrice?: number;
  quantity: number;
  setQuantity: any;
}) => {
  const handleIncrease = () => {
    if (quantity === 10) return;
    console.log(quantity);
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    console.log(quantity);
    setQuantity(quantity - 1);
  };

  const handleChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  return (
    <div className="mt-auto">
      <div className="grid grid-cols-2 gap-2 items-center bg-white">
        <div className="col-span-1 grid grid-cols-3 gap-1">
          <div className="col-span-1 flex items-center justify-end">
            <button
              className="bg-black flex items-center justify-center p-1 rounded-md"
              onClick={handleDecrease}
            >
              <IconMinus size={24} strokeWidth={2} color="#fff" />
            </button>
          </div>

          <div className={`col-span-1 flex items-center justify-center`}>
            {/* <span className="text-[18px]">{quantity}</span> */}
            <input
              type="number"
              onChange={handleChange}
              className="text-[18px] w-[100%] text-center"
              value={quantity}
            />
          </div>
          <div className="col-span-1 flex items-center justify-start">
            <button
              className="bg-black flex items-center justify-center p-1 rounded-md"
              onClick={handleIncrease}
            >
              <IconPlus size={24} strokeWidth={2} color="#fff" />
            </button>
          </div>
        </div>
        <div className="col-span-1">
          <span className="text-sm text-gray_C1 italic">
            (Mua tối đa 5 sản phẩm)
          </span>
        </div>
      </div>
      <div className="my-4">
        <p className="text-[18px] text-justify text-dark_3">
          Tổng tạm tính:{' '}
          <span className="text-yellow_E3 italic">
            {formatCurrency2(productPrice * quantity)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
