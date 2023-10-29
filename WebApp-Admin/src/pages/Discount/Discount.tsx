import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import discountApi from "../../apis/discount/discount.api";
import { IResUserList } from "../../apis/user/user.type";
import ModalCreateCategory from "../../components/Modal/ModalCategory/modalCreateCategory";
import ModalAddDiscount from "../../components/Modal/Modaldiscout/modalAddDiscount";
import Pagination from "../../components/Pangination/Pagination";
import { USER_MODEL } from "../../models/user.model";
import { formatDate } from "../../utils/dateFormater";
import { moneyFormater } from "../../utils/moneyFormater";
import { notifyError, notifySuccess } from "../../utils/notify";
import ModalDelete from "../../components/Modal/Modaldiscout/modalDelete";
import ModalEditDiscount from "../../components/Modal/Modaldiscout/modalEditDiscount";
import ModalHistoryAdded from "../../components/Modal/Modaldiscout/ModalHistoryAdded";

type Props = {};

function DiscountList(props: Props) {
  let newUserList = [];
  const LIMIT = 5;
  const total = 20;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchItem, setSearchItem] = useState("");
  const [idDiscount, setIdDiscount] = useState("");

  const [order, setOrder] = useState("ACS");
  const [showModalDiscount, setShowModalDiscount] = useState(false);
  const [showModalDeleteDiscount, setShowModalDeleteDiscount] = useState(false);
  const [showModalAddedDiscount, setShowModalAddedDiscount] = useState(false);
  const [showModalEditDiscount, setShowModalEditDiscount] = useState(false);

  const [reload, setReload] = useState(0);

  const [discountList, setDiscountList] = useState([]);
  const [discount, setDiscount] = useState({ code: "", id: "" });

  const handleAdded = (Id: any, code: any) => {
    // newUserList = discountList.filter((item: any) => item.id !== removeId);
    // setDiscountList(newUserList);
    console.log(Id);
    setIdDiscount(Id);
    const payload = {
      code: code,
      id: Id,
    };
    setDiscount(payload);
    setShowModalAddedDiscount(true);
  };
  const handleRemove = (removeId: any, code: any) => {
    // newUserList = discountList.filter((item: any) => item.id !== removeId);
    // setDiscountList(newUserList);
    console.log(removeId);
    setIdDiscount(removeId);
    const payload = {
      code: code,
      id: removeId,
    };
    setDiscount(payload);
    setShowModalDeleteDiscount(true);
  };
  const sorting = (col: string) => {
    if (order === "ACS") {
      const sorted = [...discountList].sort((a: any, b: any) =>
        a[col] > b[col] ? 1 : -1
      );
      setDiscountList(sorted);
      setOrder("DCS");
    }
    if (order === "DCS") {
      const sorted = [...discountList].sort((a: any, b: any) =>
        a[col] < b[col] ? 1 : -1
      );
      setDiscountList(sorted);
      setOrder("ACS");
    }
  };

  const handleEditDiscount = async (status: boolean, code: any, id: any) => {
    const payload = {
      _id: id,
      code: code,
      enable: !status,
    };

    const resultEnable = await discountApi.eidtDiscount(payload);
    console.log(resultEnable);
    if ((resultEnable.msg = "Thành công ")) {
      notifySuccess("Success");
      setReload(reload + 1);
    } else notifyError("Fail");
  };

  console.log(searchItem);
  useEffect(() => {
    (async () => {
      const result = await discountApi.getListDiscount();
      console.log("list", result);
      setDiscountList(result.data);
    })();
  }, [reload]);

  const handleEdit = async (idDiscount: any) => {
    console.log(idDiscount);
    setIdDiscount(idDiscount), setShowModalEditDiscount(true);
  };

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
            placeholder="Code"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
        <div
          className="flex p-2 items-center gap-2 bg-green-600 ml-2 rounded-lg text-white w-[70px] cursor-pointer"
          onClick={() => {
            setShowModalDiscount(true);
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
              <div className="flex items-center justify-center">Code</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Date Start</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Date End</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Status</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Customer</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500 ">
              <div className="flex items-center justify-center">One in day</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Is Percent</div>
            </th>
            {/* <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center hidden">
                is Ship
              </div>
            </th> */}
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Max Discount
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Min Discount
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Quantity</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">
                Discount Value
              </div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {discountList?.length > 0 ? (
            discountList
              .filter((value: any, index: number) => {
                if (searchItem == "") {
                  return value;
                } else if (
                  value?.code.toLowerCase().includes(searchItem.toLowerCase())
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
                  <td className="p-2 border-r">{item?.code}</td>
                  <td className="p-2 border-r">
                    {formatDate(item?.dateStart)}
                  </td>
                  <td className="p-2 border-r">{formatDate(item?.dateEnd)}</td>
                  <td className="p-2 border-r">{item?.enable.toString()}</td>
                  <td className="p-2 border-r">{item?.is_oic.toString()}</td>
                  <td className="p-2 border-r">{item?.is_oid.toString()}</td>
                  <td className="p-2 border-r">
                    {item?.is_percent.toString()}
                  </td>
                  <td className="p-2 border-r hidden">
                    {item?.is_ship.toString()}
                  </td>
                  <td className="p-2 border-r">
                    {moneyFormater(item?.maxPrice)}
                  </td>
                  <td className="p-2 border-r">
                    {moneyFormater(item?.minPrice)}
                  </td>
                  <td className="p-2 border-r">{item?.quantity}</td>
                  <td className="p-2 border-r">
                    {item?.value < 100
                      ? item?.value + "%"
                      : moneyFormater(item?.value)}
                  </td>
                  <td className="flex justify-center items-center m-[10px] gap-[8px]">
                    <a
                      className={
                        item?.enable === false
                          ? "bg-green-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                          : "bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                      }
                      onClick={() => {
                        handleEditDiscount(item?.enable, item?.code, item?._id);
                      }}
                    >
                      {item?.enable === false ? "Enable" : "Disable"}
                    </a>
                    <a className="bg-orange-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer">
                      <span onClick={() => handleRemove(item?._id, item?.code)}>
                        Remove
                      </span>
                    </a>
                    <a className="bg-yellow-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer">
                      <span onClick={() => handleAdded(item?._id, item?.code)}>
                        Added
                      </span>
                    </a>
                    <a className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer">
                      <span onClick={() => handleEdit(item?._id)}>Edit</span>
                    </a>
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
      {showModalDiscount && (
        <ModalAddDiscount
          setShowModalDiscount={setShowModalDiscount}
          reload={setReload}
        />
      )}

      {showModalDeleteDiscount && (
        <ModalDelete
          setOpenModalDeleteDiscount={setShowModalDeleteDiscount}
          discount={discount}
          reload={setReload}
        />
      )}

      {showModalEditDiscount && (
        <ModalEditDiscount
          setOpenModalEditEmployee={setShowModalEditDiscount}
          _idDiscountr={idDiscount}
          reload={setReload}
        />
      )}

      {showModalAddedDiscount && (
        <ModalHistoryAdded
          setOpenModalAddedDiscount={setShowModalAddedDiscount}
          _idDiscountr={idDiscount}
          reload={setReload}
        />
      )}
    </div>
  );
}

export default DiscountList;
