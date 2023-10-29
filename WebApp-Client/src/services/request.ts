import { API_URL } from '~/constants/api.constant';
import { CATEGORY_MODEL } from '~/models/category.model';
import API, { getAuthHeader } from './axiosClient';
import { ReturnListResponse, ReturnResponse } from './response.interface';

export const getCategories = async () => {
  return await API.get<{ data: ReturnListResponse<CATEGORY_MODEL> }>({
    url: API_URL.CATEGORY_LIST,
  });
};

const initVal = {
  cart: null,
  address: {
    province: '',
    district: '',
    address: '',
  },
  discountCode: '',
};

export const calculateCartBill = async ({
  token,
  payload = initVal,
}: {
  token?: string;
  payload?: any;
}) => {
  const auth = token ? { headers: { ...getAuthHeader(token) } } : {};
  return await API.post<ReturnResponse<any>>({
    url: API_URL.BILL_CALC,
    ...auth,
    body: { ...payload },
  });
};
