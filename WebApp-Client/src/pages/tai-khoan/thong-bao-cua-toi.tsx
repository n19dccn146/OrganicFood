import { GetServerSideProps } from 'next';
import MyNotificationsPage from '~/components/pages/profile/myNotificationsPage';
import { API_URL } from '~/constants/api.constant';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import API, { getAuthHeader } from '~/services/axiosClient';
import { getCategories } from '~/services/request';
import { ReturnListResponse } from '~/services/response.interface';

export default function MyNotifications(props) {
  return <MyNotificationsPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req } = context;
    const token = req.cookies[COOKIE_KEYS.ACCESS_TOKEN];
    if (!token)
      return {
        redirect: {
          destination: '/unauthorized?backURL=/tai-khoan/thong-bao-cua-toi',
          permanent: false,
        },
      };

    const categories = await getCategories();
    const notificationList = await API.get<ReturnListResponse<any>>({
      url: API_URL.USER_NOTIFICATIONS,
      headers: { ...getAuthHeader(token) },
    });

    const data = await Promise.all([categories, notificationList]);

    return {
      props: {
        categories: data?.[0]?.data,
        notifications: data?.[1]?.data,
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};
