import { createStore, createHook } from 'react-sweet-state';
import { LOCAL_STORAGE_KEY } from '~/constants/localStorage.constants';
import { getFromLocalStorage } from '~/helpers/base.helper';
import {
  loadCart,
  addProductToCartLocal,
  changeLocalCartItemQuantity,
  removeLocalCartItem,
  addProductToCartAuth,
  changeAuthCartItemQuantity,
  removeAuthCartItem,
  clearCart,
} from './cart.action';

export type State = {
  products: Array<any>;
  count: number;
};

const initialState: State = {
  products: getFromLocalStorage(LOCAL_STORAGE_KEY.CART_PRODUCT_KEY) || [],
  count: Number(getFromLocalStorage(LOCAL_STORAGE_KEY.CART_COUNT_KEY)) || 0,
};

export const CartStore = createStore({
  initialState,
  actions: {
    loadCart,
    addProductToCartLocal,
    changeLocalCartItemQuantity,
    removeLocalCartItem,
    addProductToCartAuth,
    changeAuthCartItemQuantity,
    removeAuthCartItem,
    clearCart,
  },
  name: 'cart',
});

const useCart = createHook(CartStore);
export default useCart;
