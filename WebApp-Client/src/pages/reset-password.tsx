import { IconNumber1 } from '@tabler/icons';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
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
  const [sended, setSended] = useState(false);
  const token = query?.['token'] as string;

  console.log(token);
  const resetPassword = async (data: any) => {
    try {
      console.log(data);
      const result = await API.post<any>({
        url: API_URL.RESETPASSWORD(token),
        body: {
          // token: token,
          password: data.password,
        },
      });
      console.log(result);
      if (result.status !== 204) throw new Error(result.message);
      setSended(true);
      toast.success('Cập nhật mk thành công !!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      setSended(false);
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
          onSubmit={handleSubmit(resetPassword)}
          className="flex flex-col w-[250px]"
        >
          <Flex
            className="py-[5px] h-[40px] gap-3 border border-[#c3c3c3] rounded-lg"
            alignItem="center"
          >
            {/* <IconNumber1 size={20} /> */}
            <input
              {...register('password', {
                required: 'Vui lòng nhập mật khẩu',
              })}
              type="password"
              className="border-none outline-none bg-transparent flex-1 pl-3"
              placeholder="Nhập mật khẩu mới"
            />
          </Flex>
          {errors?.password && <ErrorText text={errors?.password.message} />}

          <button
            type="submit"
            className="py-[5px] h-[40px] bg-[#000] text-[#fff] rounded mt-5"
          >
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputOTP;
