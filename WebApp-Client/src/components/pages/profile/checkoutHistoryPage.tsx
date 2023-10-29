import { IconChecklist, IconWallet } from '@tabler/icons';
import Head from 'next/head';
import React from 'react';
import { batch } from 'react-sweet-state';
import { ORDER_STATUS_FILTER } from '~/constants/order.constants';
import { formatCurrency2 } from '~/helpers/base.helper';
import useLoading from '~/hooks/useLoading';
import { ORDER_STATUS, ORDER_STATUS_TEXT } from '~/interfaces/order.interface';
import Layout from '~/layouts/Layout';
import ProfilePageFrame from './components/profilePageFrame';

const iconsProps = {
  size: 36,
  stroke: 2,
  className: 'text-gray_B9',
};

const filterStatus = [
  { label: 'Tất cả', value: 'All' },
  ...ORDER_STATUS_FILTER,
];

const getTagColor = (status) => {
  if (status == ORDER_STATUS.ORDERED) return 'bg-[#9EA1D4] text-white';
  if (status == ORDER_STATUS.CONFIRMED) return 'bg-[#A8D1D1] text-white';
  if (status == ORDER_STATUS.ON_DELIVERY) return 'bg-[#F1F7B5] text-black';
  if (status == ORDER_STATUS.DELIVERED) return 'bg-[#86C8BC] text-white';
  if (status == ORDER_STATUS.CANCELLED) return 'bg-[#FD8A8A] text-white';
};

const CheckoutHistoryPage = (props: any) => {
  const { bills } = props;
  const { All } = bills;

  const [statusBills, setStatusBills] = React.useState(All.reverse() || []);
  const [currStatus, setCurrStatus] = React.useState<number | string>(
    filterStatus[0].value
  );

  const { loading, showUILoading } = useLoading();

  const total = statusBills?.length || 0;

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
        <title>Lịch sử mua hàng</title>
      </Head>
      <Layout categories={props?.categories || []}>
        <ProfilePageFrame>
          <div className="">
            <h3 className="text-[22px] font-semibold uppercase text-center">
              Quản lý đơn hàng
            </h3>

            <div className="my-8">
              <div className="flex items-center justify-center gap-x-12">
                <div className="flex flex-col items-center gap-y-2">
                  <IconChecklist {...iconsProps} />
                  <p className="font-semibold">{totalBills} đơn hàng</p>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                  <IconWallet {...iconsProps} />
                  <p className="font-semibold">
                    Đã mua {formatCurrency2(totalPayment)}
                  </p>
                </div>
              </div>
            </div>

            {/* Filter */}
            <FilterOrder
              setStatusBills={setStatusBills}
              bills={bills}
              showUILoading={showUILoading}
              setCurrStatus={setCurrStatus}
              currStatus={currStatus}
            />

            <div className="">
              <div className="border border-gray_B9 rounded-2xl grid grid-cols-9 items-center p-2 mb-4">
                <div className="col-span-3 flex justify-center">
                  <span className="select-none">Sản phẩm</span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="select-none">Tình trạng</span>
                </div>
                <div className="col-span-2 flex justify-center">
                  <span className="select-none">Tổng tiền</span>
                </div>
                <div className="col-span-2 flex justify-center"></div>
              </div>
              {!loading ? (
                total > 0 ? (
                  statusBills.map((bill, index) => {
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-9 items-center p-3 first:border-t-0 border-t border-t-gray_B9"
                      >
                        <div className="col-span-3 flex justify-center">
                          <span className="select-none">
                            {bill?.products?.length} sản phẩm
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <span
                            className={`select-none ${getTagColor(
                              bill?.status?.[0]?.statusTimeline
                            )} rounded-full py-2 px-4`}
                          >
                            {
                              ORDER_STATUS_TEXT[
                                bill?.status?.[0]?.statusTimeline
                              ]
                            }
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <span className="select-none">
                            {formatCurrency2(bill?.total || 0)}
                          </span>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          {/* <Link> */}
                          <a
                            href={`/kiem-tra-don-hang/${bill?._id}`}
                            className="select-none bg-blue_00 rounded-full text-white py-2 px-4"
                          >
                            Xem chi tiết
                          </a>
                          {/* </Link> */}
                        </div>
                      </div>
                    );
                  })
                ) : currStatus == filterStatus[0].value ? (
                  <p className="text-center italic">
                    Bạn chưa có đơn hàng nào.
                  </p>
                ) : (
                  <p className="text-center italic">
                    Bạn không có đơn hàng nào ở trạng thái này.
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

const Filter = (props) => {
  const { setStatusBills, bills, showUILoading, setCurrStatus, currStatus } =
    props;

  const handleChooseStatus = async (status) => {
    if (status === currStatus) return;
    batch(() => {
      showUILoading(400);
      setCurrStatus(status);
      setStatusBills(bills[status].reverse());
    });
  };

  return (
    <div className="flex justify-between gap-x-2 my-4 items-center">
      {filterStatus.map((status, index) => {
        const active = status.value === currStatus;
        return (
          <div className="" key={index}>
            <span
              className={`${
                active ? 'text-error font-semibold' : 'text-gray_B9'
              } cursor-pointer`}
              onClick={() => handleChooseStatus(status.value)}
            >
              {status.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const FilterOrder = React.memo(Filter);

export default CheckoutHistoryPage;
