import React from "react";
import supplierApi from "../../../apis/supplier/supplierApi";
import { notifyError, notifySuccess } from "../../../utils/notify";

export default function ModalDelete({
  setOpenModalDeleteSupplier,
  reload,
  _id,
}: any) {
  const handleDeleteClick = async () => {
    try {
      const result = await supplierApi.deleteSupplier(_id);
      console.log("resultApi", result);

      console.log("status", result.statusCode);

      if (result.statusCode === 200) {
        notifySuccess("Delete Success");
        reload((ref: number) => ref + 1);
        setOpenModalDeleteSupplier(false);
      } else {
        notifyError("Nhà cung cấp đã tồn tại sản phẩm!");
      }
    } catch (error) {
      console.log("Error deleting supplier:", error);
      notifyError("Update Fail");
    }
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation form when cancel is clicked
    setOpenModalDeleteSupplier(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <div className="modal-dialog w-full max-w-md p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="modal-content">
              <div className="modal-body">
                <p className="text-center">
                  Bạn chắc chắn muốn thực hiện thao tác xóa?
                </p>
              </div>
              <div className="modal-footer flex justify-center">
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-30 mx-5"
                  onClick={handleDeleteClick}
                >
                  Xóa
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
                  onClick={handleCancelDelete}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
