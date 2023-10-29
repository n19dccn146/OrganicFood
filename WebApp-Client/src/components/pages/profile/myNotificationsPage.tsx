import Head from 'next/head';
import React from 'react';
import { DateJS } from '~/helpers/date.helper';
import useLoading from '~/hooks/useLoading';
import Layout from '~/layouts/Layout';
import ProfilePageFrame from './components/profilePageFrame';

const MyNotificationsPage = (props: any) => {
  const { notifications = [] } = props;

  const { loading, showUILoading } = useLoading();

  const total = notifications?.length || 0;

  React.useEffect(() => {
    showUILoading(500);
  }, []);

  return (
    <>
      <Head>
        <title>Thông báo của tôi</title>
      </Head>
      <Layout categories={props?.categories || []}>
        <ProfilePageFrame>
          <div className="">
            <h3 className="text-[22px] font-semibold uppercase text-center">
              Quản lý thông báo
            </h3>

            <div className="mt-8">
              {!loading ? (
                total > 0 ? (
                  notifications.map((notification, index) => {
                    return (
                      <div
                        key={index}
                        className="p-3 border border-gray_B9 rounded-md mt-4 first:mt-0 bg-white"
                      >
                        <span className="block mt-3 font-medium">
                          {DateJS.getFormatDate(
                            notification?.createdAt,
                            'DD-MM-YYYY HH:mm'
                          )}
                        </span>
                        <p className="text-base text-justify">
                          {notification?.message}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center italic">
                    Bạn chưa có thông báo nào.
                  </p>
                )
              ) : (
                <p className="text-center">Đang tải...</p>
              )}
            </div>
          </div>
        </ProfilePageFrame>
      </Layout>
    </>
  );
};

export default MyNotificationsPage;
