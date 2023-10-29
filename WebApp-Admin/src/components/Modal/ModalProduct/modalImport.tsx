import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import productApi from "../../../apis/product/product";
import { notifyError, notifySuccess } from "../../../utils/notify";
import authApi from "../../../apis/auth/authApi";
import { ToastContainer, toast } from "react-toastify";

export default function ModalImport({
  setOpenModalImport,
  _id,
  setReload,
}: any) {
  type FormValues = {
    quantity: number;
    price: number;
    exp: Date;
  };

  const [colorModal, setColorModal] = useState<Array<any>>([]);
  const [colorSubmit, setColorSubmit] = useState("");
  const [nameProduct, setNameProduct] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  const submit = async (data: any, e: any) => {
    debugger
    e.preventDefault();
    const selectedDate = new Date(data.exp).getTime();
    const currentDate = new Date().getTime();
    let tmpPrice:number = data.price;
    let tmpQuantity:number = data.quantity;
    if (selectedDate < currentDate) {
      toast.error("Ngày phải lớn hơn ngày hiện tại", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (
      selectedDate / 1000 / 60 / 60 / 24 - currentDate / 1000 / 60 / 60 / 24 <
      7
    ) {
      toast.error("Ngày phải lớn hơn ngày hiện tại 7 ngày", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if(tmpQuantity<=0){
      toast.error("Số lượng phải lớn hơn 0!", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if(tmpPrice<=0){
      toast.error("Giá nhập phải lớn hơn 0!", {
        position: "top-center",
        autoClose: 1000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    const payload = {
      data: [
        {
          code: _id,
          color: nameProduct,
          quantity: Number(data.quantity),
          price: Number(data.price),
          exp: data.exp,
        },
      ],
    };
    // console.log(payload);
    const result = await productApi.importProduct(payload);
    console.log("resultApi", result);
    if (result.failure.length === 0) {
      notifySuccess("Import Success");
      setReload((ref: number) => ref + 1);
      setColorSubmit("");
      reset();
    } else {
      notifyError("Import Fail");
    }
  };

  const handleSelect = (e: any) => {
    if (e.target.value !== "Select") {
      console.log(e.target.value);
      setColorSubmit(e.target.value);
    }
  };

  useEffect(() => {
    (async () => {
      const sendId = "code=" + _id;
      const result = await productApi.getDetilaProduct(sendId);
      console.log(result);
      setColorModal(result.data.colors);
      setNameProduct(result.data.name);
      // const currentUser = await authApi.getInfo();
      // console.log(currentUser.data.name);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalImport(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[300px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Import Product
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  {/* <label
                    htmlFor="countries_disabled"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >
                    Name:
                  </label> */}
                  <span>{nameProduct}</span>
                  {/* <select
                    required
                    onChange={handleSelect}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="Select">Select</option>
                    {colorModal.map((color: any, index: number) => (
                      <option key={index} value={color.color}>
                        {color.color}
                      </option>
                    ))}
                  </select> */}
                </div>

                <div className="name flex justify-center items-center  gap-2 mb-[20px]">
                  <div className="flex-1 text-end">Quantity: </div>
                  <input
                    {...register("quantity")}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Quantity"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1 text-end">Price: </div>
                  <input
                    {...register("price")}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Price"
                  />
                </div>
                <div className="name flex justify-center items-center gap-2 mb-[20px]">
                  <div className="flex-1 text-end">Exp: </div>
                  <input
                    {...register("exp")}
                    required
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="Date"
                    placeholder="Exp"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-[100px] p-2 rounded-sm text-center bg-green-500 relative left-[35%] text-white"
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
