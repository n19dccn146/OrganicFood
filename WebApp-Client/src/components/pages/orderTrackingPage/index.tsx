import { IconInfoCircle, IconReceipt2, IconShoppingCart } from '@tabler/icons';
import html2canvas from 'html2canvas';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Breadcrumb from '~/components/common/breadcrumbs';
import Divider from '~/components/common/divider';
import ErrorText from '~/components/common/errorText';
import Flex from '~/components/common/flex';
import ModalContainer from '~/components/common/modalContainer';
import { API_URL } from '~/constants/api.constant';
import { MODAL_KEYS } from '~/constants/modal.constants';
import {
  calculateSalePrice,
  formatCurrency2,
  responseHasError,
} from '~/helpers/base.helper';
import { openModalOrDrawer } from '~/helpers/modal.helper';
import { ORDER_STATUS } from '~/interfaces/order.interface';
import Layout from '~/layouts/Layout';
import API, { getAuthHeader } from '~/services/axiosClient';
import { ReturnResponse } from '~/services/response.interface';
import OrderStatusProgress from './components/orderStatusProgress';
import StarRatings from 'react-star-ratings';

const getCurrentStatus = (timeline: any[]) => {
  if (timeline.some((e) => e.statusTimeline === ORDER_STATUS.CANCELLED))
    return ORDER_STATUS.CANCELLED;
  if (timeline.some((e) => e.statusTimeline === ORDER_STATUS.DELIVERED))
    return ORDER_STATUS.DELIVERED;
  if (timeline.some((e) => e.statusTimeline === ORDER_STATUS.ON_DELIVERY))
    return ORDER_STATUS.ON_DELIVERY;
  if (timeline.some((e) => e.statusTimeline === ORDER_STATUS.CONFIRMED))
    return ORDER_STATUS.CONFIRMED;
  return ORDER_STATUS.ORDERED;
};

const OrderTrackingPage = (props: any) => {
  const { orderInfo } = props;

  const [productInfo, setProductInfo] = React.useState(null);

  const products = orderInfo?.products || [];
  const { query } = useRouter();

  const shipFee = orderInfo?.ship || 0;
  const discount = orderInfo?.discount || 0;
  const totalPayment = orderInfo?.total || 0;

  const finalPayment = totalPayment + shipFee - discount;

  const account = orderInfo?.account;
  const address = orderInfo?.address;

  const timeline = orderInfo?.status;
  const currentStatus = getCurrentStatus(timeline);

  const showCancelButton = [ORDER_STATUS.ORDERED, ORDER_STATUS.CONFIRMED].some(
    (e) => e == currentStatus
  );

  const showReviewButton = currentStatus == ORDER_STATUS.DELIVERED;

  const openReviewForm = (product: any) => {
    setProductInfo(product);
    openModalOrDrawer(MODAL_KEYS.MODAL_REVIEW_PRODUCT);
  };

  //   const exportAsImage = async () => {
  //     const report = document.getElementById('printReport');
  //     const canvas = await html2canvas(report, {
  //       allowTaint: true,
  //       useCORS: true,
  //     });
  //     const a = document.createElement('a');
  //     a.href = canvas
  //       .toDataURL('image/jpeg')
  //       .replace('image/jpeg', 'image/octet-stream');
  //     a.download = `don_hang_${query.order || ''}.jpg`;
  //     a.click();
  //   };

  return (
    <Layout categories={props?.categories || []}>
      <Breadcrumb
        path={[
          {
            slug: '/kiem-tra-don-hang',
            name: 'Tra cứu đơn hàng',
          },
          {
            slug: `/kiem-tra-don-hang/${query.order}`,
            name: `#${query.order}`,
          },
        ]}
      />
      <OrderStatusProgress status={currentStatus} timeline={timeline} />
      <div className="grid grid-cols-12 w-full gap-5">
        <div className="col-span-8 border border-gray_C1 rounded-md p-3">
          <div className="flex items-center gap-1">
            <IconShoppingCart size={16} stroke={2} color="#333333" />
            <span className="text-dark_3 font-semibold text-md max_line-1">
              Sản phẩm ({products?.length || 0})
            </span>
          </div>
          <Divider className="h-[1px] my-3" />
          <div className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-5">
              <span className="font-semibold text-gray_68">Sản phẩm</span>
            </div>
            <div className="col-span-3 flex justify-center">
              <span className="font-semibold text-gray_68">Giá</span>
            </div>
            <div className="col-span-1 flex justify-center">
              <span className="font-semibold text-gray_68">Số lượng</span>
            </div>
            <div className="col-span-3 flex justify-end">
              <span className="font-semibold text-gray_68">Tổng tiền</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 mb-4">
            {products.map((product, index) => {
              const thumbnail =
                product?.product?.image_url ||
                product?.product?.colors?.[0]?.image_url ||
                '/assets/images/img_no_image.jpg';

              const nameProduct = product?.product?.name || (
                <span className="text-gray_B9 italic">{`< Chưa cập nhật >`}</span>
              );
              const colorProduct = product?.color;
              const sale = product?.sale;
              const priceProduct = calculateSalePrice(
                product?.price || 0,
                product?.sale || 0
              );

              return (
                <div key={index} className="grid grid-cols-12 gap-2">
                  <div className="col-span-1 relative h-[80px]">
                    <Image src={thumbnail} alt="" layout="fill" />
                  </div>
                  <div className="col-span-4">
                    <a
                      href={`/san-pham/${product?.product?._id}`}
                      className="hover:underline max_line-2"
                    >
                      {nameProduct}
                    </a>
                    {/* <div className="mt-1">
                      <span className="font-semibold">Màu: </span>
                      {colorProduct}
                    </div> */}
                    {sale > 0 && (
                      <div className="mt-1">
                        <span className="font-normal text-error">
                          Khuyến mãi: {sale}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-3 h-full flex flex-col items-center">
                    <span>{formatCurrency2(priceProduct)}</span>
                    {showReviewButton && (
                      <button
                        onClick={() => openReviewForm(product)}
                        className="mt-auto px-3 py-2 rounded-md bg-blue_00 text-white"
                      >
                        Đánh giá
                      </button>
                    )}
                  </div>
                  <div className="col-span-1 flex justify-center">
                    X {product?.quantity}
                  </div>
                  <div className="col-span-3 flex justify-end">{`= ${formatCurrency2(
                    priceProduct * product?.quantity
                  )}`}</div>
                </div>
              );
            })}
          </div>

          <div className="flex ml-auto"></div>
        </div>

        <div className="col-span-4 border border-gray_C1 rounded-md p-3">
          <div className="flex items-center gap-1">
            <IconReceipt2 size={16} stroke={2} color="#333333" />
            <span className="text-dark_3 font-semibold text-md max_line-1">
              Hóa đơn
            </span>
          </div>
          <Divider className="h-[1px] my-3" />

          <div className="flex flex-col gap-y-2 w-full">
            <p className="flex">
              <span className="mr-[60px] font-semibold">Tạm tính:</span>{' '}
              <span className="ml-auto">{formatCurrency2(totalPayment)}</span>
            </p>
            <p className="flex">
              <span className="mr-[60px] font-semibold">Giảm giá:</span>{' '}
              <span className="ml-auto">- {formatCurrency2(discount)}</span>
            </p>
            <p className="flex">
              <span className="mr-[60px] font-semibold">Phí vận chuyển:</span>{' '}
              <span className="ml-auto">{formatCurrency2(shipFee)}</span>
            </p>
            <p className="flex">
              <span className="mr-[60px] font-semibold">Tổng tiền:</span>{' '}
              <span className="ml-auto">{formatCurrency2(finalPayment)}</span>
            </p>
          </div>
        </div>

        <div
          className="col-span-12 border border-gray_C1 rounded-md p-3"
          id="printReport"
        >
          <div className="flex items-center gap-1">
            <IconInfoCircle size={16} stroke={2} color="#333333" />
            <span className="text-dark_3 font-semibold text-md max_line-1">
              Thông tin giao hàng
            </span>
          </div>
          <Divider className="h-[1px] my-3" />
          <div className="grid grid-cols-2 gap-x-4">
            {/* Customer */}
            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-gray_68 font-semibold text-lg italic">
                Khách hàng
              </p>
              <p className="flex">
                <span className="mr-[30px] font-semibold">Tên khách hàng:</span>{' '}
                <span className="">{account?.name}</span>
              </p>
              <p className="flex">
                <span className="mr-[30px] font-semibold">Số điện thoại:</span>{' '}
                <span className="">{account?.phone}</span>
              </p>
              <p className="flex">
                <span className="mr-[30px] font-semibold">Email:</span>{' '}
                <span className="">{account?.email}</span>
              </p>
            </div>
            {/* Address */}
            <div className="flex flex-col gap-y-2 w-full">
              <p className="text-gray_68 font-semibold text-lg italic">
                Địa chỉ
              </p>
              <p className="flex">
                <span className="mr-[30px] font-semibold">
                  Số nhà/đường/phường:
                </span>{' '}
                <span className="">{address?.address}</span>
              </p>
              <p className="flex">
                <span className="mr-[30px] font-semibold">Quận/huyện:</span>{' '}
                <span className="">{address?.district}</span>
              </p>
              <p className="flex">
                <span className="mr-[30px] font-semibold">Tỉnh/thành:</span>{' '}
                <span className="">{address?.province}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 flex items-center justify-end py-3 gap-x-4">
          {/* <button
            className="border border-dark_3 bg-baseColor p-2 rounded-lg"
            onClick={exportAsImage}
          >
            Xuất hóa đơn
          </button> */}
          {showCancelButton && (
            <button
              className="border border-error bg-error p-2 rounded-lg text-white"
              onClick={() => openModalOrDrawer(MODAL_KEYS.MODAL_CANCEL_ORDER)}
            >
              Hủy đơn
            </button>
          )}
        </div>

        <ModalContainer
          modalKey={MODAL_KEYS.MODAL_CANCEL_ORDER}
          animation="scale"
        >
          <ModalCancelOrder _id={query.order} />
        </ModalContainer>
        <ModalContainer
          modalKey={MODAL_KEYS.MODAL_REVIEW_PRODUCT}
          animation="fade"
        >
          <ModalReviewProduct product={productInfo} />
        </ModalContainer>
      </div>
    </Layout>
  );
};

const ModalReviewProduct = (props) => {
  const { product } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { name: rateName } = register('rate', {
    required: {
      value: true,
      message: 'Vui lòng chọn sao đánh giá',
    },
  });
  const [currRate, setCurrRate] = React.useState(0);

  const handleReview = async (data) => {
    try {
      const result = await API.post<any>({
        url: API_URL.PRODUCT_RATE,
        headers: { ...getAuthHeader() },
        body: {
          _id: product?.product?._id,
          rate: data.rate,
          message: data.message,
        },
      });
      if (responseHasError(result.error))
        throw Error(result?.message || result?.msg);

      toast.success('Đã gửi đánh giá');
      window.location.reload();
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="mt-3 max-w-[400px]">
      <h3 className="mb-3 text-center font-semibold uppercase px-[10px]">
        Đánh giá sản phẩm {product?.product?.name}
      </h3>
      <div className="mt-[20px]">
        <form
          onSubmit={handleSubmit(handleReview)}
          className="flex flex-col gap-3 px-[10px]"
        >
          <div>
            <StarRatings
              rating={currRate}
              starRatedColor="yellow"
              changeRating={(newRating) => {
                setCurrRate(newRating);
                setValue('rate', newRating);
              }}
              numberOfStars={5}
              name={rateName}
            />
            {errors?.rate && <ErrorText text={errors?.rate.message} />}
          </div>
          <div className="mt-4">
            <Flex
              className="py-[5px] px-[5px] gap-3 border border-[#c3c3c3]"
              alignItem="center"
            >
              <textarea
                {...register('message')}
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Nhập đánh giá của bạn"
                rows={5}
              ></textarea>
            </Flex>
          </div>

          <button
            type="submit"
            className="py-[5px] h-[40px] bg-blue_00 text-[#fff] rounded"
          >
            Gửi đánh giá
          </button>
          <button
            type="button"
            className="py-[5px] h-[40px] bg-gray_68 text-[#fff] rounded"
          >
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
};

const ModalCancelOrder = (props) => {
  const { _id } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCancelOrder = async (data) => {
    try {
      const result = await API.post<ReturnResponse<any>>({
        url: API_URL.BILL_UPDATE,
        headers: { ...getAuthHeader() },
        body: {
          _id,
          status: ORDER_STATUS.CANCELLED,
          desc: data.desc,
        },
      });
      if (responseHasError(result.error)) throw Error(result.message);
      window.location.reload();
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="mt-3">
      <h3 className="mb-3 text-center font-semibold uppercase">Hủy đơn hàng</h3>
      <div className="mt-[20px]">
        <form
          onSubmit={handleSubmit(handleCancelOrder)}
          className="flex flex-col gap-3 px-[10px]"
        >
          <div>
            <Flex
              className="py-[5px] px-[5px] gap-3 border border-[#c3c3c3]"
              alignItem="center"
            >
              <textarea
                {...register('desc', {
                  required: 'Vui lòng nhập lý do hủy đơn',
                })}
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Nhập lý do hủy đơn"
                rows={5}
              ></textarea>
            </Flex>
            {errors?.desc && <ErrorText text={errors?.desc.message} />}
          </div>

          <button
            type="submit"
            className="py-[5px] h-[40px] bg-error text-[#fff] rounded"
          >
            Xác nhận hủy đơn
          </button>
          <button
            type="button"
            className="py-[5px] h-[40px] bg-gray_68 text-[#fff] rounded"
          >
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
