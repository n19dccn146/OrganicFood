import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import discountApi from "../../../apis/discount/discount.api";
import productApi from "../../../apis/product/product";
import { notifyError, notifySuccess } from "../../../utils/notify";

export default function ModalDiscount({
  setOpenModalDiscount,
  _idProduct,
}: any) {
  type FormValues = {
    image_base64: Array<any>;
  };

  const [codeDiscount, setCodeDiscount] = useState(0);
  const [idDiscount, setIdDiscount] = useState(0);
  const [listDiscount, setListDiscount] = useState<Array<any>>([]);
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  const payloadDelete = {
    _id: idDiscount,
    code: codeDiscount,
    products_del: [_idProduct],
  };

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    setDisabled(true);
    // console.log(data);
    const payload = {
      _id: idDiscount,
      code: codeDiscount,
      products_add: [_idProduct],
    };
    console.log(payload);

    const submit = await productApi.editDiscount(payload);
    if (submit.msg === "Thành công ") {
      setDisabled(false);
      notifySuccess("Success");
      reset();
    } else notifyError("Fail");
    console.log(submit);
  };

  const handleSelect = (e: any) => {
    if (e.target.value !== "Select") {
      setCodeDiscount(e.target.value);
      const selectedItem = listDiscount.find(
        (item: any) => item.code === e.target.value
      );
      setIdDiscount(selectedItem._id);
    }
  };
  // console.log(codeDiscount);

  const handleDeleteDiscout = async () => {
    setDisabled(true);
    const submitDel = await productApi.editDiscount(payloadDelete);
    if (submitDel.msg === "Thành công ") {
      setDisabled(false);
      notifySuccess("Success");
      reset();
    } else notifyError("Fail");
    console.log(submitDel);
  };

  useEffect(() => {
    (async () => {
      const result = await discountApi.getListDiscount();
      console.log("listDiscount", result.data);

      const filteredDiscounts = result.data.filter(
        (value: any) => new Date(value.dateEnd) >= new Date()
      );
      console.log(
        "Expired discounts:",
        result.data.filter((value: any) => new Date(value.dateEnd) < new Date())
      );

      setListDiscount(filteredDiscounts);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalDiscount(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[300px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Import Discount
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <div className="name flex items-center gap-[45px] mb-[20px]">
                  <div>Discount: </div>
                  <select name="" id="" onChange={handleSelect}>
                    <option value="Select">Select</option>
                    {listDiscount
                      .filter((value: any, index: number) => {
                        if (value.enable === true) {
                          return value;
                        } else return "";
                      })
                      .map((item: any, index: number) => (
                        <option key={index} value={item.code}>
                          {item.code}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="relative left-[10%] flex gap-[10px]">
                <button
                  disabled={disabled}
                  type="submit"
                  className="w-[100px] p-2 rounded-sm text-center bg-green-500  text-white"
                >
                  Submit
                </button>
                <button
                  disabled={disabled}
                  onClick={handleDeleteDiscout}
                  type="button"
                  className="w-[100px] p-2 rounded-sm text-center bg-red-500  text-white"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
