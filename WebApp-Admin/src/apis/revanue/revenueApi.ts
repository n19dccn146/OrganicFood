import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const revanueApi = {
  addDiscount(payload: any): Promise<ReturnReponse<any>> {
    const url = "/discount/create"; //params : page, filter
    return axiosClient.post(url, payload);
  },

  getRevenue(data: any): Promise<ReturnReponse<any>> {
    const url = "/bill/revenue"; //params : page, filter
    return axiosClient.post(url, data);
  },

  getcalculateProfitLoss(data: any): Promise<ReturnReponse<any>> {
    const url = "/bill/calculateProfitLoss"; //params : page, filter
    return axiosClient.post(url, data);
  },
};

export default revanueApi;
