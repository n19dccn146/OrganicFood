import Head from 'next/head';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ErrorText from '~/components/common/errorText';
import Flex from '~/components/common/flex';
import ModalContainer from '~/components/common/modalContainer';
import { API_URL } from '~/constants/api.constant';
import { MODAL_KEYS } from '~/constants/modal.constants';
import { PHONE_REGEX } from '~/constants/regex.constants';
import { responseHasError } from '~/helpers/base.helper';
import { DateJS } from '~/helpers/date.helper';
import { openModalOrDrawer } from '~/helpers/modal.helper';
import Layout from '~/layouts/Layout';
import API, { getAuthHeader } from '~/services/axiosClient';
import useAuth from '~/stores/auth';
import ProfilePageFrame from './components/profilePageFrame';

const ProfileInfoPage = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm();

  const [{ userInfo }] = useAuth();

  React.useEffect(() => {
    if (userInfo) {
      setValue('name', userInfo.name);
      setValue('email', userInfo.email);
      setValue('phone', userInfo.phone);
      setValue('gender', userInfo.gender || 'female');
      setValue(
        'birth',
        userInfo.birth || DateJS.getFormatDate(null, 'YYYY-MM-DD')
      );
    }
  }, [userInfo]);

  const handleUpdateProfile = async (data) => {
    try {
      const { phone, email, ...payload } = data;
      const result = await API.post<any>({
        url: API_URL.UPDATE_INFO,
        headers: { ...getAuthHeader() },
        body: {
          name: payload.name,
          gender: payload.gender,
          birth: payload.birth,
        },
      });
      if (responseHasError(result.error)) throw Error(result.message);
      toast.success('Đã cập nhật thông tin');
    } catch (error) {
      toast.error('', error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Thông tin cá nhân</title>
      </Head>
      <Layout categories={props?.categories || []}>
        <ProfilePageFrame>
          <div className="px-[20px]">
            <div className="flex justify-center">
              <div className="">
                <h3 className="text-xl font-semibold uppercase text-center">
                  Thông tin cá nhân
                </h3>
                <form
                  className="max-w-[500px] min-w-[400px] mt-4"
                  onSubmit={handleSubmit(handleUpdateProfile)}
                >
                  {/* name */}
                  <div className="">
                    <label htmlFor="name">Họ tên</label>
                    <div className="flex items-center h-[48px] border border-gray_F1 rounded-xl px-3 mt-1">
                      <input
                        {...register('name')}
                        id={'name'}
                        type="text"
                        className="h-full w-full px-2 py-2 outline-none"
                        placeholder={'Họ tên'}
                      />
                    </div>
                  </div>
                  {/* phone */}
                  <div className="mt-4">
                    <label htmlFor="phone">Số điện thoại</label>
                    <div className="flex items-center h-[48px] border border-gray_F1 rounded-xl px-3 mt-1 bg-gray_F1">
                      <input
                        {...register('phone')}
                        id={'phone'}
                        type="text"
                        className="h-full w-full px-2 py-2 outline-none bg-transparent"
                        placeholder={'Số điện thoại'}
                        disabled
                      />
                      <span
                        className="text-blue_00 cursor-pointer"
                        onClick={() =>
                          openModalOrDrawer(MODAL_KEYS.MODAL_CHANGE_PHONE)
                        }
                      >
                        Sửa
                      </span>
                    </div>
                  </div>
                  {/* phone */}
                  <div className="mt-4">
                    <label htmlFor="email">Email</label>
                    <div className="flex items-center h-[48px] border border-gray_F1 rounded-xl px-3 mt-1 bg-gray_F1">
                      <input
                        {...register('email')}
                        id={'email'}
                        type="email"
                        className="h-full w-full px-2 py-2 outline-none bg-transparent"
                        placeholder={'Email'}
                        disabled
                      />
                    </div>
                  </div>
                  {/* gender */}
                  <div className="mt-4">
                    <label htmlFor="gender">Giới tính</label>
                    <div className="flex items-center gap-8">
                      <label htmlFor="male" className="flex items-center">
                        <input
                          defaultChecked
                          {...register('gender')}
                          type="radio"
                          id="male"
                          value={'male'}
                        />
                        <span className="ml-3">Nam</span>
                      </label>
                      <label htmlFor="female" className="flex items-center">
                        <input
                          {...register('gender')}
                          type="radio"
                          id="female"
                          value={'female'}
                        />
                        <span className="ml-3">Nữ</span>
                      </label>
                    </div>
                  </div>
                  {/* gender */}
                  <div className="mt-4">
                    <label htmlFor="birth">Ngày sinh</label>
                    <div className="flex items-center h-[48px] border border-gray_F1 rounded-xl px-3 mt-1">
                      <input
                        {...register('birth')}
                        id={'birth'}
                        type="date"
                        className="h-full w-full px-2 py-2 outline-none bg-transparent"
                        placeholder={'DD-MM-YYYY'}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="rounded-lg bg-dark_1 text-white h-12 block w-full disabled:bg-dark_3"
                      disabled={!isDirty}
                    >
                      Lưu
                    </button>
                  </div>
                </form>

                <ModalContainer
                  modalKey={MODAL_KEYS.MODAL_CHANGE_PHONE}
                  animation="fade"
                >
                  <ModalChangePhone />
                </ModalContainer>
              </div>
            </div>
          </div>
        </ProfilePageFrame>
      </Layout>
    </>
  );
};

const ModalChangePhone = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [{ userInfo }] = useAuth();
  const handleReview = async (data) => {
    try {
      console.log(userInfo.email);
      const result = await API.post<any>({
        url: API_URL.UPDATE_CHANGE_PHONE,
        headers: { ...getAuthHeader() },
        body: {
          user: userInfo.email,
          phone: data.phone,
        },
      });
      if (responseHasError(result.error))
        throw Error(result?.message || result?.msg);

      toast.success('Đã thay đổi số điện thoại');
      window.location.reload();
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="mt-3 max-w-[400px]">
      <h3 className="mb-3 text-center font-semibold uppercase px-[10px]">
        Đổi số điện thoại
      </h3>
      <div className="mt-[10px]">
        <form
          onSubmit={handleSubmit(handleReview)}
          className="flex flex-col gap-3 px-[10px]"
        >
          <div className="mt-2">
            <Flex
              className="py-[5px] px-[5px] gap-3 border border-[#c3c3c3] rounded"
              alignItem="center"
            >
              <input
                {...register('phone', {
                  required: 'Vui lòng nhập số điện thoại',
                  pattern: {
                    value: PHONE_REGEX,
                    message: 'Số điện thoại không hợp lệ',
                  },
                })}
                className="border-none outline-none bg-transparent flex-1 rounded"
                placeholder="Nhập số điện thoại mới"
              />
            </Flex>
            {errors?.phone && <ErrorText text={errors?.phone.message} />}
          </div>
          <button
            type="submit"
            className="py-[5px] h-[40px] bg-blue_00 text-[#fff] rounded"
          >
            Lưu
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

export default ProfileInfoPage;
