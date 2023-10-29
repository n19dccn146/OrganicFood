import React, { useEffect, useState } from "react";
import productApi from "../../../apis/product/product";
import { moneyFormater } from "../../../utils/moneyFormater";
import { formatDate, formatDate2 } from "../../../utils/dateFormater";

export default function ModalHistoryImport({
  setOpenModalHistoryImport,
  _id,
  nameProduct,
  setReload,
}: any) {
  const [importList, setImportList] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const payload = {
        id: _id,
      };
      const result = await productApi.getListImportById(payload);
      setImportList(result.data);
      console.log(result);
    })();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalHistoryImport(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[1200px] p-4 mx-auto bg-white rounded-md shadow-lg h-[700px]">
            <div className="text-center mb-4 uppercase text-lg">
              History import product
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
                  {/* <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      Updater
                    </div>
                  </th> */}
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">Name</div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500 hidden">
                    <div className="flex items-center justify-center">Role</div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">Role</div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      Import At
                    </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      EXP
                    </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      Price
                    </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      Quantity
                    </div>
                  </th>
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
                    <div className="flex items-center justify-center">
                      Sold
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {importList?.length > 0 ? (
                  importList
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
      <td className="p-2 border-r">{item?.products[0]?.exp ? formatDate2(item?.products[0]?.exp ) : ''}</td>
      {/* <td className="p-2 border-r">{item?.createdAt}</td> */}
      <td className="p-2 border-r ">
        {moneyFormater(item?.products[0]?.price)}
      </td>
      <td className="p-2 border-r">{item?.products[0]?.quantity}</td>
      <td className="p-2 border-r">{item?.products[0]?.sold ? item?.products[0]?.sold : 0 }</td>
    </tr>
  );
};
