import React, { useEffect, useState } from "react";
import billApi from "../../apis/bill/bill.api";
import ModalBill from "../../components/Modal/ModalBill/modalBill";
import ModalUpdateBill from "../../components/Modal/ModalBill/modalUpdateBill";
import Pagination from "../../components/Pangination/Pagination";
import { moneyFormater } from "../../utils/moneyFormater";
import { formatDate } from "../../utils/dateFormater";
import dayjs from "dayjs";
import { notifyError, notifySuccess } from "../../utils/notify";

type Props = {};

function BillList(props: Props) {
  let newBillList = [];
  const LIMIT = 15;
  // const total = 20;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [total, setTotal] = useState(0);
  const [idBill, setIdBill] = useState("");
  const [showModalBill, setShowModalBill] = useState(false);
  const [showModalUpdateBill, setShowModalUpdateBill] = useState(false);
  const [statusBill, setStatusbill] = useState("");
  const [billList, setBillList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [order, setOrder] = useState("ACS");
  const [reload, setReload] = useState(0);

  const sorting = (col: string) => {
    if (order === "ACS") {
      const sorted = [...billList].sort((a: any, b: any) =>
        a[col] > b[col] ? 1 : -1
      );
      setBillList(sorted);
      setOrder("DCS");
    }
    if (order === "DCS") {
      const sorted = [...billList].sort((a: any, b: any) =>
        a[col] < b[col] ? 1 : -1
      );
      setBillList(sorted);
      setOrder("ACS");
    }
  };

  const handleSelect = (e: any) => {
    // console.log(e.target.value);
    (async () => {
      const resultStatus = await billApi.getStatuslBill(
        `?status=${e.target.value}`
      );
      // console.log(resultStatus);
      setBillList(resultStatus.data.reverse());
      // if(resultStatus.statusCode === 200) {
      // }
    })();
  };

  const handleViewBill = (_id: any) => {
    setIdBill(_id);
  };

  const handleUpdateBill = (_id: any) => {
    setIdBill(_id);
  };
  const handleVerifyBill = async (_id: any, verify: boolean) => {
    const payload = {
      _id: _id,
    };
    if (!verify) {
      const result = await billApi.verifyBill(payload);
      // console.log(payload);
      // console.log(result);
      if (result.msg == "Thành công ") {
        notifySuccess("Success");
        setReload(reload + 1);
      } else notifyError("Fail");
    } else {
      return;
    }
  };

  const handleRefundyBill = async (_id: any, refund: boolean) => {
    const payload = {
      _id: _id,
    };
    if (!refund) {
      const result = await billApi.refundBill(payload);
      // console.log(payload);
      // console.log(result);
      if (result.msg == "Thành công ") {
        notifySuccess("Success");
        setReload(reload + 1);
      } else notifyError("Fail");
    } else {
      return;
    }
  };

  useEffect(() => {
    (async () => {
      const skip = currentPage * LIMIT;
      const result = await billApi.getListBill(skip, LIMIT);

      setBillList(result.data.reverse());
      console.log(result);
      setTotal(result.count);
    })();
  }, [currentPage, reload]);

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
            placeholder="Name, Phone"
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </div>
        <div className="ml-[20px] w-[250px]">
          <select
            onChange={handleSelect}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">All</option>
            <option value="Ordered">Ordered</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Delivering">Delivering</option>
            <option value="Done">Done</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </form>
      <table className="border whitespace-nowrap w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Created</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Name</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Phone</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Email</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Address</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Sale</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Fhip Fee</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Toltal</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Status</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Payed</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Refund</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Verify</div>
            </th>
            <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
              <div className="flex items-center justify-center">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {billList?.length > 0 ? (
            billList
              .reverse()
              .filter((value: any, index: number) => {
                if (searchItem == "") {
                  return value;
                } else if (
                  value?.account.name
                    .toString()
                    .trim()
                    .toLowerCase()
                    .includes(searchItem.toLowerCase()) ||
                  value?.account.phone.toString().includes(searchItem)
                ) {
                  return value;
                }
              })

              .map((item: any, index: number) => (
                <tr
                  className="bg-gray-100 text-center border-b text-sm text-gray-600"
                  key={index}
                >
                  <td className="p-2 border-r ">
                    {dayjs(item?.createdAt).format("DD-MM-YYYY hh:mm:ssA")}
                  </td>
                  <td className="p-2 border-r ">{item?.account?.name}</td>
                  <td className="p-2 border-r ">{item?.account?.phone}</td>
                  <td className="p-2 border-r ">{item?.account?.email}</td>
                  <td className="p-2 border-r ">{item?.address?.address}</td>
                  <td className="p-2 border-r ">
                    {moneyFormater(item?.discount)}
                  </td>
                  <td className="p-2 border-r ">{moneyFormater(item?.ship)}</td>
                  <td className="p-2 border-r ">
                    {moneyFormater(item?.total)}
                  </td>
                  <td className="p-2 border-r ">
                    {item?.status[0].statusTimeline}
                  </td>
                  <td
                    className={
                      item?.paid === true
                        ? "p-2 border-r bg-blue-500 text-white"
                        : "p-2 border-r bg-purple-500 text-white"
                    }
                  >
                    {item?.paid === true ? "VNPay" : "COD"}
                  </td>
                  <td className="p-2 border-r ">{item?.refund.toString()}</td>
                  <td className="p-2 border-r ">{item?.verify.toString()}</td>
                  <td className="flex justify-center items-center m-[10px] gap-[8px]">
                    <a
                      onClick={() => {
                        handleViewBill(item?._id);
                        setShowModalBill(true);
                      }}
                      className="bg-pink-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer "
                    >
                      View
                    </a>

                    <a
                      onClick={() => {
                        setShowModalUpdateBill(true);
                        handleUpdateBill(item?._id);
                        setStatusbill(item?.status[0].statusTimeline);
                      }}
                      className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                    >
                      Update
                    </a>
                    <a
                      onClick={() => {
                        handleVerifyBill(item?._id, item?.verify);
                      }}
                      className={
                        item?.verify === false
                          ? "bg-green-500 w-[60px] p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                          : "bg-gray-500 w-[60px] p-2 text-white text-xs font-thin select-none  hover:text-white"
                      }
                    >
                      {item?.verify === false ? "Verify" : "Verified"}
                    </a>
                    <a
                      onClick={() => {
                        handleRefundyBill(item?._id, item?.refund);
                      }}
                      className={
                        item?.refund === false
                          ? "bg-orange-500 w-[60px] p-2 text-white hover:shadow-lg text-xs font-thin cursor-pointer"
                          : "bg-gray-500 w-[60px] p-2 text-white text-xs font-thin select-none  hover:text-white"
                      }
                    >
                      {item?.refund === false ? "Refund" : "Refund"}
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

      {showModalBill && (
        <ModalBill setShowModalBill={setShowModalBill} _id={idBill} />
      )}
      {showModalUpdateBill && (
        <ModalUpdateBill
          setShowModalUpdateBill={setShowModalUpdateBill}
          _id={idBill}
          status={statusBill}
        />
      )}
      <Pagination
        limit={LIMIT}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </div>
  );
}

export default BillList;
