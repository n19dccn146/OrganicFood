import { PlusSquareOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { IResUserList } from "../../apis/user/user.type";
import userApi from "../../apis/user/userApi";
import ModalDiscountUser from "../../components/Modal/User/modalCreateDiscountCategory";
import ModalSendMail from "../../components/Modal/User/modalSendmail";
import ModelEditEmployee from "../../components/Modal/ModalEmployyeeAccount/modalEditEmployee";
import Pagination from "../../components/Pangination/Pagination";
import { USER_MODEL } from "../../models/user.model";
import { notifyError, notifySuccess } from "../../utils/notify";
import ModalRegiserEmployee from "../../components/Modal/ModalEmployyeeAccount/modalRegiserEmployee";

type Props = {};
function Userlist(props: Props) {
  let newUserList = [];
  const LIMIT = 5;
  const total = 20;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [userList, setUserList] = useState([]);
  const [showModalEditEmployee, setShowModalEditEmployee] = useState(false);
  const [showModalSendMail, setShowModalSendMail] = useState(false);
  const [showModalRegisterEmployee, setShowModalRegisterEmployee] =
    useState(false);
  const [idUser, setIdUser] = useState("");
  const [idUserSelect, setIdUserSelect] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [order, setOrder] = useState("ACS");
  const [reload, setReload] = useState(0);
  const [selectedId, setSelectedId] = useState<Array<any>>([]);
  const [selectAll, setSelectAll] = useState(false);

  const sorting = (col: string) => {
    if (order === "ACS") {
      const sorted = [...userList].sort((a: any, b: any) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUserList(sorted);
      setOrder("DCS");
    }
    if (order === "DCS") {
      const sorted = [...userList].sort((a: any, b: any) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUserList(sorted);
      setOrder("ACS");
    }
  };
  // console.log(searchItem)

  const handleGetIDUser = (idUser: any) => {
    console.log(idUser);
    setIdUser(idUser);
    setShowModalEditEmployee(true);
  };

  const handleEnableUser = async (_id: any, enable: boolean) => {
    const payload = {
      _id: _id,
      enable: !enable,
    };

    const result = await userApi.enableUser(payload);
    // console.log(payload);
    // console.log(result);
    if (result.msg == "Thành công ") {
      notifySuccess("Success");
      setReload(reload + 1);
    } else notifyError("Fail");
  };

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
      setSelectedId(userList.map((item: any) => item.email));
    } else {
      setSelectAll(false);
      setSelectedId([]);
    }
  };

  // console.log(selectedId);

  useEffect(() => {
    (async () => {
      const result = await userApi.getUserList();
      // console.log(result);
      setUserList(result.data);
    })();
  }, [reload]);

  return (
    <>
      <div className="table w-full p-2 max-h-screen relative">
        <div>
          {" "}
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
                placeholder="Name, role"
                required
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>
            <div
              className="flex p-2 items-center gap-2 bg-green-600 ml-2 rounded-lg text-white w-[70px] cursor-pointer"
              onClick={() => {
                setShowModalRegisterEmployee(true);
              }}
            >
              <span className="block select-none">ADD</span>
              <PlusSquareOutlined />
            </div>
          </form>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500 flex items-center gap-4">
                  {/* <div className="flex items-center justify-center"></div> */}
                  <input
                    checked={selectedId.length === userList.length}
                    className="w-[20px] h-[20px]"
                    type="checkBox"
                    name=""
                    id="selectAll"
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="selectAll">Select All</label>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div
                    className="flex items-center justify-center"
                    onClick={() => sorting("name")}
                  >
                    Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>

                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">Role</div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">
                    Email Verify
                  </div>
                </th>
                <th
                  className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500"
                  onClick={() => sorting("email")}
                >
                  <div className="flex items-center justify-center">
                    Email
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">Phone</div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">Access</div>
                </th>
                <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                  <div className="flex items-center justify-center">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList
                  .filter((value: any, index: number) => {
                    if (searchItem == "") {
                      return (
                        value.role === "Sale" ||
                        value.role === "Warehouse" ||
                        value.role === "Admin"
                      );
                    } else if (
                      value?.name
                        .toLowerCase()
                        .includes(searchItem.toLowerCase()) ||
                      value?.role
                        .toLowerCase()
                        .includes(searchItem.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((item: any, index: number) => (
                    <tr
                      className="bg-gray-100 text-center border-b text-sm text-gray-600"
                      key={index}
                    >
                      <td className="p-2 border-r">
                        <input
                          checked={selectedId.includes(item?.email)}
                          className="w-[20px] h-[20px]"
                          type="checkBox"
                          name=""
                          id="select"
                          onClick={(e: any) => {
                            handleCheck(e, item?.email);
                          }}
                          onChange={() => {}}
                        />
                      </td>
                      <td className="p-2 border-r">{item?.name}</td>
                      <td className="p-2 border-r">{item?.role}</td>
                      <td className="p-2 border-r">
                        {item?.isEmailVerified.toString()}
                      </td>
                      <td className="p-2 border-r">{item?.email}</td>
                      <td className="p-2 border-r">{item?.phone}</td>
                      <td className="p-2 border-r">
                        {item?.enable.toString()}
                      </td>
                      {/* <td className="p-2 border-r">{item?.warning}</td> */}
                      <td className="flex gap-4 justify-center">
                        <a
                          onClick={() => {
                            handleGetIDUser(item?._id);
                          }}
                          className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                        >
                          Edit
                        </a>
                        <a
                          onClick={() => {
                            handleEnableUser(item?._id, item?.enable);
                          }}
                          className={
                            item?.enable === false
                              ? "bg-green-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                              : "bg-red-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                          }
                        >
                          {item?.enable === false ? "Enable" : "Disable"}
                        </a>
                        <a
                          onClick={() => {
                            handleGetIDUser(item?._id);
                          }}
                          className="bg-orange-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                        >
                          Delete
                        </a>
                        {/* <a
                          onClick={() => {
                            setShowModalSendMail(true);
                          }}
                          className="absolute top-3 rounded-md right-[400px] bg-pink-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                        >
                          Send Mail1
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
        </div>
      </div>
      {showModalEditEmployee && (
        <ModelEditEmployee
          setOpenModalEditEmployee={setShowModalEditEmployee}
          _idUser={idUser}
          reload={setReload}
        />
      )}
      {showModalSendMail && (
        <ModalSendMail
          setOpenModalSendMail={setShowModalSendMail}
          listUser={selectedId}
        />
      )}
      {showModalRegisterEmployee && (
        <ModalRegiserEmployee
          setShowModalRegisterEmployee={setShowModalRegisterEmployee}
          reload={setReload}
        />
      )}
    </>
  );
}

export default Userlist;
