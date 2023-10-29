import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const billApi = {
  addDiscount(payload: any): Promise<ReturnReponse<any>> {
    const url = "/discount/create"; //params : page, filter
    return axiosClient.post(url, payload);
  },

  getListBill(skip: number, limit: number): Promise<any> {
    const url = `/bill/list?skip=${skip}&limit=${limit}`; //params : page, filter
    return axiosClient.get(url);
  },

  getDetailBill(payload:any): Promise<ReturnReponse<any>> {
    const url = '/bill/read'; //params : page, filter
    return axiosClient.post(url,payload);
  },

  verifyBill(payload:any): Promise<ReturnReponse<any>> {
    const url = '/bill/verify'; //params : page, filter
    return axiosClient.post(url,payload);
  },

  getStatuslBill(status: any): Promise<ReturnReponse<any>> {
    const url = `/bill/list${status}` //params : page, filter
    return axiosClient.get(url);
  },

  updateBill(payload:any): Promise<ReturnReponse<any>> {
    const url = '/bill/update'; //params : page, filter
    return axiosClient.post(url,payload);
  },

  refundBill(payload:any): Promise<ReturnReponse<any>> {
    const url = '/bill/refund'; //params : page, filter
    return axiosClient.post(url,payload);
  },
};

export default billApi;
