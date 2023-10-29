import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { IResUserList } from "../../apis/user/user.type";
import supplierApi from "../../apis/supplier/supplierApi";
import ModalDiscountUser from "../../components/Modal/User/modalCreateDiscountCategory";
import ModalSendMail from "../../components/Modal/User/modalSendmail";
import ModelEditEmployee from "../../components/Modal/ModalEmployyeeAccount/modalEditEmployee";
import Pagination from "../../components/Pangination/Pagination";
import { USER_MODEL } from "../../models/user.model";
import { notifyError, notifySuccess } from "../../utils/notify";
import ModalRegiserEmployee from "../../components/Modal/ModalEmployyeeAccount/modalRegiserEmployee";
import ModalCreate from "../../components/Modal/ModalSupplier/modalCreate";
import ModalEdit from "../../components/Modal/ModalSupplier/modalEdit";
import ModalDelete from "../../components/Modal/ModalSupplier/modalDelete";
import { formatDate2 } from "../../utils/dateFormater";

type Props = {};
function Userlist(props: Props) {
  let newUserList = [];
  const LIMIT = 5;
  const total = 20;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [supplierList, setSupplierList] = useState([]);
  const [showModalEditSupplier, setShowModalEditSupplier] = useState(false);
  const [showModalDeleteSupplier, setShowModalDeleteSupplier] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModalRegisterEmployee, setShowModalRegisterEmployee] =
    useState(false);
  const [idSupplier, setIdSupplier] = useState("");
  const [idUserSelect, setIdUserSelect] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [order, setOrder] = useState("ACS");
  const [reload, setReload] = useState(0);
  const [selectedId, setSelectedId] = useState<Array<any>>([]);
  const [selectAll, setSelectAll] = useState(false);

  const sorting = (col: string) => {
    if (order === "ACS") {
      const sorted = [...supplierList].sort((a: any, b: any) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setSupplierList(sorted);
      setOrder("DCS");
    }
    if (order === "DCS") {
      const sorted = [...supplierList].sort((a: any, b: any) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setSupplierList(sorted);
      setOrder("ACS");
    }
  };
  // console.log(searchItem)

  const handleGetIDSupplier = (idSupplier: any) => {
    console.log(idSupplier);
    setIdSupplier(idSupplier);
    setShowModalEditSupplier(true);
  };

  const handleDelete = (idSupplier: any) => {
    console.log(idSupplier);
    setIdSupplier(idSupplier);
    setShowModalDeleteSupplier(true);
  };

  // const handleEnableUser = async (_id: any, enable: boolean) => {
  //   const payload = {
  //     _id: _id,
  //     enable: !enable,
  //   };

  //   const result = await supplierList.enableUser(payload);
  //   // console.log(payload);
  //   // console.log(result);
  //   if (result.msg == "Thành công ") {
  //     notifySuccess("Success");
  //     setReload(reload + 1);
  //   } else notifyError("Fail");
  // };

  const handleCheck = (e: any, email: any) => {
    const { checked } = e.target;
    // console.log(checked, email);
    if (checked) {
      setSelectedId([...selectedId, email]);
    } else {
      setSelectedId(selectedId.filter((item: any) => item !== email));
    }
  };

  const handleSelectAll = (e: any) => {
    const { checked } = e.target;
    if (checked) {
      setSelectAll(true);
      setSelectedId(supplierList.map((item: any) => item.email));
    } else {
      setSelectAll(false);
      setSelectedId([]);
    }
  };

  // console.log(selectedId);

  useEffect(() => {
    (async () => {
      const result = await supplierApi.getListSupplier();
      // console.log(result);
      setSupplierList(result.data);
    })();
  }, [reload]);

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
            setShowModal(true);
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
              <div className="flex items-center justify-center">Number</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Address</div>
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
          {supplierList?.length > 0 ? (
            supplierList
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
                  <td className="p-2 border-r">{item?.phone}</td>
                  <td className="p-2 border-r">{`${item?.address?.address}, ${item?.address?.district}, ${item?.address?.province}`}</td>
                  <td className="p-2 border-r">
                    {" "}
                    {formatDate2(item?.createdAt)}
                  </td>
                  <td className="p-2 border-r">
                    {formatDate2(item?.updatedAt)}
                  </td>

                  <td className="flex gap-4 justify-center">
                    <a
                      onClick={() => {
                        handleGetIDSupplier(item?._id);
                      }}
                      className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                    >
                      Edit
                    </a>
                    <a
                      onClick={() => {
                        handleDelete(item?._id);
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

      {showModal && (
        <ModalCreate setOpenModal={setShowModal} setReload={setReload} />
      )}
      {showModalEditSupplier && (
        <ModalEdit
          setOpenModalEditSupplier={setShowModalEditSupplier}
          _id={idSupplier}
          reload={setReload}
        />
      )}

      {showModalDeleteSupplier && (
        <ModalDelete
          setOpenModalDeleteSupplier={setShowModalDeleteSupplier}
          _id={idSupplier}
          reload={setReload}
        />
      )}
      {/* {showModalCreateCategory && (
        <ModalCreateCategory
          setOpenModalCreateCategory={setShowModalCreateCategory}
          setReload={setReload}
        />
      )}


      {showModalDiscountCategory && (
        <ModalDiscountCategory
          setOpenModalDiscountCategory={setShowModalDiscountCategory}
          _idCategory={idCategorySelect}
        /> */}
      {/* )} */}
      {/* <Pagination
        limit={LIMIT}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      /> */}
    </div>
  );
}

export default Userlist;
