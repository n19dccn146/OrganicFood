import { GetServerSideProps } from 'next';
import ChangePasswordPage from '~/components/pages/profile/changePasswordPage';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import { getCategories } from '~/services/request';

export default function ChangePassword(props) {
  return <ChangePasswordPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    const categories = await getCategories();
    const token = req.cookies[COOKIE_KEYS.ACCESS_TOKEN];
    if (!token)
      return {
        redirect: {
          destination: '/unauthorized?backURL=/tai-khoan/doi-mat-khau',
          permanent: false,
        },
      };

    const data = await Promise.all([categories]);

    return {
      props: {
        categories: data?.[0]?.data,
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};
