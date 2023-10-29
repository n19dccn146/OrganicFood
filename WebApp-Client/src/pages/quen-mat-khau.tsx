import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import ErrorText from '~/components/common/errorText';
import Flex from '~/components/common/flex';
import ImageRender from '~/components/common/imageRender';
import { API_URL } from '~/constants/api.constant';
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

  const sendEmailForgetPassword = async (data: any) => {
    try {
      const result = await API.post<any>({
        url: API_URL.FORGOTPASSWORD,
        body: {
          email: data.email,
        },
      });
      console.log(result);
      if (result.status !== 204) throw new Error(result.message);
      setSended(true);
      toast.success(result?.msg);
    } catch (error) {
      setSended(false);
      toast.error(error?.message || error?.data?.message);
    }
  };

  const goHomePage = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-start mb-6">
          <a href={'/'}>
            <ImageRender src="/favicon.svg" alt="logo" className="h-8 w-8" />
          </a>
        </div>
        {!sended ? (
          <form
            onSubmit={handleSubmit(sendEmailForgetPassword)}
            className="flex flex-col"
          >
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Nhập email để lấy lại mật khẩu
              </label>
              <input
                {...register('email', {
                  required: 'Vui lòng nhập email',
                })}
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                placeholder="Email"
              />
              {errors?.email && <ErrorText text={errors?.email.message} />}
            </div>

            <button
              type="submit"
              className="bg-black  hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Gửi
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Kiểm tra email để đặt lại mật khẩu!
            </h3>
            <button
              onClick={goHomePage}
              className="bg-black  hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Quay về trang chủ
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputOTP;
