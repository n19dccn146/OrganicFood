import { IconBusinessplan, IconCalendarPlus, IconReceipt } from '@tabler/icons';
import Head from 'next/head';
import React from 'react';
import { formatCurrency2 } from '~/helpers/base.helper';
import { DateJS } from '~/helpers/date.helper';
import { ORDER_STATUS } from '~/interfaces/order.interface';
import Layout from '~/layouts/Layout';
import useAuth from '~/stores/auth';
import ProfilePageFrame from './components/profilePageFrame';

const iconsProps = {
  size: 48,
  stroke: 2,
  className: 'text-dark_3',
};

const DashboardPage = (props) => {
  const { bills } = props;
  const { All } = bills;
  const [{ userInfo }] = useAuth();

  const profile = userInfo;

  const totalBills = All?.length || 0;
  const totalPayment = React.useMemo(
    () =>
      (All || []).reduce((prev, curr) => {
        return curr?.status?.[0]?.statusTimeline === ORDER_STATUS.ORDERED
          ? prev + curr?.total
          : prev;
      }, 0),
    []
  );

  return (
    <>
      <Head>
        <title>Trang chủ cá nhân</title>
      </Head>
      <Layout categories={props?.categories || []}>
        <ProfilePageFrame>
          <div className="grid grid-cols-6 gap-x-4">
            <div className="col-span-3">
              <div className="w-full p-[10px] pt-[10px] border rounded-xl border-gray_D9">
                <div className="flex flex-col items-center justify-center gap-y-1">
                  <div className="h-[50px] w-[50px] rounded-full border border-gray_68">
                    <img
                      src="/favicon.svg"
                      alt="logo"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className="">Xin chào,</span>
                  <p className="font-semibold text-center uppercase text-[20px] mx-[20px]">
                    {profile?.name}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-x-4 mt-6">
                  <div className="col-span-1 flex flex-col gap-x-2 items-center">
                    <span className="">Ngày tham gia</span>
                    <IconCalendarPlus {...iconsProps} />
                    <span className="mt-1">
                      {DateJS.getFormatDate(profile?.createdAt)}
                    </span>
                  </div>
                  <div className="col-span-1 flex flex-col gap-x-2 items-center">
                    <span className="">Đơn đã mua</span>
                    <IconBusinessplan {...iconsProps} />
                    <span className="mt-1">{totalBills}</span>
                  </div>
                  <div className="col-span-1 flex flex-col gap-x-2 items-center">
                    <span className="">Tổng chi tiêu</span>
                    <IconReceipt {...iconsProps} />
                    <span className="mt-1">
                      {formatCurrency2(totalPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-3"></div>
          </div>
        </ProfilePageFrame>
      </Layout>
    </>
  );
};

export default DashboardPage;
