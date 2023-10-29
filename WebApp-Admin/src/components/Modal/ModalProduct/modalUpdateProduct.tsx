import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../../apis/category/categoryApi";
import productApi from "../../../apis/product/product";
import { notifyError, notifySuccess } from "../../../utils/notify";
import authApi from "../../../apis/auth/authApi";
import supplierApi from "../../../apis/supplier/supplierApi";

export default function ModalUpdateProduct({
  setOpenModalUpdateProduct,
  setReload,
  _id,
}: any) {
  const [category, setCategory] = useState<Array<any>>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [specs, setSpecs] = useState<Array<any>>([]);
  const [imagesBase64, setImagesBase64] = useState<any>("");
  const [selectValue, setSelectValue] = useState([]);
  const [product, setProduct] = useState<any>();
  const [resetModal, setResetModal] = useState(0);
  const [supplier, setSupplier] = useState<Array<any>>([]);
  const [idUpdater, setIdUpdater] = useState("");

  // console.log(_id)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<any>({});

  const submit = async (data: any, e: any) => {
    e.preventDefault();
    data.image_base64 = imagesBase64;
    data.category = selectCategory;
    data.value = selectValue;

    let arr1 = Object.keys(data);
    let specs: { [k: string]: any } = {};
    const indexName = arr1.filter((item) => item.toString().startsWith("spec"));
    const indexValue = arr1.filter((item) =>
      item.toString().startsWith("value")
    );
    indexName.forEach((item, index) => {
      if (data[indexValue[index]]) {
        specs[data[item]] = data[indexValue[index]];
      }
    });
    const payload = {
      name: data.name,
      code: data.code,
      desc: data.desc,
      category: product?.category,
      specs: specs,
      price: data.price,
      sale: data.sale,
      supplier_name: data.supplier,
      image_base64: imagesBase64,
      _id: _id,
      idUpdater: idUpdater,
    };

    const result = await productApi.updateProduct(payload);
    console.log("payload", payload);
    if ((result.msg = "Thành công ")) {
      notifySuccess("Success");
      setResetModal(resetModal + 1);
      setReload((ref: number) => ref + 1);
      reset();
    } else notifyError("Fail");
  };

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

  function toDataUrl(url: any, callback: any) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  useEffect(() => {
    (async () => {
      const result = await categoryApi.getCategory();
      const currentUser = await authApi.getInfo();
      const sendId = "_id=" + _id;
      const resultProduct = await productApi.getDetilaProduct(sendId);
      const resultSupplier = await supplierApi.getListSupplier();
      setSupplier(resultSupplier.data);
      setIdUpdater(currentUser.data._id);
      setCategory(result.data);
      setProduct(resultProduct.data);
      toDataUrl(resultProduct.data.image_url, function (res: any) {
        const base64 = res.split(",");
        setImagesBase64(base64[1]);
      });
      for (const [key, value] of Object.entries(resultProduct.data)) {
        key != "specs" && setValue(key, value);
      }
    })();
  }, [resetModal]);

  // console.log('product',product)

  useEffect(() => {
    product &&
      (async () => {
        const result = await categoryApi.getSelectCategory(product.category);
        // console.log(product.category);
        setSpecs(result.data?.specsModel);
        // console.log("123", result.data.specsModel);
      })();
  }, [product]);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalUpdateProduct(false)}
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
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      defaultValue={product?.name}
                      placeholder="Product Name"
                    />
                  </div>
                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Code: </div>
                    <input
                      disabled
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      defaultValue={product?.code}
                      placeholder="Code"
                    />
                  </div>

                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Price: </div>
                    <input
                      {...register("price")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Price"
                      defaultValue={product?.price}
                    />
                  </div>

                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Sale: </div>
                    <input
                      {...register("sale")}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Sale"
                      defaultValue={product?.sale}
                    />
                  </div>
                  <div className="name flex justify-between items-center gap-2 mb-[20px]">
                    <div className="">Supplier: </div>
                    <select
                      value={product?.supplier_name}
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
                      defaultValue={product?.desc}
                    ></textarea>
                  </div>

                  <div className="name flex justify-between mb-[20px]">
                    <div>Image: </div>
                    <img
                      src={product?.image_url}
                      alt=""
                      className="w-[280px] h-[150px] object-contain"
                    />
                  </div>

                  <div className="name flex items-center justify-center gap-2 mb-[20px]">
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
                  <>{product?.category}</>
                  <SpecsCategory
                    setValue={setValue}
                    register={register}
                    listSpecs={specs}
                    listDetail={product?.specs}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-[100px] p-2 rounded-sm text-center bg-green-500 relative left-[42%] text-white"
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
  list: any;
};

const SpecsCategory = ({
  register,
  listSpecs,
  setValue,
  listDetail,
}: {
  register: any;
  setValue: any;
  listSpecs: any;
  listDetail: any;
}) => {
  const [arr, setArr] = useState<any[]>([]);
  useEffect(() => {
    if (listDetail) {
      const specs = [];
      for (const [key, value] of Object.entries(listDetail)) {
        specs.push({ name: key, value });
      }
      setArr(specs);
    }
  }, [listDetail]);
  useEffect(() => {
    return () => {
      setArr([]);
    };
  }, []);
  return (
    <div className="flex flex-col gap-[10px]">
      {listSpecs?.map((item: any, index: any) => {
        setValue(`spec${index + 1}`, item.name);
        return (
          <ShowSpecs
            register={register}
            id={index + 1}
            key={index}
            name={item.name}
            values={item.values}
            list={arr[index]?.value}
          />
        );
      })}
    </div>
  );
};

const ShowSpecs = ({ register, id, name, values, list }: Props) => {
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
          <select {...register(`value${id}`)}>
            <option value={list}>{list}</option>
            {values.map((item: any, index: any) => {
              if (item.value !== list)
                return (
                  <option key={index} value={item.value}>
                    {item.value}
                  </option>
                );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};
