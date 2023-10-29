import { GetServerSideProps } from 'next';
import CheckoutPage from '~/components/pages/checkoutPage';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { calculateCartBill, getCategories } from '~/services/request';

//Thành phần Checkout được hiển thị cho người dùng, nó chứ thông tin về giỏ hàng của người dùng
//và ds thể loại sp
export default function Checkout(props) {
  return <CheckoutPage {...props} />;
}

//khi người dùng truy cập trang checkout nextjs se
//thuc thi ham getServersSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    //lấy dl ds các thể loại sp thông qua hàm getCategories()
    const categories = await getCategories();
    //nếu người dùng đã đăng nhập sẽ gọi hàm calculateCartBill để tính toán
    //thông tin giỏ hàng
    const token = req.cookies[COOKIE_KEYS.ACCESS_TOKEN];
    let cart: any;
    if (token) cart = await calculateCartBill({ token });

    //su dụng promise để đợi cả hai yêu cầu(lấy thể loại sp và tính toán giỏ hàng) hoàn thành
    const data = await Promise.all([categories]);

    const cartData = cart ? { userCartData: cart?.data } : {};

    return {
      //trả về một đối tượng prop chứa ds thể loại sp nếu có và thông tin giỏ hàng
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
