import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import discountApi from "../../../apis/discount/discount.api";
import { notifyError, notifySuccess } from "../../../utils/notify";
import { ToastContainer, toast } from "react-toastify";

export default function ModalEditDiscount({
  setOpenModalEditEmployee,
  _idDiscountr,
  reload,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({});
  const [flag, setFlag] = useState(false);
  const [discount, setDiscount] = useState<any>();
  const [enableValue, setEnableValue] = useState<string | undefined>(
    discount?.enable.toString()
  );
  const [ispercentValue, setIsPercentValue] = useState<string | undefined>(
    discount?.is_percent.toString()
  );
  const [isShipValue, setIsShipValue] = useState<string | undefined>(
    discount?.is_ship.toString()
  );
  const [isOidValue, setIsOidValue] = useState<string | undefined>(
    discount?.is_oid.toString()
  );
  const [isOicValue, setIsOicValue] = useState<string | undefined>(
    discount?.is_oic.toString()
  );
  useEffect(() => {
    // Sử dụng 1 biến tạm để lưu trữ giá trị khi tải dữ liệu từ server
    let isMounted = true;

    // Hàm async tự gọi của useEffect
    const fetchData = async () => {
      try {
        const resultDiscount = await discountApi.getADiscount(_idDiscountr);

        // Kiểm tra nếu component vẫn được mounted thì cập nhật trạng thái
        if (isMounted) {
          setEnableValue(resultDiscount.enable.toString());
          setIsPercentValue(resultDiscount.is_percent.toString());
          setIsShipValue(resultDiscount.is_ship.toString());
          setIsOidValue(resultDiscount.is_oid.toString());
          setIsOicValue(resultDiscount.is_oic.toString());
          setDiscount(resultDiscount);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();

    // Xử lý trường hợp component bị unmounted
    return () => {
      isMounted = false;
    };
  }, [_idDiscountr]);
  const handleEnableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnableValue(e.target.value);
  };
  const handlePercentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsPercentValue(e.target.value);
  };
  const handleOidChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOidValue(e.target.value);
  };
  const handleOicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsOicValue(e.target.value);
  };
  const submit = async (data: any, e: any) => {
    e.preventDefault();

    const code = data.code === "" ? discount?.code || "" : data.code;
    const enable = data.enable === "" ? discount?.enable || "" : data.enable;
    const dateEnd =
      data.dateEnd === "" ? discount?.dateEnd || "" : data.dateEnd;
    const dateStart =
      data.dateStart === "" ? discount?.dateStart || "" : data.dateStart;
    const quantity =
      data.quantity === "" ? discount?.quantity || "" : data.quantity;
    const minPrice =
      data.minPrice === "" ? discount?.minPrice || "" : data.minPrice;
    const maxPrice =
      data.maxPrice === "" ? discount?.maxPrice || "" : data.maxPrice;
    const is_percent =
      data.is_percent === "" ? discount?.is_percent || "" : data.is_percent;
    const is_ship =
      data.is_ship === "" ? discount?.is_ship || "" : data.is_ship;
    const is_oic = data.is_oic === "" ? discount?.is_oic || "" : data.is_oic;
    const is_oid = data.is_oid === "" ? discount?.is_oid || "" : data.is_oid;
    const value = data.value === "" ? discount?.value || "" : data.value;

    const payload = {
      _id: _idDiscountr,
      code: code,
      enable: Boolean(enable),
      dateEnd: dateEnd,
      dateStart: dateStart,
      quantity: Number(quantity),
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      is_percent: Boolean(is_percent),
      is_ship: Boolean(is_ship),
      is_oic: Boolean(is_oic),
      is_oid: Boolean(is_oid),
      value: Number(value),
    };
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const today = date.getTime();
    const fromDate = new Date(dateStart).getTime();
    const toDate = new Date(dateEnd).getTime();
    // if(fromDate<today ){
    //   toast.error("Ngày bắt đầu phải lớn hơn ngày hiện tại!", {
    //     position: "top-center",
    //     autoClose: 1000,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //   });
    //   return;
    // }
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

    console.log(payload);
    console.log(discount.products);
    if (discount.products.length !== 0) {
      notifyError("Fail: Khuyen Mai da duoc Add");
      return;
    }

    if (payload.minPrice > payload.maxPrice) {
      notifyError("Fail: MinPrice > MaxPrice");
      return;
    }
    const result = await discountApi.eidtDiscount(payload);
    console.log(result);
    if (result.msg === "Thành công ") {
      notifySuccess("Update Success");
      reload((ref: number) => ref + 1);
      setOpenModalEditEmployee(false);
      setFlag(false);
      reset();
    } else {
      notifyError("Update Fail");
    }
    return;
  };
  // Format the date before setting it as the default value
  const formattedDateEnd = discount
    ? new Date(discount.dateEnd).toISOString().slice(0, 10)
    : "";
  const formattedDateStart = discount
    ? new Date(discount.dateStart).toISOString().slice(0, 10)
    : "";

  // Convert the boolean value to a string ("true" or "false")

  const handleSelect = (e: any) => {
    if (e.target.value !== "Select") {
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
              Import Discount
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="flex gap-4">
                <div>
                  <div className="name flex justify-center items-center  gap-2 mb-[20px]">
                    <div className="flex-1 text-end">Code: </div>
                    <input
                      {...register("code")}
                      defaultValue={discount?.code}
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
                      defaultValue={discount?.maxPrice}
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
                      defaultValue={discount?.minPrice}
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
                      defaultValue={discount?.quantity}
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
                      defaultValue={discount?.value}
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
                      value={enableValue}
                      onChange={handleEnableChange}
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
                      value={ispercentValue}
                      onChange={handlePercentChange}
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
                      value={isShipValue}
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
                      Customer type
                    </label>
                    <select
                      {...register("is_oic")}
                      value={isOicValue}
                      onChange={handleOicChange}
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

                  <div className="flex items-center gap-4 mb-2   ">
                    <label
                      htmlFor="countries_disabled"
                      className="block w-[200px] text-sm font-medium text-gray-900 dark:text-black"
                    >
                      One in day
                    </label>
                    <select
                      {...register("is_oid")}
                      value={isOidValue}
                      onChange={handleOidChange}
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
                      defaultValue={formattedDateStart}
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
                      defaultValue={formattedDateEnd}
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
