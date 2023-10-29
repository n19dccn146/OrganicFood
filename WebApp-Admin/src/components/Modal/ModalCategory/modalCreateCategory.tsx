import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../../apis/category/categoryApi";
import { notifyError, notifySuccess } from "../../../utils/notify";
import Specs from "./specs";
import supplierApi from "../../../apis/supplier/supplierApi";

export default function ModalCreateCategory({
  setOpenModalCreateCategory,
  setReload,
}: any) {
  type FormValues = {
    name: string;
    slug: string;
  };

  const [category, setCategory] = useState(""); //Biến trạng thái lưu trữ tên danh mục sản phẩm
  const [imagesBase64, setImagesBase64] = useState<any>(""); // Biến trạng thái lưu trữ hình ảnh của danh mục sp dưới dạng chuỗi base64
  const [iconBase64, setIconBase64] = useState<any>(""); //Biến dạng trạng thái lưu trữ biểu tượng của danh mục sản phẩm dưới dạng chuỗi base64
  const [supplier, setSupplier] = useState<Array<any>>([]);
  //Hàm này chuyển đổi file hình ảnh sang chuỗi base64 và gọi hàm cb để lưu trữ kết quả
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({}); //useForm để quản lí biểu mẫu và xác thực dữ liệu

  //Xử lý việc gửi dữ liệu đăng ký danh mục sản phẩm mới lên server sau khi người dùng nhấn nút 'Submit'
  const submit = async (data: any, e: any) => {
    e.preventDefault();

    const nameCategory = data.name;
    delete data.name;
    const slug = data.slug;
    delete data.slug;
    var arr1 = Object.keys(data);
    var arr2 = Object.values(data);
    let values: any[] = [];
    let name: any[] = [];
    let temp: any[] = [];
    let specs_model: any[] = [];

    let newArray: any[] = [];
    arr1.forEach((item, index) => {
      item.includes("name") ? name.push(arr2[index]) : temp.push(arr2[index]);
    });
    temp.forEach((item) => {
      const a = item.split(";");
      a.map((item: any) => newArray.push({ value: item }));
      values.push(newArray);
      newArray = [];
    });
    // name.forEach((item, index) => {
    //   if (item) {
    //     let obj = { name: item, values: values[index] };
    //     specs_model.push(obj);
    //   }
    // });
    // let objSupplier = { name: "Supplier", values: supplier };
    // specs_model.push(objSupplier);
    // data.specsModel = specs_model;

    const payload = {
      name: nameCategory,
      specsModel: [],
      image_base64: imagesBase64,
      icon_base64: iconBase64,
      slug: slug,
    };

    const result = await categoryApi.createCategory(payload);
    if (result.statusCode === 200) {
      notifySuccess("Success");
      setReload((ref: number) => ref + 1);
      reset();
      setOpenModalCreateCategory(false);
    } else notifyError("Fail");
  };

  useEffect(() => {
    (async () => {
      const supplierList = await supplierApi.getListSupplier();
      const dataSupplier = supplierList.data.map((item: any) => ({
        value: item.name,
      }));
      setSupplier(dataSupplier);
      console.log(dataSupplier);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalCreateCategory(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[500px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Import Category
            </div>
            <form onSubmit={handleSubmit(submit)}>
              <div>
                <div className="name flex items-center justify-center gap-[10px] mb-[20px]">
                  <div>
                    <div className="text-center">Image: </div>
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
                      <Button>Upload Img</Button>
                    </Upload.Dragger>
                  </div>
                  <div>
                    <div className="text-center">Icon: </div>
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
                          setIconBase64(base64[1]);
                        });
                        return false;
                      }}
                    >
                      <Button>Upload Icon</Button>
                    </Upload.Dragger>
                  </div>
                </div>
              </div>
              <div className="name flex justify-center items-center gap-2 mb-[20px]">
                <input
                  {...register("name")}
                  required
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Name Category"
                />
                <input
                  {...register("slug")}
                  required
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Slug"
                />
              </div>
              <ExtendableInputs register={register} />
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

const ExtendableInputs = ({ register }: { register: any }) => {
  const [inputCount, setInputCount] = useState(1);

  const handleAddInput = () => setInputCount(inputCount + 1);
  const handleSubInput = () => setInputCount(inputCount - 1);

  return <></>;
};
