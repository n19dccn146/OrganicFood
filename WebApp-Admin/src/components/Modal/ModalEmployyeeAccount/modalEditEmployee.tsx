import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authApi from "../../../apis/auth/authApi";
import { notifyError, notifySuccess } from "../../../utils/notify";
import userApi from "../../../apis/user/userApi";

export default function ModelEditEmployee({
  setOpenModalEditEmployee,
  reload,
  _idUser,
}: any) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<any>({});
  const [user, setUser] = useState<any>();
  useEffect(() => {
    (async () => {
      const resultEmployee = await userApi.getAUser(_idUser);
      setUser(resultEmployee);
    })();
  }, []);
  const PHONE_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);
  const handleSelectChange = (e: any) => {
    setSelectedRole(e.target.value);
  };

  useEffect(() => {
    // Cập nhật giá trị của 'role' khi 'selectedRole' thay đổi
    setValue("role", selectedRole);
  }, [selectedRole]);

  const submit = async (data: any, e: any) => {
    console.log("log");
    e.preventDefault();
    const payload = {
      // email: data.email,
      // phone: data.phone,
      // name: data.name,
      role: selectedRole,
    };
    const result = await userApi.editAUser(_idUser, payload);
    console.log(result.msg);
    if (result.msg === "Thành công") {
      // Sử dụng toán tử so sánh ===
      notifySuccess("Success");
      reload((ref: any) => ref + 1);
      reset();
    } else {
      notifyError("Fail");
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalEditEmployee(false)}
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
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    disabled
                    defaultValue={user?.name}
                    placeholder="Ho va Ten"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Số điện thoại </div>
                  <input
                    {...register("phone")}
                    defaultValue={user?.phone}
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    disabled
                    placeholder="Nhập số điện thoại (bắt buộc)"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Email </div>
                  <input
                    {...register("email")}
                    defaultValue={user?.email}
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    disabled
                    placeholder="Email"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1">Role </div>
                  <select
                    className="flex-auto shadow appearance-none border rounded py-2 px-3 w-[210px] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="role"
                    value={selectedRole} // Thay đổi giá trị value thành selectedRole
                    onChange={handleSelectChange}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Sale">Sale</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
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
