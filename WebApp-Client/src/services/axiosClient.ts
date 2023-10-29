import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
import { BASE_CONSTANTS } from '~/constants/base.constants';
import { getCookie } from '~/helpers/cookie.helper';
import { COOKIE_KEYS } from '~/constants/cookie.constants';

const axiosClient = axios.create({
  baseURL: BASE_CONSTANTS.BASE_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',

    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: (params: Record<string, any>) => {
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log(config);
    return config;
  },
  (err) => {
    // console.log(err.response);
    return Promise.reject(err);
  }
);
axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res && res.data) return res.data;
    return res;
  },
  (err) => {
    // console.log(`file: axiosClient.ts:37 => err`, err);
    if (err.response && err.response.data) return err.response.data;
    return Promise.reject(err);
  }
);

export const cvtObjectToFormData = (object: any) =>
  Object.keys(object).reduce((formData, key) => {
    const listValue = Array.isArray(object[key]) ? object[key] : [object[key]];
    listValue.forEach((value) => {
      if (typeof value === 'string') {
        formData.append(key, value);
      } else if (typeof value === 'number') {
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    });
    return formData;
  }, new FormData());

interface requestCredentials {
  url: string;
  params?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, any>;
}

export const getAuthHeader = (outsideToken?: string) => {
  let _token = outsideToken;
  if (!_token) {
    _token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
  }

  return {
    Authorization: `Bearer ${_token}`,
  };
};

const API = {
  get: <T>(cre: requestCredentials): Promise<T> => {
    return axiosClient.get(cre.url, {
      params: cre.params || {},
      headers: cre.headers || {},
    });
  },

  post: <T>(cre: requestCredentials): Promise<T> => {
    return axiosClient.post(cre.url, cre.body, {
      params: cre.params || {},
      headers: cre.headers || {},
    });
  },
  postFormData: <T>(cre: requestCredentials): Promise<T> => {
    return axiosClient.post(cre.url, cvtObjectToFormData(cre.body || {}), {
      params: cre.params || {},
      headers: cre.headers || {},
    });
  },

  put: <T>(cre: requestCredentials): Promise<T> => {
    return axiosClient.put(cre.url, cre.body || {}, {
      params: cre.params || {},
      headers: cre.headers || {},
    });
  },

  patch: <T>(cre: requestCredentials): Promise<T> => {
    return axiosClient.patch(cre.url, cre.body || {}, {
      params: cre.params || {},
      headers: cre.headers || {},
    });
  },
  patchFormData: <T>(cre: requestCredentials): Promise<T> => {
    return axiosClient.patch(cre.url, cvtObjectToFormData(cre.body || {}), {
      params: cre.params || {},
      headers: cre.headers || {},
    });
  },
  delete: <T>(cre: requestCredentials): Promise<T> => {
    return axiosClient.delete(cre.url, {
      params: cre.params || {},
      headers: cre.headers || {},
    });
  },
};

export default API;
