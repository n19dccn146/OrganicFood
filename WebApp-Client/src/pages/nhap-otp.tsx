import { IconNumber1 } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ErrorText from '~/components/common/errorText';
import Flex from '~/components/common/flex';
import ImageRender from '~/components/common/imageRender';
import { API_URL } from '~/constants/api.constant';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { responseHasError } from '~/helpers/base.helper';
import { setCookie } from '~/helpers/cookie.helper';
import API from '~/services/axiosClient';
import { ReturnResponse } from '~/services/response.interface';

function InputOTP() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { query } = useRouter();

  const email_or_phone = query?.['email_or_phone'] as string;

  const handleCheckOTP = async (data: any) => {
    try {
      const result = await API.post<ReturnResponse<any>>({
        url: API_URL.CHECK_OTP,
        body: {
          username: email_or_phone,
          code: data.code,
        },
      });

      if (responseHasError(result.error)) throw new Error(result.message);
      toast.success('Đăng nhập bằng mã otp thành công');

      setCookie(COOKIE_KEYS.ACCESS_TOKEN, result.data.tokens.access.token);
      setCookie(COOKIE_KEYS.REFRESH_TOKEN, result.data.tokens.refresh.token);

      window.location.href = '/';
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <div className="w-screen h-screen p-10">
      <div className="flex flex-col items-center">
        <Flex alignItem="center" className="col-span-1 justify-start mb-10">
          <a href={'/'}>
            <ImageRender
              src="/favicon.svg"
              alt="logo"
              className="h-full w-[40px]"
            />
          </a>
        </Flex>
        <form
          onSubmit={handleSubmit(handleCheckOTP)}
          className="flex flex-col w-[250px]"
        >
          <Flex
            className="py-[5px] h-[40px] gap-3 border border-[#c3c3c3] rounded-lg"
            alignItem="center"
          >
            <IconNumber1 size={20} />
            <input
              {...register('code', {
                required: 'Vui lòng nhập mã otp',
              })}
              type="text"
              className="border-none outline-none bg-transparent flex-1"
              placeholder="Nhập mã otp"
            />
          </Flex>
          {errors?.code && <ErrorText text={errors?.code.message} />}

          <button
            type="submit"
            className="py-[5px] h-[40px] bg-[#000] text-[#fff] rounded mt-5"
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputOTP;
