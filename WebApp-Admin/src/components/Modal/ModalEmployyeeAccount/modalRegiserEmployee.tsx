import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApi from "../../../apis/auth/authApi";
import { notifyError, notifySuccess } from "../../../utils/notify";

export default function ModalRegiserEmployee({
  setShowModalRegisterEmployee,
  reload,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({});
  const PHONE_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  const [selectedRole, setSelectedRole] = useState("");

  const handleSelectChange = (e: any) => {
    setSelectedRole(e.target.value);
    console.log(e.target.value);
  };
  const submit = async (data: any, e: any) => {
    console.log("sss");
    e.preventDefault();
    const payload = {
      email: data.email,
      phone: data.phone,
      password: data.password,
      name: data.name,
      role: selectedRole,
      isEmailVerified: data.isEmailVerified,
      favorite: data.favorite,
      chats: data.chats,
      rate_waits: data.rate_waits,
      bills: data.bills,
      warning: data.warning,
      cart: data.cart,
      notifications: data.notifications,
      gender: data.gender,
      birth: data.birth,
    };
    console.log(payload);
    const result = await authApi.register(payload);
    console.log(result.message);
    if (result.message === "Account created") {
      notifySuccess("Success");
      reload((ref: any) => ref + 1);
      reset();
    } else notifyError("Fail");
  };

  const handleSelect = (e: any) => {
    if (e.target.value !== "Select") {
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModalRegisterEmployee(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[700px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Register Account Employee
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="px-[60px]">
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Họ và Tên </div>
                  <input
                    {...register("name")}
                    required
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Ho va Ten"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Số điện thoại </div>
                  <input
                    {...register("phone", {
                      required: "Vui lòng nhập số điện thoại",
                      pattern: {
                        value: PHONE_REGEX,
                        message: "Số điện thoại không hợp lệ",
                      },
                    })}
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Nhập số điện thoại (bắt buộc)"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Email </div>
                  <input
                    {...register("email")}
                    required
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Email"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Role </div>
                  <select
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 w-[210px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleSelectChange}
                  >
                    <option value="">Select:</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Sale">Sale</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Mật khẩu </div>
                  <input
                    {...register("password")}
                    required
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="password"
                    placeholder="Mat Khau"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-[100px] p-2 rounded-sm text-center bg-green-500 relative left-[40%] mt-[20px] text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
