import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import discountApi from "../../../apis/discount/discount.api";
import productApi from "../../../apis/product/product";
import userApi from "../../../apis/user/userApi";
import { notifyError, notifySuccess } from "../../../utils/notify";

export default function ModalSendMail({ setOpenModalSendMail, listUser }: any) {
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({});

  const filterList = [...new Set(listUser)];

  console.log(filterList);

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    // console.log(data);
    setDisabled(true);

    const payload = {
      emails: filterList,
      subject: data.subject,
      message: data.message,
    };
    console.log(payload);

    const result = await userApi.sendMail(payload);
    console.log(result);

    if ((result.msg = "Thành công ")) {
      setDisabled(false);
      notifySuccess("Success");
      reset();
    } else notifyError("Fail");
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalSendMail(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[300px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">Send Mail</div>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <div className="name flex items-center gap-[45px] mb-[20px]">
                  <div>Tittle: </div>
                  <input
                    {...register("subject")}
                    type="text"
                    className="border border-black pt-1 pl-1 pb-1"
                    required
                  />
                </div>
                <div className="name flex items-center gap-[15px] mb-[20px]">
                  <div>Message: </div>

                  <textarea
                    className="resize-none w-full p-2 border border-black"
                    {...register("message")}
                    required
                    cols={3}
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  disabled={disabled}
                  type="submit"
                  className="w-[100px] p-2 rounded-sm text-center bg-green-500  text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
