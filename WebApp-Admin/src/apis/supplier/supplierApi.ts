import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const supplierApi = {
  getListSupplier(): Promise<ReturnReponse<any>> {
    const url = "/supplier/list"; //params : page, filter
    return axiosClient.get(url);
  },
  getASupplier(_id: any): Promise<ReturnReponse<any>> {
    const url = `/supplier/getASupplier/${_id}`; //params : page, filter
    return axiosClient.get(url);
  },
  createSupplier(data: any): Promise<ReturnReponse<any>> {
    const url = "/supplier/create"; //params : page, filter
    return axiosClient.post(url, data);
  },
  editSupplier(_id: any, payLoad: any): Promise<ReturnReponse<any>> {
    const url = `/supplier/edit/${_id}`; //params : page, filter
    return axiosClient.patch(url, payLoad);
  },
  deleteSupplier(_id: any): Promise<ReturnReponse<any>> {
    const url = `/supplier/delete/${_id}`; //params : page, filter
    return axiosClient.delete(url);
  },
};
export default supplierApi;
