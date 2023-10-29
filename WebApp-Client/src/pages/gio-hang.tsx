import { GetServerSideProps } from 'next';
import CartPage from '~/components/pages/cartPage';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { calculateCartBill, getCategories } from '~/services/request';

export default function Cart(props) {
  return <CartPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    const categories = await getCategories();
    const token = req.cookies[COOKIE_KEYS.ACCESS_TOKEN];
    let cart: any;
    if (token) cart = await calculateCartBill({ token });

    const data = await Promise.all([categories]);

    const cartData = cart ? { userCartData: cart?.data } : {};

    return {
      props: {
        categories: data?.[0]?.data,
        ...cartData,
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};
