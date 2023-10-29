import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";

const chatApi = {
  addChat(payload: any): Promise<ReturnReponse<any>> {
    const url = "/chat/add"; //params : page, filter
    return axiosClient.post(url, payload);
  },

  getListChat(): Promise<ReturnReponse<any>> {
    const url = "/chat/list"; //params : page, filter
    return axiosClient.get(url);
  },

  getChat(payload:any): Promise<ReturnReponse<any>> {
    const url = '/chat/get'; //params : page, filter
    return axiosClient.post(url,payload);
  },
  newChat(payload:any): Promise<ReturnReponse<any>> {
    const url = '/chat/new'; //params : page, filter
    return axiosClient.post(url,payload);
  },
};

export default chatApi;
