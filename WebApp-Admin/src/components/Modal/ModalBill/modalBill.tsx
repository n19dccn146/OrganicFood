import { useEffect, useState } from "react";
import billApi from "../../../apis/bill/bill.api";

export default function ModalBill({ setShowModalBill, _id }: any) {
  const [bill, setBill] = useState<any>({});
  useEffect(() => {
    (async () => {
      const result = await billApi.getDetailBill({ _id: _id });
      setBill(result.data);
    })();
  }, []);
  console.log(bill);
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => setShowModalBill(false)}
        ></div>
        <div className="flex items-center justify-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-[700px] p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="text-center mb-4 uppercase text-lg">Order List</div>
            <div className="container h-[450px] overflow-auto">
              {bill?.products?.map((item: any, index: number) => (
                <div
                  key={index}
                  className="item rounded-lg border border-black-200 flex gap-[20px] p-4 mb-2 "
                >
                  <div className="flex-1 h-[200px]">
                    <img
                      src={item.product.colors.filter((i: any) => item.color == i.color)[0].image_url}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="block mb-2 text-2xl">
                      {item.product.name}
                    </span>
                    <span className="block mb-2 text-gray-400">
                    Color: {item.color}
                    </span>
                    <span className="block mb-2 text-gray-400">
                      Quantity: {item.quantity}
                    </span>
                    <span className="block mb-2 text-gray-400">
                      Price: {item.price}
                    </span>
                    <span className="block mb-2 text-gray-400">
                      Discount: {item.sale}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
