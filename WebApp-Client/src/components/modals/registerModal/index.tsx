import {
  IconDeviceMobile,
  IconKey,
  IconMail,
  IconShieldLock,
  IconUserCircle,
} from '@tabler/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import ErrorText from '~/components/common/errorText';
import Flex from '~/components/common/flex';
import ImageRender from '~/components/common/imageRender';
import { API_URL } from '~/constants/api.constant';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { MODAL_KEYS } from '~/constants/modal.constants';
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from '~/constants/regex.constants';
import { responseHasError } from '~/helpers/base.helper';
import { setCookie } from '~/helpers/cookie.helper';
import { closeModalOrDrawer, openModalOrDrawer } from '~/helpers/modal.helper';
import { ACCESS_REFRESH_TOKEN } from '~/models/token.model';
import { USER_MODEL } from '~/models/user.model';
import API from '~/services/axiosClient';
import { ReturnResponse } from '~/services/response.interface';

interface IResRegister {
  user: USER_MODEL;
  tokens: ACCESS_REFRESH_TOKEN;
}

const ModalRegister = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data: any) => {
    const { agreeTerms, confirmPassword, ...payload } = data;
    if (agreeTerms) {
      try {
        const result = await API.post<ReturnResponse<IResRegister>>({
          url: API_URL.REGISTER,
          body: {
            ...payload,
          },
        });

        if (responseHasError(result.error)) throw new Error(result.message);

        await API.post<ReturnResponse<IResRegister>>({
          url: API_URL.VERIFY_EMAIL,
          body: {
            ...payload,
          },
        });

        // setCookie(COOKIE_KEYS.ACCESS_TOKEN, result.data.tokens.access.token);
        // setCookie(COOKIE_KEYS.REFRESH_TOKEN, result.data.tokens.refresh.token);

        toast.success('Đăng ký thành công');

        window.location.reload();
      } catch (error) {
        toast.error(error?.message || error?.data?.message);
      }
    }
  };

  return (
    <div className="mt-3">
      <Flex alignItem="center" className="justify-center">
        <ImageRender
          src="/favicon.svg"
          alt="logo"
          className="h-full w-[40px]"
        />
      </Flex>
      <div className="mt-[20px]">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="flex flex-col gap-3 px-[10px]"
        >
          <div>
            <Flex
              className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
              alignItem="center"
            >
              <IconDeviceMobile size={20} />
              <input
                {...register('phone', {
                  required: 'Vui lòng nhập số điện thoại',
                  pattern: {
                    value: PHONE_REGEX,
                    message: 'Số điện thoại không hợp lệ',
                  },
                })}
                type="text"
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Nhập số điện thoại (bắt buộc)"
              />
            </Flex>
            {errors?.phone && <ErrorText text={errors?.phone.message} />}
          </div>
          <div>
            <Flex
              className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
              alignItem="center"
            >
              <IconMail size={20} />
              <input
                {...register('email', {
                  required: 'Vui lòng nhập email',
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Email không hợp lệ',
                  },
                })}
                type="email"
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Nhập email (bắt buộc)"
              />
            </Flex>
            {errors?.email && <ErrorText text={errors?.email.message} />}
          </div>
          <div>
            <Flex
              className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
              alignItem="center"
            >
              <IconUserCircle size={20} />
              <input
                {...register('name', {
                  required: 'Vui lòng nhập họ tên',
                  minLength: 5,
                  maxLength: 30,
                })}
                type="text"
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Nhập họ tên (bắt buộc)"
              />
            </Flex>
            {errors?.name && <ErrorText text={errors?.name.message} />}
          </div>
          <div>
            <Flex
              className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
              alignItem="center"
            >
              <IconKey size={20} />
              <input
                {...register('password', {
                  required: 'Vui lòng nhập mật khẩu',
                  pattern: {
                    value: PASSWORD_REGEX,
                    message: 'Ít nhất 8 ký tự, ít nhất 1 số và 1 chữ cái',
                  },
                })}
                type="password"
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Nhập mật khẩu"
              />
            </Flex>
            {errors?.password && <ErrorText text={errors?.password.message} />}
          </div>
          <div>
            <Flex
              className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
              alignItem="center"
            >
              <IconShieldLock size={20} />
              <input
                {...register('confirmPassword', {
                  required: 'Vui lòng xác nhận mật khẩu',
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'Mật khẩu không trùng';
                    }
                  },
                })}
                type="password"
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Xác nhận mật khẩu"
              />
            </Flex>
            {errors?.confirmPassword && (
              <ErrorText text={errors?.confirmPassword.message} />
            )}
          </div>
          <div className="">
            <label htmlFor="agreeTerms" className="flex items-center gap-2">
              <input
                type="checkbox"
                id="agreeTerms"
                {...register('agreeTerms', {
                  required: 'Vui lòng chấp nhận điều khoản sử dụng',
                })}
              />
              <span>Tôi đồng ý với các điều khoản sử dụng</span>
            </label>
            {errors?.agreeTerms && (
              <ErrorText text={errors?.agreeTerms.message} />
            )}
          </div>
          <button
            type="submit"
            className="py-[5px] h-[40px] bg-[#000] text-[#fff] rounded"
          >
            Đăng ký
          </button>
          <button
            onClick={() => {
              closeModalOrDrawer(MODAL_KEYS.MODAL_REGISTER);
              openModalOrDrawer(MODAL_KEYS.MODAL_LOGIN);
            }}
            type="button"
            className="text-[#3c3cf5] cursor-pointer"
          >
            Đã có tài khoản? Đăng nhập
          </button>
          {/* <a className="text-[#0000ee] cursor-pointer text-center">
            Tạo tài khoản
          </a> */}
        </form>
      </div>
    </div>
  );
};

export default ModalRegister;
