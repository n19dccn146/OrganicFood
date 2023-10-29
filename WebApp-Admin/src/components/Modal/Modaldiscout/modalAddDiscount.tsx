import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import discountApi from "../../../apis/discount/discount.api";
import { notifyError, notifySuccess } from "../../../utils/notify";
import { ToastContainer, toast } from "react-toastify";

export default function ModalAddDiscount({
  setShowModalDiscount,
  reload,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({});

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const payload = {
      code: data.code,
      enable: Boolean(data.enable),
      dateEnd: data.dateEnd,
      dateStart: data.dateStart,
      quantity: Number(data.quantity),
      minPrice: Number(data.minPrice),
      maxPrice: Number(data.maxPrice),
      is_percent: Boolean(data.is_percent),
      is_ship: Boolean(data.is_ship),
      is_oic: true,
      is_oid: Boolean(data.is_oid),
      value: Number(data.value),
    };
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const today = date.getTime();
    const fromDate = new Date(data.dateStart).getTime();
    const toDate = new Date(data.dateEnd).getTime();
    if(fromDate<today ){
      toast.error("Ngày bắt đầu phải lớn hơn ngày hiện tại!", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if(fromDate>toDate){
      toast.error("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (payload.minPrice > payload.maxPrice) {
      notifyError("Fail: MinPrice > MaxPrice");
      return;
    }
    console.log(payload);
    const result = await discountApi.addDiscount(payload);
    console.log(result);
    if ((result.msg == "Thành công ")) {
      notifySuccess("Success");
      reload((ref: any) => ref + 1);
      reset();
    }else notifyError("Fail");
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
          onClick={() => setShowModalDiscount(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[700px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Import Discount
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="flex gap-4">
                <div>
                  <div className="name flex justify-center items-center  gap-2 mb-[20px]">
                    <div className="flex-1 text-end">Code: </div>
                    <input
                      {...register("code")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Code"
                    />
                  </div>
                  <div className="name flex justify-center items-center gap-2 mb-[20px]">
                    <div className="flex-1 text-end">Max Price: </div>
                    <input
                      {...register("maxPrice")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Max Price"
                    />
                  </div>
                  <div className="name flex justify-center items-center gap-2 mb-[20px]">
                    <div className="flex-1 text-end">Min Price: </div>
                    <input
                      {...register("minPrice")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Min Price"
                    />
                  </div>
                  <div className="name flex justify-center items-center gap-2 mb-[20px]">
                    <div className="flex-1 text-end">Quantity: </div>
                    <input
                      {...register("quantity")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Quantity"
                    />
                  </div>
                  <div className="name flex justify-center items-center gap-2 mb-[20px]">
                    <div className="flex-1 text-end">Value: </div>
                    <input
                      {...register("value")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Value"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2  ">
                    <label
                      htmlFor="countries_disabled"
                      className="block w-[200px] text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Enable
                    </label>
                    <select
                      {...register("enable")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option key="1" value="">
                        false
                      </option>
                      <option key="2" value="true">
                        true
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 mb-2  ">
                    <label
                      htmlFor="countries_disabled"
                      className="block w-[200px] text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Percent Type
                    </label>
                    <select
                      {...register("is_percent")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option key="1" value="">
                        false
                      </option>
                      <option key="2" value="true">
                        true
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 mb-2  hidden">
                    <label
                      htmlFor="countries_disabled"
                      className="block w-[200px] text-sm font-medium text-gray-900 dark:text-black hidden"
                    >
                      Ship type
                    </label>
                    <select
                      {...register("is_ship")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option key="1" value="">
                        false
                      </option>
                      <option key="2" value="true">
                        true
                      </option>
                    </select>
                  </div>

                  {/* <div className="flex items-center gap-4 mb-2  ">
                    <label
                      htmlFor="countries_disabled"
                      className="block w-[200px] text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Customer type
                    </label>
                    <select
                      {...register("is_oic")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option key="1" value="">
                        false
                      </option>
                      <option key="2" value="true">
                        true
                      </option>
                    </select>
                  </div> */}

                  <div className="flex items-center gap-4 mb-2   ">
                    <label
                      htmlFor="countries_disabled"
                      className="block w-[200px] text-sm font-medium text-gray-900 dark:text-black"
                    >
                      One in day
                    </label>
                    <select
                      {...register("is_oid")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option key="1" value="">
                        false
                      </option>
                      <option key="2" value="true">
                        true
                      </option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="countries_disabled"
                      className="block text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Date Start
                    </label>
                    <input
                      {...register("dateStart")}
                      required
                      type="date"
                      id="dateStart"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <label
                      htmlFor="countries_disabled"
                      className="block  text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Date End
                    </label>
                    <input
                      type="date"
                      id="dateEnd"
                      {...register("dateEnd")}
                      required
                    />
                  </div>
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
