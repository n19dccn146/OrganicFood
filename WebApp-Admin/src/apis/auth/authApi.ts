import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";
import { IReqLogin, IReqRefreshToken, IReqRegiser } from "./auth.interface";
import { IResLogin } from "./auth.type";

const authApi = {
  login(data: IReqLogin): Promise<ReturnReponse<IResLogin>> {
    const url = "/auth/login"; //params : page, filter
    return axiosClient.post(url, data);
  },

  refreshTokens(data: IReqRefreshToken): Promise<any> {
    const url = "/auth/refresh-tokens";
    return axiosClient.post(url, data);
  },

  register(data: IReqRegiser): Promise<any> {
    const url = "/auth/register-employee";
    return axiosClient.post(url, data);
  },

  getInfo(): Promise<ReturnReponse<any>> {
    const url = "/auth/profile"; //params : page, filter
    return axiosClient.get(url);
  },
};

export default authApi;
