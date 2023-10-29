import { GetServerSideProps } from 'next';
import React from 'react';
import OrderTrackingPage from '~/components/pages/orderTrackingPage';
import { API_URL } from '~/constants/api.constant';
import { COOKIE_KEYS } from '~/constants/cookie.constants';
import API, { getAuthHeader } from '~/services/axiosClient';
import { getCategories } from '~/services/request';
import { ReturnResponse } from '~/services/response.interface';

type Props = {};

const OrderTracking = (props: Props) => {
  return <OrderTrackingPage {...props} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query, req } = context;
    const { order } = query;
    const categories = await getCategories();
    const orderInfo = await API.post<ReturnResponse<any>>({
      url: API_URL.BILL_READ,
      body: { _id: order },
      headers: { ...getAuthHeader(req.cookies[COOKIE_KEYS.ACCESS_TOKEN]) },
    });

    const data = await Promise.all([categories, orderInfo]);

    return {
      props: {
        categories: data?.[0]?.data,
        orderInfo: data?.[1]?.data,
      },
    };
  } catch (error) {
    console.log(`file: index.tsx:70 => error`, error);
    return {
      notFound: true,
    };
  }
};

export default OrderTracking;
