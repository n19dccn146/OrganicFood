import { IconDeviceMobile, IconKey, IconNumber1 } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ErrorText from '~/components/common/errorText';
import Flex from '~/components/common/flex';
import ImageRender from '~/components/common/imageRender';
import { API_URL } from '~/constants/api.constant';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { MODAL_KEYS } from '~/constants/modal.constants';
import { responseHasError } from '~/helpers/base.helper';
import { setCookie } from '~/helpers/cookie.helper';
import { closeModalOrDrawer, openModalOrDrawer } from '~/helpers/modal.helper';
import { ACCESS_REFRESH_TOKEN } from '~/models/token.model';
import { USER_MODEL } from '~/models/user.model';
import API from '~/services/axiosClient';
import { ReturnResponse } from '~/services/response.interface';

const VALIDATION_EMAIL_E001 = 'Vui lòng nhập số điện thoại hoặc email'
const VALIDATION_PASSWORD_E001 = 'Vui lòng nhập mật khẩu'

interface IResLogin {
  enable: boolean;
  user: USER_MODEL;
  tokens: ACCESS_REFRESH_TOKEN;
}

enum LoginType {
  PASSWORD = 0,
  OTP = 1,
}

const ModalLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [type, setType] = React.useState(LoginType.PASSWORD);
  const { query } = useRouter();

  const handleLogin = async (data: any) => {
    try {
      const result = await API.post<ReturnResponse<IResLogin>>({
        url: API_URL.LOGIN,
        body: {
          username: data.username,
          password: data.password,
        },
      });
      if (responseHasError(result.error)) throw new Error(result.message);

      console.log(result);
      if (result.data.user.enable === false) {
        toast.error('Account Blocked!!');
        return;
      }
      toast.success('Đăng nhập thành công');

      setCookie(COOKIE_KEYS.ACCESS_TOKEN, result.data.tokens.access.token);
      setCookie(COOKIE_KEYS.REFRESH_TOKEN, result.data.tokens.refresh.token);

      const backURL = (query?.backURL as string) || '/';
      window.location.href = backURL;
      // closeModalOrDrawer(MODAL_KEYS.MODAL_LOGIN);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const handleSendOTP = async (data: any) => {
    try {
      await API.post<any>({
        url: API_URL.GET_OTP,
        body: {
          email: data.username,
        },
      });

      //   if (responseHasError(result.error)) throw new Error(result.message);
      //   toast.success(result?.msg);

      window.location.href = `/nhap-otp?email_or_phone=${data.username}`;
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const handleForgotPasswordClick = async (email) => {
    try {
      await API.post<any>({
        url: API_URL.FORGOTPASSWORD,
        body: {
          username: email,
        },
      });

        // if (responseHasError(result.error)) throw new Error(result.message);
        // toast.success(result?.msg);

      window.location.href = `/quen-mat-khau`;
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  const handleChangeType = (e) => {
    const value = e.target.value;
    console.log(e.target.value);
    setType(value);
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
          onSubmit={handleSubmit(
            type == LoginType.PASSWORD ? handleLogin : handleSendOTP
          )}
          className="flex flex-col gap-3 px-[10px]"
        >
          <div>
            <Flex
              className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
              alignItem="center"
            >
              <IconDeviceMobile size={20} />
              <input
                {...register('username', {
                  required: VALIDATION_EMAIL_E001,
                })}
                type="text"
                className="border-none outline-none bg-transparent flex-1"
                placeholder="Nhập số điện thoại hoặc email"
              />
            </Flex>
            {errors?.username && <ErrorText text={errors?.username.message} />}
          </div>
          {type == LoginType.PASSWORD && (
            <PasswordInput register={register} errors={errors} />
          )}
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="type_password" className="flex items-center">
              <input
                defaultChecked
                type="radio"
                id="type_password"
                name="type_picker"
                value={LoginType.PASSWORD}
                onChange={handleChangeType}
              />
              <span className="ml-3">Mật khẩu</span>
            </label>
            <label htmlFor="type_otp" className="flex items-center">
              <input
                type="radio"
                id="type_otp"
                name="type_picker"
                value={LoginType.OTP}
                onChange={handleChangeType}
              />
              <span className="ml-3">Mã OTP</span>
            </label>
          </div>
          <label htmlFor="remember" className="flex items-center gap-2">
            <input type="checkbox" name="remember" id="remember" />
            <span>Giữ đăng nhập</span>
          </label>
          <button
            type="submit"
            className="py-[5px] h-[40px] bg-green text-[#fff] rounded"
          >
            {type == LoginType.PASSWORD ? 'Đăng nhập' : 'Gửi mã OTP'}
          </button>
          <a
            className="text-[#3c3cf5] cursor-pointer"
            onClick={() => handleForgotPasswordClick(getValues('username'))}
          >
            Quên mật khẩu?
          </a>
          <button
            type="button"
            onClick={() => {
              closeModalOrDrawer(MODAL_KEYS.MODAL_LOGIN);
              openModalOrDrawer(MODAL_KEYS.MODAL_REGISTER);
            }}
            className="text-[#0000ee] cursor-pointer text-center"
          >
            Tạo tài khoản
          </button>
        </form>
      </div>
    </div>
  );
};

const PasswordInput = (props) => {
  const { register, errors } = props;
  return (
    <div>
      <Flex
        className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
        alignItem="center"
      >
        <IconKey size={20} />
        <input
          {...register('password', {
            required: VALIDATION_PASSWORD_E001,
            minLength: {
              value: 6,
              message: 'Nhập ít nhất 6 ký tự',
            },
          })}
          type="password"
          className="border-none outline-none bg-transparent flex-1"
          placeholder="Nhập mật khẩu"
        />
      </Flex>
      {errors?.password && <ErrorText text={errors?.password.message} />}
    </div>
  );
};

const OTPInput = (props) => {
  const { register, errors } = props;
  return (
    <div>
      <Flex
        className="py-[5px] h-[40px] gap-3 border-b border-b-[#c3c3c3]"
        alignItem="center"
      >
        <IconNumber1 size={20} />
        <input
          {...register('otp', {
            required: 'Vui lòng nhập mã otp',
          })}
          type="text"
          className="border-none outline-none bg-transparent flex-1"
          placeholder="Nhập mã otp"
        />
      </Flex>
      {errors?.otp && <ErrorText text={errors?.otp.message} />}
    </div>
  );
};

export default ModalLogin;
