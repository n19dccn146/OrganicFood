import { IconX } from '@tabler/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage.constants';
import {
  calculateSalePrice,
  formatCurrency2,
  getFromLocalStorage,
} from '~/helpers/base.helper';
import { productURL } from '~/helpers/url.helper';
import useCartHook from '~/hooks/useCartHook';
import Layout from '~/layouts/Layout';
import { calculateCartBill } from '~/services/request';
import useAuth from '~/stores/auth';

// Them truong cho cot ben phai

const CartPage = (props: any) => {
  return (
    <Layout categories={props?.categories || []}>
      <CartSection {...props} />
    </Layout>
  );
};

const CartSection = (props) => {
  const { userCartData } = props;
  const [cart, setCart] = React.useState([]);
  const [{ signedIn }] = useAuth();

  const router = useRouter();

  const { changeItemQuantity, removeCartItem } = useCartHook();

  React.useEffect(() => {
    if (userCartData) {
      setCart(userCartData?.cart_details || []);
      return;
    }
    // user not login
    const localCart =
      getFromLocalStorage<Array<any>>(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY) || [];
    if (localCart && localCart?.length > 0) {
      calculateCartBill({
        payload: {
          cart: localCart,
          address: {
            province: '',
            district: '',
            address: '',
          },
          discountCode: '',
        },
      }).then((res) => {
        setCart(res.data?.cart_details);
      });
    }
  }, []);

  const handleChangeQuantity = React.useCallback(
    ({ product, color, quantity = 1 }) => {
      const item = cart.find((e) => e.product === product && e.color === color);
      const preCount = item.quantity + quantity;
      if (preCount < 1) return;

      changeItemQuantity({
        product,
        color,
        quantity,
      });

      setCart((list) => {
        const findIndex = list.findIndex(
          (e) => e.product === product && e.color === color
        );
        list[findIndex].quantity = preCount;
        return list;
      });
    },
    [cart, signedIn]
  );

  const handleRemoveItem = React.useCallback(
    ({ product, color }) => {
      removeCartItem({ product, color });
      setCart((list) =>
        list.filter((e) => e.product !== product || e.color !== color)
      );
    },
    [signedIn]
  );

  const totalBill = cart.reduce(
    (prev, curr) =>
      prev + calculateSalePrice(curr?.price, curr?.sale) * curr?.quantity,
    0
  );

  const totalQuantity = cart.reduce((prev, curr) => prev + curr?.quantity, 0);

  const handleCheckout = () => {
    if (cart?.length === 0) {
      toast.error('Giỏ hàng trống');
      return;
    }
    window.location.href = '/thanh-toan';
    // router.push('/thanh-toan');
  };

  const handleContinue = () => {
    // router.push('/');
    window.location.href = '/';
  };

  return (
    <div className="my-[30px]">
      <p className="text-center text-xl uppercase font-bold">Giỏ hàng</p>
      <div className="mt-[30px] grid grid-cols-4 gap-x-[50px] min-h-[400px]">
        <div className="col-span-3 h-full flex flex-col gap-y-[20px]">
          {cart?.length === 0 && <p>Giỏ hàng chưa có sản phẩm nào</p>}
          {cart?.map((item, index) => (
            <CartItem
              key={index}
              {...item}
              handleChangeQuantity={handleChangeQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
        <div className="col-span-1 h-fit flex flex-col bg-gray_F1 rounded-lg px-[15px] py-[10px]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-base">Tổng số mặt hàng:</span>
            <span className="font-normal text-base">{cart?.length}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <span className="font-semibold text-base">Tổng số lượng:</span>
            <span className="font-normal text-base">{totalQuantity}</span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-2">
            <span className="font-semibold text-base">Tạm tính:</span>
            <span className="font-normal text-base">
              {formatCurrency2(totalBill)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            className="block mt-14 py-2 bg-baseColor rounded-lg text-center uppercase font-semibold"
          >
            Thanh toán
          </button>
          <button
            onClick={handleContinue}
            className="block mt-4 py-2 bg-black text-white rounded-lg text-center uppercase font-semibold"
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

const CartItem = (props) => {
  const {
    image_url,
    name,
    price = 0,
    color,
    quantity,
    product,
    sale: salePercent = 0,
    handleChangeQuantity,
    handleRemoveItem,
  } = props;

  const newPrice = calculateSalePrice(price, salePercent);
  const totalPay = quantity * newPrice;

  return (
    <div className="rounded-md w-full p-2 grid grid-cols-[100px_minmax(300px,_1fr)_600px] items-center">
      <div className="w-[100px] h-[100px] rounded-md">
        <img
          src={
            image_url || '/assets/images/product/photo_2022-09-28_21-58-51.jpg'
          }
          className="w-full h-full object-cover rounded-md"
          alt=""
        />
      </div>
      <div className="h-full mx-3 flex flex-col justify-center gap-y-2">
        <Link href={productURL(product)} target="_blank">
          <a className="font-semibold text-base max_line-1">
            {name || '<Chưa cập nhật>'}
          </a>
        </Link>
        {/* <p className="text-sm italic text-dark_3">
          <span className="text-gray_B9">Màu:</span> {color}
        </p> */}
        {salePercent > 0 && (
          <span className="text-sm italic text-error bg-gray_F1 w-fit p-1 rounded-full">
            <span className="text-error">Giảm giá:</span> {salePercent}%
          </span>
        )}
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-1 h-full mx-3 flex gap-x-2 justify-center items-center">
          <button
            className="h-[25px] w-[25px] rounded-md border border-gray_D9 flex items-center justify-center"
            onClick={() =>
              handleChangeQuantity({ product, color, quantity: -1 })
            }
          >
            -
          </button>
          <div className="">{quantity}</div>
          <button
            className="h-[25px] w-[25px] rounded-md border border-gray_D9 flex items-center justify-center"
            onClick={() =>
              handleChangeQuantity({ product, color, quantity: 1 })
            }
          >
            +
          </button>
        </div>
        <div className="col-span-3 flex justify-evenly items-baseline">
          <div className="flex flex-col gap-y-2">
            <span className="text-[16px] font-normal">
              x {formatCurrency2(newPrice)}
            </span>
            {salePercent > 0 && (
              <span className="text-[16px] font-light line-through">
                {formatCurrency2(price)}
              </span>
            )}
          </div>
          <span className="text-[16px] font-semibold">
            = {formatCurrency2(totalPay)}
          </span>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center">
          <button onClick={() => handleRemoveItem({ product, color })}>
            <IconX stroke={2} color="#333333" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
