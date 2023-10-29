import { LocalCartPayload } from '~/interfaces/cart.interface';
import API, { getAuthHeader } from '~/services/axiosClient';
import useAuth from '~/stores/auth';
import useCart from '~/stores/cart';

const useCartHook = () => {
  const [{ signedIn }] = useAuth();
  const [{ count, products }, actionCart] = useCart();

  const calculateCartBill = async () => {
    if (signedIn) {
      return API.post({
        url: '/api/bill/calc',
        headers: { ...getAuthHeader() },
        body: {
          cart: null,
          address: {
            province: '',
            district: '',
            address: '',
          },
          discountCode: '',
        },
      });
    }
  };

  const addToCart = (payload: LocalCartPayload) => {
    if (signedIn) {
      actionCart.addProductToCartAuth(payload);
      return;
    }
    actionCart.addProductToCartLocal(payload);
  };

  const changeItemQuantity = (payload: LocalCartPayload) => {
    if (signedIn) {
      actionCart.changeAuthCartItemQuantity(payload);
      return;
    }
    actionCart.changeLocalCartItemQuantity(payload);
  };

  const removeCartItem = (payload: Partial<LocalCartPayload>) => {
    if (signedIn) {
      actionCart.removeAuthCartItem(payload);
      return;
    }

    actionCart.removeLocalCartItem(payload);
  };

  const clearCart = () => {
    if (!signedIn) {
      actionCart.clearCart();
    }
  };

  return {
    calculateCartBill,
    cartCount: count,
    cartProducts: products,
    addToCart,
    changeItemQuantity,
    removeCartItem,
    clearCart,
  };
};

export default useCartHook;
