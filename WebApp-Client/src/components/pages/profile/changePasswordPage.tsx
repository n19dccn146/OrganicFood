import { IconEye, IconEyeOff } from '@tabler/icons';
import Head from 'next/head';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorText from '~/components/common/errorText';
import { PASSWORD_REGEX } from '~/constants/regex.constants';
import Layout from '~/layouts/Layout';
import ProfilePageFrame from './components/profilePageFrame';
import { error } from 'console';
import { API_URL } from '~/constants/api.constant';
import API, { getAuthHeader } from '~/services/axiosClient';
import { responseHasError } from '~/helpers/base.helper';
import { toast } from 'react-hot-toast';

const ChangePasswordPage = (props) => {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   getValues,
  //   handleData,
  // } = useForm();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;
    console.log(oldPassword, newPassword, confirmPassword);
  };

  const handleInputOldPasswod = (e) => {
    setOldPassword(e.target.value);
    console.log('old pass ==>' + e.target.value);
  };
  const handleInputNewPasswod = (e) => {
    setNewPassword(e.target.value);
    console.log('new pass ==>' + e.target.value);
  };
  const handleInputConfirmPasswod = (e) => {
    setConfirmPassword(e.target.value);
    console.log('confirm pass ==>' + e.target.value);
  };

  const handleChangePassworUser = async (e) => {
    e.preventDefault();
    try {
      const result = await API.post<any>({
        url: API_URL.CHANGE_PASSWORD,
        headers: { ...getAuthHeader() },
        body: {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
      });

      console.log(result);

      if (result.status === 200) {
        toast.success('Đổi mật khẩu thành công');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        // if (responseHasError(result.error))
        throw Error(result?.message || result?.msg);
      }
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };

  return (
    <>
      <Head>
        <title>Đổi mật khẩu</title>
      </Head>
      <Layout categories={props?.categories || []}>
        <ProfilePageFrame>
          <div className="px-[20px]">
            <div className="flex justify-center">
              <div className="">
                <h3 className="text-xl font-semibold uppercase text-center">
                  Đổi mật khẩu
                </h3>
                <form
                  className="max-w-[400px] mt-2"
                  onSubmit={handleChangePassworUser}
                >
                  <div className="">
                    <label htmlFor="oldPassword">Mật khẩu cũ</label>
                    <PasswordInput
                      handleData={handleInputOldPasswod}
                      // register={register}
                      value={oldPassword}
                      name="oldPassword"
                      placeholder="Nhập mật khẩu"
                    />
                    {/* {errors?.oldPassword && (
                      <ErrorText text={errors['oldPassword'].message} />
                    )} */}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="newPassword">Mật khẩu mới</label>
                    <PasswordInput
                      handleData={handleInputNewPasswod}
                      // register={register}
                      value={newPassword}
                      name="newPassword"
                      placeholder="Nhập mật khẩu"
                    />
                    {/* {errors?.newPassword && (
                      <ErrorText text={errors['newPassword'].message} />
                    )} */}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="confirmPassword">
                      Xác nhận mật khẩu mới
                    </label>
                    <PasswordInput
                      // register={register}
                      value={confirmPassword}
                      handleData={handleInputConfirmPasswod}
                      name="confirmPassword"
                      placeholder="Nhập mật khẩu"
                      // validate={{
                      //   validate: (value) =>
                      //     value === getValues('newPassword') ||
                      //     'Mật khẩu không khớp',
                      // }}
                    />
                    {/* {errors?.confirmPassword && (
                      <ErrorText text={errors['confirmPassword'].message} />
                    )} */}
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="rounded-lg bg-dark_1 text-white h-12 block w-full"
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ProfilePageFrame>
      </Layout>
    </>
  );
};

const PasswordInput = ({
  handleData,
  name,
  value,
  placeholder = '',
  validate = {},
}) => {
  const [showPass, setShowPass] = React.useState(false);
  const refInput = React.useRef(null);

  const changeState = () => {
    refInput.current.type = showPass ? 'password' : 'text';
    setShowPass(!showPass);
  };

  return (
    <div className="flex items-center h-[48px] border border-gray_F1 rounded-xl px-3 ">
      <input
        // required={'Vui lòng nhập mật khẩu'}
        onChange={handleData}
        id={name}
        type="password"
        ref={refInput}
        value={value}
        className="h-full px-4 py-2 outline-none"
        placeholder={placeholder}
      />
      <span onClick={changeState}>
        {showPass ? <IconEyeOff /> : <IconEye />}
      </span>
    </div>
  );
};

export default ChangePasswordPage;
