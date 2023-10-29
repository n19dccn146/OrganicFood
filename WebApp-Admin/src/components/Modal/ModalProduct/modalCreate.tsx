import { yupResolver } from "@hookform/resolvers/yup";
import { Button, notification, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../../apis/category/categoryApi";
import productApi from "../../../apis/product/product";
import { notifyError, notifySuccess } from "../../../utils/notify";
import supplierApi from "../../../apis/supplier/supplierApi";
import authApi from "../../../apis/auth/authApi";

export default function ModalCreate({ setOpenModal, setReload }: any) {
  type FormValues = {
    name: string;
    code: number;
    price: number;
    sale: number;
    desc: string;
    supplier: string;
  };

  const [flag, setFlag] = useState(false);
  const [supplier, setSupplier] = useState<Array<any>>([]);
  const [category, setCategory] = useState<Array<any>>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [specs, setSpecs] = useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = useState<any>("");
  const [selectValue, setSelectValue] = useState([]);
  const [idUpdater, setIdUpdater] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

  const getBase64 = (file: any, cb: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

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
    console.log(data);
    e.preventDefault();
    data.image_base64 = imagesBase64;
    data.category = selectCategory;
    data.value = selectValue;

    let arr1 = Object.keys(data);
    let specs: { [k: string]: any } = {};
    // const indexName = arr1.filter((item) => item.toString().startsWith("spec"));
    // const indexValue = arr1.filter((item) =>
    //   item.toString().startsWith("value")
    // );
    // indexName.forEach((item, index) => {
    //   if (data[indexValue[index]]) {
    //     specs[data[item]] = data[indexValue[index]];
    //   }
    // });
    if (data.supplier == "") {
      notifyError("Please select supplier !!");
      return;
    }
    const payload = {
      name: data.name,
      code: data.code,
      desc: data.desc,
      category: data.category,
      specs: specs,
      price: data.price,
      sale: data.sale,
      supplier_name: data.supplier,
      image_base64: imagesBase64,
      idUpdater: idUpdater,
    };

    const result = await productApi.createProduct(payload);
    console.log("resultApi", result);

    // console.log("payload", payload);

    if (result.statusCode === 200) {
      notifySuccess("Create Success");
      setReload((ref: number) => ref + 1);
      setFlag(false);
      setOpenModal(false);
      reset();
    } else {
      notifyError("Create Fail");
    }
    return;
  };

  useEffect(() => {
    (async () => {
      const resultSupplier = await supplierApi.getListSupplier();
      setSupplier(resultSupplier.data);
      // console.log(resultSupplier.data);
      const result = await categoryApi.getCategory();
      setCategory(result.data);
      const currentUser = await authApi.getInfo();
      setIdUpdater(currentUser.data._id);
      console.log(currentUser);
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
          <div className="relative w-full max-w-[1200px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Add product
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div className="flex justify-between gap-4">
                <div className="left">
                  <div className="name flex justify-between items-center gap-2 mb-[20px] ">
                    <div className="">Name: </div>
                    <input
                      {...register("name")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Code: </div>
                    <input
                      {...register("code")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Code"
                    />
                  </div>

                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Price: </div>
                    <input
                      {...register("price")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Price"
                    />
                  </div>

                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Sale: </div>
                    <input
                      {...register("sale")}
                      required
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="%"
                    />
                  </div>

                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Supplier: </div>
                    <select
                      {...register("supplier")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-[200px]"
                    >
                      <option value={""}>Chọn</option>
                      {supplier.map((item: any, index: any) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="center w-[400px]">
                  <div className="name flex justify-between gap-2 mb-[20px]">
                    <label
                      aria-label="message"
                      className="block flex-0 flex-shrink-0 basis-[105px] mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description:
                    </label>
                    <textarea
                      {...register("desc")}
                      id="message"
                      rows={4}
                      className="block shadow p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                      placeholder="Write your description here..."
                    ></textarea>
                  </div>

                  <div className="name flex items-center gap-2 mb-[20px]">
                    <div className="flex-0 flex-shrink-0 basis-[105px]">
                      Image:{" "}
                    </div>
                    <Upload.Dragger
                      maxCount={1}
                      listType="picture-card"
                      showUploadList={{
                        showRemoveIcon: true,
                        showPreviewIcon: false,
                      }}
                      accept=".png, .jpg"
                      beforeUpload={(file: any) => {
                        getBase64(file, (result: any) => {
                          const base64 = result.split(",");
                          setImagesBase64(base64[1]);
                        });
                        return false;
                      }}
                    >
                      <Button>Upload file</Button>
                    </Upload.Dragger>
                  </div>
                </div>
                <div className="right w-[450px]">
                  <select
                    className="flex items-start h-[25px] mb-4"
                    onChange={handleSelectCat}
                  >
                    <option value="Select" key={-1}>
                      Select:
                    </option>
                    {category.map((item: any, index: number) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {flag ? (
                    <SpecsCategory
                      setValue={setValue}
                      register={register}
                      listSpecs={specs}
                    />
                  ) : (
                    ""
                  )}
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
