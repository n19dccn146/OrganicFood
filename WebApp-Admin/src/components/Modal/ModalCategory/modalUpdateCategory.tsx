import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import categoryApi from "../../../apis/category/categoryApi";
import { notifyError, notifySuccess } from "../../../utils/notify";
import Specs from "./specs";

export default function ModalUpdateCategory({
  setOpenModalUpdateCategory,
  _id,
  idCategory,
  setReload,
}: any) {
  type FormValues = {
    name: string;
    slug: string;
  };

  console.log(_id, idCategory);

  const [category, setCategory] = useState<any>({});
  const [selectValue, setSelectValue] = useState([]);
  const [specs, setSpecs] = useState<Array<any>>([]);

  const [imagesBase64, setImagesBase64] = useState<any>("");
  const [iconBase64, setIconBase64] = useState<any>("");

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
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormValues>({});

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
      a.map((item: any) => newArray.push(item));
      values.push(newArray.join(";"));
      newArray = [];
    });
    name.forEach((item, index) => {
      if (item) {
        let obj = { name: item, values: values[index] };
        specs_model.push(obj);
      }
    });

    data.specsModel = specs_model;

    const payload = {
      _id: idCategory,
      name: nameCategory,
      specsModel: data.specsModel,
      image_base64: imagesBase64,
      icon_base64: iconBase64,
      slug: slug,
    };

    const result = await categoryApi.editCategory(payload);
    console.log("payload", payload);
    console.log(result);
    if (result.msg === "Thành công ") {
      notifySuccess("Success");
      setReload((ref: number) => ref + 1);
      setOpenModalUpdateCategory(false);
      reset();
    } else notifyError("Fail");
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
      const result = await categoryApi.getSelectCategory(_id);
      //   console.log('123',result);
      setCategory(result.data);
      console.log(result.data);
      toDataUrl(result.data.image_url, function (res: any) {
        const base64 = res.split(",");
        setImagesBase64(base64[1]);
      });
      toDataUrl(result.data.icon_url, function (res: any) {
        const base64 = res.split(",");
        setIconBase64(base64[1]);
      });
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalUpdateCategory(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[500px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">
              Edit Category
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
                    <img
                      src={category.image_url}
                      alt=""
                      className="w-[105px] h-[100px] object-contain"
                    />
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
                    <img
                      src={category.icon_url}
                      alt=""
                      className="w-[105px] h-[100px] object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="name flex justify-center items-center gap-2 mb-[20px]">
                <input
                  {...register("name")}
                  required
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue={category?.name}
                  id="username"
                  type="text"
                  placeholder="Name Category"
                />
                <input
                  {...register("slug")}
                  required
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  defaultValue={category?.slug}
                  type="text"
                  placeholder="Slug"
                />
              </div>
              <ListCategory
                register={register}
                list={category?.specsModel}
                setValue={setValue}
              />
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
const ListCategory = ({
  register,
  list,
  setValue,
}: {
  register: any;
  list: any;
  setValue: any;
}) => {
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (list) {
      list.map((item: any, index: number) => {
        const specs: any = [];
        item.values.map((i: any) => {
          specs.push(i.value);
        });

        setValue(`values_${index}`, specs.join(";"));
        item.specs = specs.join(";");
        console.log(item.specs);
      });
    }
  }, [list]);
  //   console.log("list", list);
  return (
    <div className="flex flex-col items-center">
      {/* <label>Specs</label> */}
      {showForm && (
        <div>
          {list &&
            list.map((item: any, index: any) => (
              <div key={index} className="formInput">
                <div className="specs-input flex items-center justify-center hidden ">
                  <input
                    {...register(`name_${index}`)}
                    style={{ width: "190px" }}
                    type="text"
                    defaultValue={item.name}
                    placeholder="Name Spec"
                  />
                  <textarea
                    className="h-10 pt-2 resize-none"
                    style={{ width: "230px" }}
                    {...register(`values_${index}`)}
                    defaultValue={item.specs}
                    placeholder="Value"
                  />
                </div>
              </div>
            ))}
        </div>
      )}

      <ExtendableInputs register={register} initialLength={list?.length || 0} />
    </div>
  );
};

const ExtendableInputs = ({
  register,
  initialLength,
}: {
  register: any;
  initialLength: number;
}) => {
  const [inputCount, setInputCount] = useState(0);

  // React.useEffect(() => {
  //   if (initialLength > 0) setInputCount(initialLength);
  // }, [initialLength]);

  const handleAddInput = () => setInputCount(inputCount + 1);
  const handleSubInput = () => setInputCount(inputCount - 1);
  // const handleAddInput = () => setInputCount(inputCount + 1);

  return (
    <div className="flex items-center gap-4 flex-col mb-4">
      <div className="mt-4">
        {[...Array(inputCount)].map((_, index) => (
          <Specs register={register} id={index + initialLength} key={index} />
        ))}
      </div>

      {/* <Specs /> */}
    </div>
  );
};
