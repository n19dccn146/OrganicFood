import { yupResolver } from "@hookform/resolvers/yup";
import { Button, notification, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../../apis/category/categoryApi";
import productApi from "../../../apis/product/product";
import supplierApi from "../../../apis/supplier/supplierApi";
import { notifyError, notifySuccess } from "../../../utils/notify";

export default function ModalCreate({ setOpenModal, setReload }: any) {
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
  const [supplier, setCategory] = useState<Array<any>>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [specs, setSpecs] = useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = useState<any>("");
  const [selectValue, setSelectValue] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  const handleSelectCat = (e: any) => {
    if (e.target.value !== "Select") {
      setSelectCategory(e.target.value);
      (async () => {
        const result = await categoryApi.getSelectCategory(e.target.value);
        setSpecs(result.data.specsModel);
        // console.log(result.data.specsModel);
        setFlag(true);
      })();
    } else {
      setFlag(false);
    }
  };
  // console.log(category);

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    const payload = {
      name: data.name,
      desc: data.desc,
      slug: data.slug,
      phone: data.phone,
      address: {
        province: data.province,
        district: data.district,
        address: data.address,
      },
    };

    const result = await supplierApi.createSupplier(payload);
    console.log("resultApi", result);

    // console.log("payload", payload);

    if (result.statusCode === 200) {
      notifySuccess("Create Success");
      setReload((ref: number) => ref + 1);
      setFlag(false);
      reset();
    } else {
      notifyError("Create Fail");
    }
    return;
  };

  useEffect(() => {
    (async () => {
      const result = await categoryApi.getCategory();
      setCategory(result.data);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModal(false)}
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
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-9"
                      id="username"
                      type="text"
                      placeholder="Supplier Name"
                    />
                  </div>
                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">slug: </div>
                    <input
                      {...register("slug")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-9"
                      id="slug"
                      type="text"
                      placeholder="Slug"
                    />
                  </div>
                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Phone: </div>
                    <input
                      {...register("phone")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-9"
                      id="phone"
                      type="text"
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
                      id="message"
                      rows={4}
                      required
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
                    required
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="province"
                  />
                  <input
                    {...register("address.district")}
                    required
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="distric"
                  />
                  <input
                    {...register("address.address")}
                    required
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
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

type Props = {
  register: any;
  id: number;
  name: string;
  values: any;
};

const SpecsCategory = ({
  register,
  listSpecs,
  setValue,
}: {
  register: any;
  setValue: any;
  listSpecs: any;
}) => {
  return (
    <div className="flex flex-col gap-[10px]">
      {listSpecs.map((item: any, index: any) => {
        setValue(`spec${index + 1}`, item.name);
        return (
          <ShowSpecs
            register={register}
            id={index + 1}
            key={index}
            name={item.name}
            values={item.values}
          />
        );
      })}
    </div>
  );
};

const ShowSpecs = ({ register, id, name, values }: Props) => {
  return (
    <div className="formInput flex flex-col gap-[5px]">
      <div className="specs-input flex">
        <input
          //   {...register(`spec${id}`)}

          type="text"
          value={name}
          disabled
          placeholder="Name Spec"
        />
        <div className="select">
          <select {...register(`value${id}`)} className="flex w-[250px]">
            <option value={""}>Chọn</option>
            {values.map((item: any, index: any) => (
              <option key={index} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
