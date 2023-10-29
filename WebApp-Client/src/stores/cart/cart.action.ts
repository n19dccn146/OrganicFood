import { API_URL } from '~/constants/api.constant';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage.constants';
import { saveToLocalStorage } from '~/helpers/base.helper';
import { getCookie } from '~/helpers/cookie.helper';
import { LocalCartPayload } from '~/interfaces/cart.interface';
import API, { getAuthHeader } from '~/services/axiosClient';
import { calculateCartBill } from '~/services/request';
import { State } from '.';

type Actions = { setState: any; getState: () => State; dispatch: any };

export const addProductToCartLocal = (payload: LocalCartPayload) => {
  return async ({ setState, getState }: Actions) => {
    const { products, count } = getState();
    const { product, color, quantity = 1 } = payload;

    let _newCount = count;
    const cloneCart = [...products];

    const findProduct = cloneCart.find(
      (pro) => pro?.product === product && pro?.color === color
    );

    if (!findProduct) {
      _newCount++;
      cloneCart.push(payload);
    } else {
      const productIndex = cloneCart.findIndex(
        (pro) => pro?.product === product && pro?.color === color
      );
      cloneCart[productIndex] = {
        ...findProduct,
        quantity: findProduct.quantity + quantity,
      };
    }

    saveToLocalStorage(LOCAL_STORAGE_KEY.CART_COUNT_KEY, _newCount);
    saveToLocalStorage(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY, cloneCart);

    setState({
      products: cloneCart,
      count: _newCount,
    });
  };
};

export const changeLocalCartItemQuantity = (payload: LocalCartPayload) => {
  return async ({ setState, getState }: Actions) => {
    const { products } = getState();
    const { product, color, quantity = 1 } = payload;

    const cloneCart = [...products];

    const findProduct = cloneCart.find(
      (pro) => pro?.product === product && pro?.color === color
    );

    if (findProduct) {
      const productIndex = cloneCart.findIndex(
        (pro) => pro?.product === product && pro?.color === color
      );
      cloneCart[productIndex].quantity += quantity;
    }

    saveToLocalStorage(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY, cloneCart);

    setState({
      products: cloneCart,
    });
  };
};

export const removeLocalCartItem = (payload: Partial<LocalCartPayload>) => {
  return async ({ setState, getState }: Actions) => {
    const { products, count } = getState();
    const { product, color } = payload;

    const cloneCart = products.filter(
      (e) => e.product !== product || e.color !== color
    );
    const _newCount = count - 1;

    saveToLocalStorage(LOCAL_STORAGE_KEY.CART_COUNT_KEY, _newCount);
    saveToLocalStorage(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY, cloneCart);

    setState({
      products: cloneCart,
      count: _newCount,
    });
  };
};

export const addProductToCartAuth = (payload: LocalCartPayload) => {
  return async ({ getState, setState }: Actions) => {
    await API.post({
      url: API_URL.PUSH_CART,
      headers: { ...getAuthHeader() },
      body: { ...payload },
    });
    const { products, count } = getState();
    const { product, color, quantity = 1 } = payload;

    let _newCount = count;
    const cloneCart = [...products];

    const findProduct = cloneCart.find(
      (pro) => pro?.product === product && pro?.color === color
    );

    if (!findProduct) {
      _newCount++;
      cloneCart.push(payload);
    } else {
      const productIndex = cloneCart.findIndex(
        (pro) => pro?.product === product && pro?.color === color
      );
      cloneCart[productIndex] = {
        ...findProduct,
        quantity: findProduct.quantity + quantity,
      };
    }

    setState({
      products: cloneCart,
      count: _newCount,
    });
  };
};

export const changeAuthCartItemQuantity = (payload: LocalCartPayload) => {
  return async ({ setState, getState }: Actions) => {
    const { products } = getState();
    const { product, color, quantity = 1 } = payload;

    const cloneCart = [...products];

    const findProduct = cloneCart.find(
      (pro) => pro?.product === product && pro?.color === color
    );

    if (findProduct) {
      const productIndex = cloneCart.findIndex(
        (pro) => pro?.product === product && pro?.color === color
      );
      cloneCart[productIndex].quantity += quantity;
    }
    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    await calculateCartBill({
      token,
      payload: {
        cart: cloneCart,
        address: {
          province: '',
          district: '',
          address: '',
        },
        discountCode: '',
      },
    });

    setState({
      products: cloneCart,
    });
  };
};

export const removeAuthCartItem = (payload: Partial<LocalCartPayload>) => {
  return async ({ setState, getState }: Actions) => {
    const { products, count } = getState();
    const { product, color } = payload;

    const cloneCart = products.filter(
      (e) => e.product !== product || e.color !== color
    );
    const _newCount = count - 1;

    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    await calculateCartBill({
      token,
      payload: {
        cart: cloneCart,
        address: {
          province: '',
          district: '',
          address: '',
        },
        discountCode: '',
      },
    });

    setState({
      products: cloneCart,
      count: _newCount,
    });
  };
};

export const clearCart = () => {
  return async ({ setState }: Actions) => {
    saveToLocalStorage(LOCAL_STORAGE_KEY.CART_COUNT_KEY, 0);
    saveToLocalStorage(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY, []);

    setState({
      products: [],
      count: 0,
    });
  };
};

export const loadCart = ({ cart, total = 1 }) => {
  return async ({ setState }) => {
    setState({
      products: [...cart],
      count: total,
    });
  };
};
