import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const userApi = {
  getUserList(): Promise<ReturnReponse<any>> {
    const url = "/users/list"; //params : page, filter
    return axiosClient.post(url);
  },

  getAUser(_id: any): Promise<ReturnReponse<any>> {
    const url = `/users/${_id}`; //params : page, filter
    return axiosClient.get(url);
  },

  editAUser(_id: any, payload: any): Promise<ReturnReponse<any>> {
    const url = `/users/${_id}`; //params : page, filter
    return axiosClient.patch(url, payload);
  },

  enableUser(payload: any): Promise<ReturnReponse<any>> {
    const url = "/users/enable"; //params : page, filter
    return axiosClient.post(url, payload);
  },

  sendMail(payload: any): Promise<ReturnReponse<any>> {
    const url = "/users/mail"; //params : page, filter
    return axiosClient.post(url, payload);
  },

  editDiscountUser(payload: any): Promise<ReturnReponse<any>> {
    const url = "/discount/edit"; //params : page, filter
    return axiosClient.put(url, payload);
  },
};

export default userApi;
