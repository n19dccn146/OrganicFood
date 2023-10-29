import axiosClient from "../axiosClient";
import { ReturnReponse } from "../response.interface";
import { IResProduct } from "./product.type";

const productApi = {
  getNotifications(): Promise<ReturnReponse<any>> {
    const url = `product/notifications`;
    return axiosClient.get(url);
  },
  seenAllnotify(): Promise<ReturnReponse<any>> {
    const url = `product/seenAllnotify`;
    return axiosClient.get(url);
  },
  deleteAllNotify(): Promise<ReturnReponse<any>> {
    const url = `product/deleteAllNotify`;
    return axiosClient.get(url);
  },
  seenNotify(id: any): Promise<ReturnReponse<any>> {
    const url = `product/seenNotify/${id}`;
    return axiosClient.get(url);
  },
  getProduct(
    skip: number,
    limit: number,
    category: string
  ): Promise<ReturnReponse<IResProduct>> {
    const url = `/product/list?skip=${skip}&limit=${limit}&category=${category}`; //params : page, filter
    return axiosClient.get(url);
  },
  getSkipProduct(
    skip: number,
    limit: number
  ): Promise<ReturnReponse<IResProduct>> {
    const url = `/product/list?skip=${skip}&limit=${limit}`; //params : page, filter
    return axiosClient.get(url);
  },

  createProduct(payload: any): Promise<ReturnReponse<any>> {
    const url = "/product/create"; //params : page, filter
    return axiosClient.post(url, payload);
  },
  importProduct(payload: any): Promise<ReturnReponse<any>> {
    const url = "/product/import"; //params : page, filter
    return axiosClient.post(url, payload);
  },
  importColors(payload: any): Promise<ReturnReponse<any>> {
    const url = "/product/addColor"; //params : page, filter
    return axiosClient.post(url, payload);
  },
  getDetilaProduct(_id: any): Promise<ReturnReponse<any>> {
    const url = `/product/read?${_id}`; //params : page, filter
    return axiosClient.get(url);
  },

  updateProduct(payload: any): Promise<ReturnReponse<any>> {
    const url = "/product/update"; //params : page, filter
    return axiosClient.post(url, payload);
  },

  editDiscount(payload: any): Promise<ReturnReponse<any>> {
    const url = "/discount/edit"; //params : page, filter
    return axiosClient.put(url, payload);
  },

  getListImportById(payload: any): Promise<ReturnReponse<any>> {
    const url = "/product/listImport";
    return axiosClient.post(url, payload);
  },
  getListHistoryPriceById(payload: any): Promise<ReturnReponse<any>> {
    const url = "/product/listHistoryPrice";
    return axiosClient.post(url, payload);
  },
};

export default productApi;
