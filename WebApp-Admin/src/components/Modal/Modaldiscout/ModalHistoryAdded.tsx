import React, { useEffect, useState } from "react";
import productApi from "../../../apis/product/product";
import { moneyFormater } from "../../../utils/moneyFormater";
import { formatDate, formatDate2 } from "../../../utils/dateFormater";
import discountApi from "../../../apis/discount/discount.api";

export default function ModalHistoryAdded({
  setOpenModalAddedDiscount,
  _idDiscountr,
  nameProduct,
  setReload,
}: any) {
  const [discountList, setDiscountList] = useState<any>();
  const [productList, setProductList] = useState([""]);
  useEffect(() => {
    (async () => {
      const payload = {
        id: _idDiscountr,
      };
      console.log(payload);
      const result = await discountApi.getAdded(payload);
      setDiscountList(result.data);
      console.log(result.data);
    })();
  }, []);
  useEffect(() => {
    console.log(productList);
    console.log(discountList);
  });

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setOpenModalAddedDiscount(false)}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[1200px] p-4 mx-auto bg-white rounded-md shadow-lg h-[700px]">
            <div className="text-center mb-4 uppercase text-lg">
              The promotion has been added to the product or customer
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
                  <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500 ">
                    <div className="flex items-center justify-center">ID</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {discountList?.length > 0 ? (
                  discountList
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

  // Tạo mảng tạm chứa cả danh sách sản phẩm và danh sách tài khoản
  let combinedList: any[] = [];

  if (item && Array.isArray(item.products)) {
    // Nếu danh sách sản phẩm tồn tại, thêm nó vào mảng tạm
    combinedList = combinedList.concat(item.products);
  }

  if (item && Array.isArray(item.accounts)) {
    // Nếu danh sách tài khoản tồn tại, thêm nó vào mảng tạm
    combinedList = combinedList.concat(item.accounts);
  }

  // Lặp qua mảng tạm và hiển thị thông tin của từng mục
  return (
    <>
      {combinedList.map((item: any, index: number) => (
        <tr
          key={index}
          className="bg-gray-100 text-center border-b text-sm text-gray-600"
        >
          {/* Hiển thị thông tin chung, chẳng hạn như tên và ID */}
          <td className="p-2 border-r">{item?.name}</td>
          <td className="p-2 border-r">{item?._id}</td>

          {/* Hiển thị thông tin riêng biệt cho sản phẩm và tài khoản */}
          {/* {Array.isArray(item.products) ? (
            <>
              <td className="p-2 border-r">{item?.admin?.role}</td>
              <td className="p-2 border-r">{formatDate2(item?.createdAt)}</td>
              <td className="p-2 border-r ">{moneyFormater(item?.price)}</td>
              <td className="p-2 border-r">{item?.quantity}</td>
            </>
          ) : (
            <td className="p-2 border-r">{item?.role}</td>
          )} */}
        </tr>
      ))}
    </>
  );
};
