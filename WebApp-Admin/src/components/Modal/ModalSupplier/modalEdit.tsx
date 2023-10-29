import { yupResolver } from "@hookform/resolvers/yup";
import { Button, notification, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../../apis/category/categoryApi";
import productApi from "../../../apis/product/product";
import supplierApi from "../../../apis/supplier/supplierApi";
import { notifyError, notifySuccess } from "../../../utils/notify";

export default function ModalEdit({
  setOpenModalEditSupplier,
  reload,
  _id,
}: any) {
  type FormValues = {
    name: string;
    desc: string;
    slug: string;
    phone: string;
    address: {
      province: string;
      district: string;
      address: string;
    };
  };
  const [flag, setFlag] = useState(false);
  const [supplier, setSupplier] = useState<any>();
  const [selectCategory, setSelectCategory] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  useEffect(() => {
    (async () => {
      const resultSupplier = await supplierApi.getASupplier(_id);
      console.log(resultSupplier);
      setSupplier(resultSupplier);
    })();
  }, []);

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const name = data.name === "" ? supplier?.name || "" : data.name;
    console.log(name);

    // Kiểm tra và gán giá trị cho desc
    const desc = data.desc === "" ? supplier?.desc || "" : data.desc;

    // Kiểm tra và gán giá trị cho slug
    const slug = data.slug === "" ? supplier?.slug || "" : data.slug;
    // Kiểm tra và gán giá trị cho phone
    const phone = data.phone === "" ? supplier?.phone || "" : data.phone;

    // Kiểm tra và gán giá trị cho address.province
    const province =
      data.address.province.trim() === ""
        ? supplier?.address.province || ""
        : data.address.province;

    // Kiểm tra và gán giá trị cho address.district
    const district =
      data.address.district.trim() === ""
        ? supplier?.address.district || ""
        : data.address.district;

    // Kiểm tra và gán giá trị cho address.address
    const address =
      data.address.address.trim() === ""
        ? supplier?.address.address || ""
        : data.address.address;

    const payload = {
      name: name,
      desc: desc,
      slug: slug,
      phone: phone,
      address: {
        province: province,
        district: district,
        address: address,
      },
    };

    const result = await supplierApi.editSupplier(_id, payload);
    console.log("resultApi", result);

    console.log("statust", result.statusCode);

    if (result.msg === "Thành công") {
      notifySuccess("Update Success");
      reload((ref: number) => ref + 1);
      setFlag(false);
      reset();
    } else {
      notifyError("Update Fail");
    }
    return;
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalEditSupplier(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[800px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Add Supplier
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="flex justify-between gap-4">
                <div className="left">
                  <div className="name flex justify-between items-center gap-2 mb-[20px] ">
                    <div className="">Name: </div>
                    <input
                      {...register("name")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-9"
                      id="name"
                      type="text"
                      defaultValue={supplier?.name}
                      onChange={(e) => setValue("name", e.target.value)}
                      placeholder="Supplier Name"
                    />
                  </div>
                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">slug: </div>
                    <input
                      {...register("slug")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-9"
                      id="slug"
                      type="text"
                      defaultValue={supplier?.slug}
                      onChange={(e) => setValue("slug", e.target.value)}
                      placeholder="Slug"
                    />
                  </div>
                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Phone: </div>
                    <input
                      {...register("phone")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-9"
                      id="phone"
                      type="text"
                      defaultValue={supplier?.phone}
                      onChange={(e) => setValue("phone", e.target.value)}
                      placeholder="phone"
                    />
                  </div>
                </div>
                <div className="center w-[400px]">
                  <div className="name flex justify-between gap-2 mb-[20px]">
                    <label
                      aria-label="message"
                      className="block flex-0 flex-shrink-0 basis-[105px] mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Description:
                    </label>
                    <textarea
                      {...register("desc")}
                      id="desc"
                      rows={4}
                      defaultValue={supplier?.desc}
                      className="block shadow p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                      placeholder="Write your description here..."
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="name flex justify-between items-center gap-2 mb-[20px]">
                  <div className="">Address: </div>
                  <input
                    {...register("address.province")}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="province"
                    type="text"
                    defaultValue={supplier?.address?.province}
                    onChange={(e) =>
                      setValue("address.province", e.target.value)
                    }
                    placeholder="province"
                  />
                  <input
                    {...register("address.district")}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="district"
                    type="text"
                    defaultValue={supplier?.address?.district}
                    onChange={(e) =>
                      setValue("address.district", e.target.value)
                    }
                    placeholder="distric"
                  />
                  <input
                    {...register("address.address")}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address"
                    type="text"
                    defaultValue={supplier?.address?.address}
                    onChange={(e) =>
                      setValue("address.address", e.target.value)
                    }
                    placeholder="address"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-[100px] p-2 rounded-sm text-center bg-green-500 relative left-[40%] text-white"
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
