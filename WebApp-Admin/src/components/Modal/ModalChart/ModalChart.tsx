import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import productApi from "../../../apis/product/product";
import { notifyError, notifySuccess } from "../../../utils/notify";

export default function ModalChart({
  setOpenModalChart,
  dateStart,
  dateEnd,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({});

  const [stateReset, setStateReset] = useState(false);

  const handleReset = () => {
    setStateReset(!stateReset);
  };

  const submit = async (sm: any, e: any) => {
    e.preventDefault();
    const data: any = {
      dateStart: dateStart,
      dateEnd: dateEnd,
      reset: stateReset,
    };
    var results = await axios({
      url: "https://dabit-store-hint.herokuapp.com/model/build",
      data: data,
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    console.log("results", results);
    console.log("data", data);
    if (results.status === 200) {
      if (results.data.success === "Fail") notifyError(results.data.msg);
      else notifySuccess(results.data.msg);
      reset();
      // console.log(data);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalChart(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[400px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Export Data
            </div>

            <form
              onSubmit={handleSubmit(submit)}
              style={{ alignItems: "center" }}
            >
              <div className="formInput w-[200px] mx-auto pb-4">
                <label style={{ textAlign: "center" }}>
                  Tạo lại: &nbsp;
                  <input
                    {...register("reset")}
                    type="radio"
                    defaultChecked
                    value="false"
                    name="reset"
                    onChange={handleReset}
                  />
                  Không
                  <input
                    {...register("reset")}
                    className="ml-4"
                    type="radio"
                    value="true"
                    name="reset"
                    onChange={handleReset}
                  />
                  Có
                </label>
              </div>
              <button className=" block bg-blue-500 rounded w-[100px] h-10 mx-auto text-white">
                Gửi dữ liệu
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
