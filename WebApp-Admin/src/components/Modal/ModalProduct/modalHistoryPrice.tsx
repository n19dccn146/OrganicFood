import React, { useEffect, useState } from "react";
import productApi from "../../../apis/product/product";
import { moneyFormater } from "../../../utils/moneyFormater";
import { formatDate, formatDate2 } from "../../../utils/dateFormater";

export default function ModalHistoryPrice({
  setOpenModalHistoryPrice,
  code,
  nameProduct,
  setReload,
}: any) {
  console.log(code);
  const [historyList, setHistoryList] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const payload = {
        code: code,
      };
      console.log(payload);
      const result = await productApi.getListHistoryPriceById(payload);
      setHistoryList(result.data);
      // console.log(result);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalHistoryPrice(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[1200px] p-4 mx-auto bg-white rounded-md shadow-lg h-[700px]">
            <div className="text-center mb-4 uppercase text-lg">
              History change product price
            </div>
            <div className="text-center mb-4 uppercase text-lg">
              {nameProduct}
            </div>
            <table className="border w-full whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 border-b">
                  {/* <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">ID</div>
                  </th> */}
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">Name</div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">Role</div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      Update At
                    </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500 hidden">
                    <div className="flex items-center justify-center">
                      Old Price
                    </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      New Price
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {historyList?.length > 0 ? (
                  historyList
                    .reverse()
                    .map((item: any, index: number) => (
                      <ImportRow item={item} />
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
      </div>
    </>
  );
}

const ImportRow = (props: any) => {
  const { item } = props;
  console.log(item);
  return (
    <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
      {/* <td className="p-2 border-r">{item?.admin?.name}</td> */}
      <td className="p-2 border-r">{item?.admin?.name}</td>
      <td className="p-2 border-r">{item?.admin?.role}</td>
      <td className="p-2 border-r">{formatDate2(item?.createdAt)}</td>
      <td className="p-2 border-r hidden ">{item?.old_price}</td>
      <td className="p-2 border-r ">{item?.new_price}</td>
    </tr>
  );
};
