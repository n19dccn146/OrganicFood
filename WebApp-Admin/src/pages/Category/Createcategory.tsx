import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import categoryApi from "../../apis/category/categoryApi";
import { IResUserList } from "../../apis/user/user.type";
import ModalCreateCategory from "../../components/Modal/ModalCategory/modalCreateCategory";
import ModalDiscountCategory from "../../components/Modal/ModalCategory/modalCreateDiscountCategory";
import ModalUpdateCategory from "../../components/Modal/ModalCategory/modalUpdateCategory";
import Pagination from "../../components/Pangination/Pagination";
import { USER_MODEL } from "../../models/user.model";
import { notifyError, notifySuccess } from "../../utils/notify";
import ModalDelete from "../../components/Modal/ModalCategory/modalDelete";
import { formatDate2 } from "../../utils/dateFormater";

type Props = {};

function Category(props: Props) {
  let newUserList = [];
  const LIMIT = 5;
  const total = 20;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
  const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
  const [showModalDiscountCategory, setShowModalDiscountCategory] =
    useState(false);
  const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [idCategorySelect, setIdCategorySelect] = useState("");
  const [order, setOrder] = useState("ACS");
  const [reLoad, setReload] = useState(0);

  const handleRemove = (removeId: number) => {
    newUserList = categoryList.filter(
      (item: any, index: number) => item._id !== removeId
    );
    setCategoryList(newUserList);
    notifySuccess("Success");
  };

  const handleGetIDProduct = (_id: any, idCategory: any) => {
    setIdCategory(_id);
    setIdCategorySelect(idCategory);
    setShowModalUpdateCategory(true);
  };

  const handleGetIDCategory = async (idCategory: any) => {
    setIdCategorySelect(idCategory);
    const result = await categoryApi.getSelectCategory(idCategory);
    console.log(result.data);
    setCategory(result.data);
    setShowModalDeleteCategory(true);
  };

  const sorting = (col: string) => {
    if (order === "ACS") {
      const sorted = [...categoryList].sort((a: any, b: any) =>
        a[col] > b[col] ? 1 : -1
      );
      setCategoryList(sorted);
      setOrder("DCS");
    }
    if (order === "DCS") {
      const sorted = [...categoryList].sort((a: any, b: any) =>
        a[col] < b[col] ? 1 : -1
      );
      setCategoryList(sorted);
      setOrder("ACS");
    }
  };
  // Khi trang được hiển thị useEffect hook được gọi. Trong useEffect, một cuộc gọi API (categoryApi.getCategory()) được thực hiện để lấy danh sách danh mục sản phẩm.
  //Kết quả được lưu vào biến 'categoryList thông quan hàm setCategoryList(result.data)
  useEffect(() => {
    (async () => {
      const result = await categoryApi.getCategory();
      console.log(result);

      setCategoryList(result.data);
    })();
  }, [reLoad]);

  return (
    <div className="table w-full p-2 max-h-screen">
      <form className="flex items-center mb-[20px] w-[20%] mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
        <div
          className="flex p-2 items-center gap-2 bg-green-600 ml-2 rounded-lg text-white w-[70px] cursor-pointer"
          onClick={() => {
            setShowModalCreateCategory(true);
          }}
        >
          <span className="block select-none">ADD</span>
          <PlusSquareOutlined />
        </div>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">ID</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Name</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Created time
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Last update time
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {categoryList?.length > 0 ? (
            categoryList
              .filter((value: any, index: number) => {
                if (searchItem == "") {
                  return value;
                } else if (
                  value?.name.toLowerCase().includes(searchItem.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((item: any, index: number) => (
                <tr
                  className="bg-gray-100 text-center border-b text-sm text-gray-600"
                  key={index}
                >
                  <td className="p-2 border-r">{index + 1}</td>
                  <td className="p-2 border-r">{item?.name}</td>
                  <td className="p-2 border-r">
                    {formatDate2(item?.createdAt)}
                  </td>
                  <td className="p-2 border-r">
                    {formatDate2(item?.updatedAt)}
                  </td>
                  <td className="flex gap-4 justify-center">
                    <a
                      onClick={() => {
                        handleGetIDProduct(item?.name, item?._id);
                      }}
                      className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                    >
                      Edit
                    </a>
                    <a
                      onClick={() => {
                        handleGetIDCategory(item?._id);
                      }}
                      className="bg-orange-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                    >
                      Delete
                    </a>
                    {/* <a className="bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer">
                      <span onClick={() => handleRemove(item?._id)}>Remove</span>
                    </a> */}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td>-</td>
            </tr>
          )}
        </tbody>
      </table>
      {showModalCreateCategory && (
        <ModalCreateCategory
          setOpenModalCreateCategory={setShowModalCreateCategory}
          setReload={setReload}
        />
      )}
      {showModalUpdateCategory && (
        <ModalUpdateCategory
          setOpenModalUpdateCategory={setShowModalUpdateCategory}
          _id={idCategory}
          idCategory={idCategorySelect}
          setReload={setReload}
        />
      )}

      {showModalDiscountCategory && (
        <ModalDiscountCategory
          setOpenModalDiscountCategory={setShowModalDiscountCategory}
          _idCategory={idCategorySelect}
        />
      )}

      {showModalDeleteCategory && (
        <ModalDelete
          setOpenModalDeleteCategory={setShowModalDeleteCategory}
          category={category}
          reload={setReload}
        />
      )}
      {/* <Pagination
        limit={LIMIT}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      /> */}
    </div>
  );
}

export default Category;
