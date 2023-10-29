import React, { useEffect, useState } from "react";
import productApi from "../../../apis/product/product";
import { moneyFormater } from "../../../utils/moneyFormater";
import { formatDate, formatDate2 } from "../../../utils/dateFormater";

export default function ModalRevenue({
  setOpenModalRevenue,
  product,
  setReload,
  money,
}: any) {
  const [historyList, setHistoryList] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      console.log(product);
      console.log(money);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalRevenue(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[1200px] p-4 mx-auto bg-white rounded-md shadow-lg h-[700px]">
            <div className="text-center mb-4 uppercase text-lg">
              History change product price
            </div>
            <div className="text-center mb-4 uppercase text-lg">
              {product.name}
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
                    <div className="flex items-center justify-center">Code</div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      ProfitOrLoss
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
                  {/* <td className="p-2 border-r">{item?.admin?.name}</td> */}
                  <td className="p-2 border-r">{product.name}</td>
                  <td className="p-2 border-r">{product?.code}</td>
                  <td className="p-2 border-r">
                    {moneyFormater(money - product?.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
