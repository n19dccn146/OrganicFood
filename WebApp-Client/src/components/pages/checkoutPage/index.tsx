//  import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ErrorText from '~/components/common/errorText';
import { API_URL } from '~/constants/api.constant';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage.constants';
import { PHONE_REGEX } from '~/constants/regex.constants';
import { formatCurrency2, getFromLocalStorage } from '~/helpers/base.helper';
import { getCookie } from '~/helpers/cookie.helper';
import useCartHook from '~/hooks/useCartHook';
import useDebounce from '~/hooks/useDebounce';
import useLoading from '~/hooks/useLoading';
import Layout from '~/layouts/Layout';
import API, { getAuthHeader } from '~/services/axiosClient';
import { calculateCartBill } from '~/services/request';
import useAuth from '~/stores/auth';
import PickLocation from './components/pickLocation';

const MISSING_NAME = 'Vui lòng nhập tên người nhận hàng';
const MISSING_EMAIL = 'Vui lòng nhập email';
const MISSING_PHONE = 'Vui lòng nhập số điện thoại';
const MISSING_ADRESS = 'Thiếu đỉa chị';
const MISSING_DETAILS_ADDRESS = 'Vui lòng nhập địa chỉ chi tiết';
const CHECKOUT_ERROR = 'Có lỗi thanh toán: ';

//      cart**: object[] - [{product: string, color: string, quantity: number}] - product = product._id
//      address**: object - {province: string, district: string, address: string}
//      discountCode: string
//      cod**: boolean
//      phone**: string
//      name: string
//      email:string

const CheckoutPage = (props) => {
  const { userCartData } = props;
  const [cart, setCart] = React.useState([]);
  const [checkout, setCheckout] = React.useState<any>();
  const shippingFee = checkout?.ship || 0;
  const { clearCart, cartCount } = useCartHook();
  const [{ userInfo }] = useAuth();
  const [discountCode, setDiscountCode] = React.useState('');
  const [warningMessage, setWarningMessage] = React.useState('');
  const [flagAddDiscount, setFlagAddDiscount] = React.useState(false);
  const [flagChangeAddress, setFlagChangeAddress] = React.useState(true);

  //sd react-hook-form để quản lý form
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
  } = useForm<any>({
    defaultValues: userInfo
      ? {
          name: userInfo?.name,
          email: userInfo?.email,
          phone: userInfo?.phone,
          address: '',
          note: '',
          payment: 'cod',
          discountCode: '',
        }
      : {},
  });

  const { setLoading, loading } = useLoading();

  React.useEffect(() => {
    if (cartCount === 0) {
      //   router.back();
      toast.error('Giỏ hàng trống!');
    }
  }, []);

  React.useEffect(() => {
    if (userInfo) {
      setValue('name', userInfo.name);
      setValue('email', userInfo.email);
      setValue('phone', userInfo.phone);
      setValue('address', '');
      setValue('note', '');
      setValue('payment', 'cod');
      setValue('discountCode', '');
    }
  }, [userInfo]);

  //   const router = useRouter();

  React.useEffect(() => {
    //nếu người dùng đã đăng nhập và có dl trong giỏ hàng
    if (userCartData) {
      //trích xuất thông tin về sp trong giỏ hàng từ userCartData
      const { cart_details, address, ...checkout } = userCartData;
      setCart(cart_details || []);
      setCheckout(checkout);
      return;
    }
    // user not login
    //Nễu người dùng không đăng nhập nhưng có thông tin trong giỏ hàng trong local storage
    const localCart =
      getFromLocalStorage<Array<any>>(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY) || [];
    if (localCart && localCart?.length > 0) {
      //Tính toán giá trị đơn hàng bằng hàm calculateCartBill
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
        const { cart_details, address, ...checkout } = res.data;
        setCart(cart_details || []);
        setCheckout(checkout);
      });
    }
  }, []);

  //được tính dựa trên tổng tiền đơn hàng trước khi áp dụng giảm giá
  const initialBill = checkout?.total || 0;
  //Tính giá trị tổng bill bao gồm cả giảm giá và phí ship
  const totalBill =
    (checkout?.total || 0) - (checkout?.discount || 0) + (checkout?.ship || 0);

  //Hàm xử lý khi người dùng ấn nút áp dụng mã giảm giá
  const getDiscount = async () => {
    const discount = getValues('discountCode');
    if (discount == '') {
      toast.error('Vui lòng nhập mã giảm giá');
    } else {
      console.log('discount', discount);
      setDiscountCode(discount);
      handleGetDiscount({});
    }
  };

  const clearDiscount = () => {
    // const discount = getValues('discountCode');
    setValue('discountCode', '');
    setDiscountCode('');
    setFlagChangeAddress(false);
    // toast.success('Hủy mã thành công');
    handleGetDiscount({});
  };

  //Xử lý logic tính toán giảm giá và phí vận chuyển dựa trên địa chỉ giao hàng
  const handleGetDiscount = async ({ address = '' }: any) => {
    const discount = getValues('discountCode');
    const province = getValues('province');
    const district = getValues('district');
    const _address = getValues('address');
    const body: any = {
      payload: {
        address: {
          province,
          district,
          address: address || _address,
        },
      },
    };
    if (userCartData) {
      const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
      body.token = token;
      body.payload.cart = null;
    } else {
      const localCart =
        getFromLocalStorage<Array<any>>(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY) ||
        [];
      body.payload.cart = localCart;
    }
    body.payload.discountCode = discount;

    calculateCartBill({
      ...body,
    }).then((res: any) => {
      const { cart_details, address, ...checkout } = res.data;
      setCheckout(checkout);
      console.log(res?.warning);
      if (res?.warning) {
        if (discountCode) setDiscountCode('');
        setWarningMessage(res?.warning);
        console.log(res?.warning == 'Địa chỉ thiếu. ');
        if (res?.warning != 'Địa chỉ thiếu. ')
          toast.error('Áp dụng mã không thành công');
      } else {
        setWarningMessage('');
        if (res.addDiscount) {
          toast.success('Áp dụng mã thành công');
        } else if (!res.addDiscount && !flagChangeAddress) {
          toast.success('Hủy mã thành công');
        }
      }
    });
  };

  const handleChangeAddress = useDebounce((e) => {
    setFlagChangeAddress(true);
    handleGetDiscount({ address: e.target.value });
  }, 400);

  //xử lý logic khi người dùng nhấn nút tiến hành thanh toán
  const handleCheckout = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        cart: cart.map((e) => ({
          product: e.product,
          quantity: e.quantity,
          color: e.color,
        })),
        address: {
          province: data.province,
          district: data.district,
          address: data.address,
        },
        cod: data.payment === 'cod',
        phone: data.phone,
        name: data.name,
        email: data.email,
        discountCode: data.discountCode,
      };

      const result = await API.post<any>({
        url: API_URL.CREATE_BILL,
        headers: getAuthHeader(),
        body: { ...payload },
      });

      if (result.status && result.status !== 200) throw new Error(result?.msg);
      if (result?.status === 200 && data.payment === 'cod')
        window.location.href = '/thanh-toan/thanh-cong';
      if (result?.data && data.payment === 'vnpay')
        window.location.href = result?.data;
      if (result.status === 400) {
        toast.error('Sản phẩm đã hết số lượng tồn');
      }

      clearCart();
    } catch (error) {
      toast.error(CHECKOUT_ERROR + error.message); // Hiển thị thông báo lỗi có thông điệp từ đối tượng error
      setLoading(false);
      console.log('err,', error);
    }
  };

  return (
    <Layout categories={props?.categories || []}>
      <form
        onSubmit={handleSubmit(handleCheckout)}
        className="px-[115px] py-[40px]"
      >
        <div className="container flex justify-between items-center gap-[25px] mb-[80px]">
          <div className="left flex-1 self-start">
            <h2 className="font-medium mb-[40px] text-[24px]">
              Chi tiết đơn hàng
            </h2>
            {/* USER FORM */}
            <div className="mb-[30px] relative">
              <label
                htmlFor="name"
                className="text-[14px] px-[10px] absolute pointer-events-none top-[-13px] left-[20px] bg-white text-text_input"
              >
                Họ tên <span className="text-red">*</span>
              </label>
              <input
                {...register('name', {
                  required: {
                    value: true,
                    message: MISSING_NAME,
                  },
                })}
                id="name"
                type="text"
                placeholder="Nhập họ tên"
                className="px-[30px] h-[60px] rounded-[6px] border border-gray_D9 w-full outline-none"
              />
              {errors?.['name'] && <ErrorText text={errors['name'].message} />}
            </div>

            <div className="mb-[30px] relative">
              <label
                htmlFor="email"
                className="text-[14px] px-[10px] absolute pointer-events-none top-[-13px] left-[20px] bg-white text-text_input"
              >
                Email <span className="text-red">*</span>
              </label>
              <input
                {...register('email', {
                  required: {
                    value: true,
                    message: MISSING_EMAIL,
                  },
                })}
                id="email"
                type="email"
                placeholder="Nhập email nhận hóa đơn"
                className="px-[30px] h-[60px] rounded-[6px] border border-gray_D9 w-full outline-none"
              />
              {errors?.['email'] && (
                <ErrorText text={errors['email'].message} />
              )}
            </div>

            <div className="mb-[30px] relative">
              <label
                htmlFor="phone"
                className="text-[14px] px-[10px] absolute pointer-events-none top-[-13px] left-[20px] bg-white text-text_input"
              >
                Số điện thoại <span className="text-red">*</span>
              </label>
              <input
                {...register('phone', {
                  required: {
                    value: true,
                    message: MISSING_PHONE,
                  },
                  pattern: {
                    value: PHONE_REGEX,
                    message: 'Số điện thoại không đúng định dạng',
                  },
                })}
                id="phone"
                type="number"
                placeholder="Nhập số điện thoại nhận hàng"
                className="px-[30px] h-[60px] rounded-[6px] border border-gray_D9 w-full outline-none"
              />
              {errors?.['phone'] && (
                <ErrorText text={errors['phone'].message} />
              )}
            </div>

            <div className="mb-[20px] flex items-center gap-x-2">
              <span className="text-gray_68 text-[20px] font-medium">
                Địa chỉ
              </span>
              <div className="flex-grow h-[1px] bg-gray_D9"></div>
            </div>

            <PickLocation
              setValue={setValue}
              getValues={getValues}
              errors={errors}
              handleGetDiscount={handleGetDiscount}
            />

            <div className="mb-[30px] relative">
              <label
                htmlFor="address"
                className="text-[14px] px-[10px] absolute pointer-events-none top-[-13px] left-[20px] bg-white text-text_input"
              >
                Địa chỉ cụ thể <span className="text-red">*</span>
              </label>
              <input
                {...register('address', {
                  required: {
                    value: true,
                    message: MISSING_DETAILS_ADDRESS,
                  },
                })}
                id="address"
                type="text"
                placeholder="VD: <Số nhà>, <Tên đường>, ..."
                className="px-[30px] h-[60px] rounded-[6px] border border-gray_D9 w-full outline-none"
                onChange={handleChangeAddress}
              />
              {errors?.['address'] && (
                <ErrorText text={errors['address'].message} />
              )}
            </div>

            <div className="mb-[30px] relative">
              <label
                htmlFor="note"
                className="text-[14px] px-[10px] absolute pointer-events-none top-[-13px] left-[20px] bg-white text-text_input"
              >
                Ghi chú
              </label>
              <textarea
                {...register('note')}
                id="note"
                placeholder="Nhập ghi chú"
                rows={5}
                className="px-[30px] pt-2 rounded-[6px] border border-gray_D9 w-full outline-none"
              ></textarea>
            </div>

            {/* // USER FORM */}
          </div>
          <div className="right flex-1 p-[40px] rounded-[6px] bg-checkout_bg">
            <h2 className="mb-[20px] text-[20px] font-medium">Đơn của bạn</h2>
            <div className="container rounded-[6px] mb-[30px] p-[30px] bg-white">
              <div className="flex items-center justify-between py-[15px] border-b-[1px] border-b-gray_D9">
                <span className="text-[20px] font-medium">
                  Sản phẩm (Giá gốc)
                </span>
                <span className="text-[20px] font-medium">Tạm tính</span>
              </div>

              {cart.map((item: any, index: number) => {
                const totalPrice = (item?.quantity || 0) * item?.price;
                return (
                  <div className="border-b-[1px] border-b-gray_D9" key={index}>
                    <div className="flex items-start justify-between pt-[15px]">
                      <span className="text-[18px]">{item.name}</span>
                      <span className="text-[18px]">
                        {formatCurrency2(totalPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-x-3 pb-[15px]">
                      <span className="text-[14px] italic">
                        {formatCurrency2(item?.price || 0)}
                      </span>
                      <span className="text-[14px]">x {item?.quantity}</span>
                    </div>
                  </div>
                );
              })}

              <div className="flex items-center justify-between py-[15px] border-b-[2px] border-b-gray_D9">
                <span className="text-[18px] font-medium">Tổng tạm tính</span>
                <span className="text-[18px]">
                  {formatCurrency2(initialBill)}
                </span>
              </div>

              <div className="flex items-center justify-between py-[15px] border-b-[2px] border-b-gray_D9">
                <span className="text-[18px] font-medium">Giảm giá</span>
                <span className="text-[18px]">
                  {formatCurrency2(checkout?.discount || 0)}
                </span>
              </div>

              <div className="flex items-center justify-between py-[15px] border-b-[2px] border-b-gray_D9">
                <div className="w-full">
                  <span className="inline-block text-[18px] mb-[10px] font-medium">
                    Phương thức giao hàng
                  </span>
                  <div className="input-gr">
                    <div className="flex items-center w-full">
                      <input
                        // {...register('shippingMethod')}
                        defaultChecked
                        id="GHTK"
                        type="radio"
                        name="shippingMethod"
                        value={shippingFee}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="GHTK"
                        className="ml-2 text-[16px] text-text_input flex flex-grow justify-between items-center"
                      >
                        Giao hàng tiết kiệm
                        <span className="text-[14px]">
                          {formatCurrency2(shippingFee)}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-[15px]">
                <span className="text-[20px] font-medium">Tổng thanh toán</span>
                <span className="text-[20px] font-medium">
                  {formatCurrency2(totalBill)}
                </span>
              </div>
            </div>

            <div className="mb-[30px] relative">
              <label
                htmlFor="discountCode"
                className="text-[14px] px-[10px] pointer-events-none text-text_input"
              >
                Mã giảm giá
              </label>
              {discountCode ? (
                <div className="h-[50px] mt-2 flex items-center justify-between px-4 py-1 bg-baseColor rounded-[6px]">
                  <div className="">{discountCode}</div>
                  <span
                    className="text-white cursor-pointer"
                    onClick={clearDiscount}
                  >
                    Bỏ
                  </span>
                </div>
              ) : (
                <div className="flex mt-2">
                  <input
                    {...register('discountCode')}
                    id="discountCode"
                    type="text"
                    placeholder="Nhập mã"
                    className="px-[30px] h-[50px] rounded-tl-[6px] rounded-bl-[6px] border border-gray_D9 w-full outline-none"
                  />
                  <button
                    type="button"
                    onClick={getDiscount}
                    className="h-[50px] w-fit px-[8px] text-sm text-white bg-blue_00 rounded-tr-[6px] rounded-br-[6px]"
                  >
                    Dùng
                  </button>
                </div>
              )}
            </div>

            <span className="text-[#b39932] italic my-2 block">
              {warningMessage}
            </span>

            <div className="order wrapper">
              <label
                htmlFor="cod"
                className="block pb-[20px] mb-[20px] border-b-[1px] border-b-gray_D9"
              >
                <div className="flex items-center mb-[20px]">
                  <input
                    defaultChecked
                    id="cod"
                    value={'cod'}
                    type="radio"
                    {...register('payment')}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <div className="ml-2 text-[20px] font-medium">COD</div>
                </div>
                <p className="text-[16px] font-[400] text-text_input pl-[28px]">
                  Trả tiền khi nhận hàng.
                </p>
              </label>

              <label
                htmlFor="vnpay"
                className="block pb-[20px] mb-[20px] border-b-[1px] border-b-gray_D9"
              >
                <div className="flex justify-between mb-[20px]">
                  <div className="flex items-center">
                    <input
                      id="vnpay"
                      value={'vnpay'}
                      type="radio"
                      {...register('payment')}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <div className="ml-2 text-[20px] font-medium">VNPAY</div>
                  </div>
                  <img
                    src="/assets/icons/ic_vnpay.png"
                    alt=""
                    className="w-[100px] h-[25px] object-cover"
                  />
                </div>

                <p className="text-[16px] font-[400] text-text_input pl-[28px]">
                  Thanh toán online qua VNPAY.
                </p>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-white bg-blue_00 disabled:opacity-25 w-full py-[16px] px-[38px] rounded-[6px] text-[20px] font-medium"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>

        <div className="containter flex border-b-[1px] border-b-gray_D9 justify-between gap-[80px]">
          <div className="service1 flex items-center mb-[30px] flex-1">
            <div className="icon mt-[6px] mr-[20px] max-w-[45px]">
              <img src="/assets/icons/service1.png" alt="" />
            </div>
            <div className="content flex flex-col gap-[7px]">
              <h6 className="font-[700]">Giao hàng an toàn</h6>
              <p className="text-text_input">Giao tận nơi, tận tay.</p>
            </div>
          </div>

          <div className="service1 flex items-center  mb-[30px] flex-1">
            <div className="icon mt-[6px] mr-[20px] max-w-[45px]">
              <img src="/assets/icons/service2.png" alt="" />
            </div>
            <div className="content flex flex-col gap-[7px]">
              <h6 className="font-[700]">Giao hàng nhanh</h6>
              <p className="text-text_input">Trong vòng 10 ngày.</p>
            </div>
          </div>

          <div className="service1 flex items-center  mb-[30px] flex-1">
            <div className="icon mt-[6px] mr-[20px] max-w-[45px]">
              <img src="/assets/icons/service3.png" alt="" />
            </div>
            <div className="content flex flex-col gap-[7px]">
              <h6 className="font-[700]">Đổi trả tiện lợi</h6>
              <p className="text-text_input">Trong vòng 7 ngày.</p>
            </div>
          </div>

          <div className="service1 flex items-center  mb-[30px] flex-1">
            <div className="icon mt-[6px] mr-[20px] max-w-[45px]">
              <img src="/assets/icons/service4.png" alt="" />
            </div>
            <div className="content flex flex-col gap-[7px]">
              <h6 className="font-[700]">Hỗ trợ nhanh chóng</h6>
              <p className="text-text_input">Hỗ trợ trực tuyến 24/7.</p>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default CheckoutPage;
