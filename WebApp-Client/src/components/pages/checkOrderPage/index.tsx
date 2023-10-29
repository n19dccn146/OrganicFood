// import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import Breadcrumb from '~/components/common/breadcrumbs';
import ErrorText from '~/components/common/errorText';
import { MODAL_KEYS } from '~/constants/modal.constants';
import { openModalOrDrawer } from '~/helpers/modal.helper';
import Layout from '~/layouts/Layout';
import useAuth from '~/stores/auth';

const CheckOrderPage = (props: any) => {
  return (
    <Layout categories={props?.categories || []}>
      <Breadcrumb
        path={[
          {
            slug: '/kiem-tra-don-hang',
            name: 'Tra cứu đơn hàng',
          },
        ]}
      />
      <CheckOrderForm />
    </Layout>
  );
};

const CheckOrderForm = () => {
  return (
    <div className="my-[30px] px-[150px]">
      <p className="text-center text-3xl font-semibold">
        Kiểm tra thông tin đơn hàng <br /> và tình trạng vận chuyển
      </p>
      <div className="flex justify-center">
        <FormCheckOrder />
      </div>
    </div>
  );
};

const FormCheckOrder = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const router = useRouter();
  const [{ signedIn }] = useAuth();

  const submit = async (data) => {
    try {
      window.location.href = `/kiem-tra-don-hang/${data.order}`;
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mt-[20px] px-[70px] rounded-lg flex flex-col items-center gap-y-4 justify-center bg-gray_F1 min-w-[500px] max-w-[500px] p-3"
    >
      {/* <div className="w-full">
        <input
          {...register('phone', {
            required: {
              value: true,
              message: 'Vui lòng nhập số điện thoại',
            },
            pattern: {
              value: PHONE_REGEX,
              message: 'Số điện thoại không đúng định dạng',
            },
          })}
          type="text"
          className="px-2 py-1 outline-none w-full rounded-md"
          placeholder="Nhập số điện thoại (bắt buộc)"
        />
        {errors?.phone && <ErrorText text={errors?.phone.message} />}
      </div> */}
      {signedIn ? (
        <>
          <div className="w-full">
            <input
              {...register('order', {
                required: {
                  value: true,
                  message: 'Vui lòng nhập mã đơn hàng',
                },
              })}
              type="text"
              className="px-2 py-1 outline-none w-full rounded-md"
              placeholder="Nhập mã đơn hàng (bắt buộc)"
            />
            {errors?.order && <ErrorText text={errors?.order.message} />}
          </div>
          <button
            type="submit"
            className="w-full px-2 py-1 bg-black text-white rounded-md"
          >
            Tra cứu
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => openModalOrDrawer(MODAL_KEYS.MODAL_LOGIN)}
          className="w-full px-2 py-1 bg-baseColor text-black rounded-md"
        >
          Đăng nhập để tra cứu
        </button>
      )}

      {/* <div className="flex items-center w-full">
        <div className="flex-1 border-t border-gray_D9"></div>
        <span className="mx-[10px]">Hoặc</span>
        <div className="flex-1 border-t border-gray_D9"></div>
      </div>

      <button
        type="button"
        onClick={() => openModalOrDrawer(MODAL_KEYS.MODAL_LOGIN)}
        className="w-full px-2 py-1 bg-baseColor text-black rounded-md"
      >
        Đăng nhập để tra cứu thuận tiện hơn
      </button> */}
    </form>
  );
};

export default CheckOrderPage;
