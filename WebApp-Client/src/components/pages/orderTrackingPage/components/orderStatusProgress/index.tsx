/**
 * -2: giao that bai
 * -1: da huy
 * 0: da dat hang
 * 1: da xac nhan
 * 2: dang van chuyen
 * 3: giao thanh cong
 */
import {
  IconCheck,
  IconDots,
  IconReceipt,
  IconTruckDelivery,
  IconUserCheck,
  IconX,
} from '@tabler/icons';
import React from 'react';
import { DateJS } from '~/helpers/date.helper';
import { ORDER_STATUS, ORDER_STATUS_TEXT } from '~/interfaces/order.interface';

type IStatus = {
  milestone: string;
  status: ORDER_STATUS;
  iconName: ORDER_STATUS;
  active: boolean;
  time?: string;
};

const getStatusIconFromName = (
  iconName: ORDER_STATUS,
  iconProps: any = {
    stroke: 2,
    size: 18,
  }
) => {
  switch (iconName) {
    case ORDER_STATUS.ORDERED:
      return <IconReceipt {...iconProps} />;
    case ORDER_STATUS.CONFIRMED:
      return <IconUserCheck {...iconProps} />;
    case ORDER_STATUS.ON_DELIVERY:
      return <IconTruckDelivery {...iconProps} />;
    case ORDER_STATUS.DELIVERED:
      return <IconCheck {...iconProps} />;
    case ORDER_STATUS.CANCELLED:
      return <IconX {...iconProps} />;
    default:
      return <IconDots {...iconProps} />;
  }
};

const milestones: IStatus[] = [
  {
    milestone: 'Đã đặt hàng',
    status: ORDER_STATUS.ORDERED,
    active: true,
    iconName: ORDER_STATUS.ORDERED,
    time: '2022-10-24T18:28',
  },
  {
    milestone: 'Đã xác nhận',
    status: ORDER_STATUS.CONFIRMED,
    active: true,
    iconName: ORDER_STATUS.CONFIRMED,
    time: '2022-10-24T20:02',
  },
  {
    milestone: 'Đang giao hàng',
    status: ORDER_STATUS.ON_DELIVERY,
    iconName: ORDER_STATUS.ON_DELIVERY,
    active: false,
  },
  {
    milestone: 'Đã hủy',
    status: ORDER_STATUS.CANCELLED,
    active: true,
    iconName: ORDER_STATUS.CANCELLED,
    time: '2022-10-24T18:28',
  },
];

const defaultTimeline = [
  ORDER_STATUS.ORDERED,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.ON_DELIVERY,
  ORDER_STATUS.DELIVERED,
];

const getColorByStatus = (status: ORDER_STATUS, active: boolean) => {
  return active
    ? [ORDER_STATUS.CANCELLED].some((e) => e == status)
      ? 'border-error bg-error'
      : 'border-green bg-green'
    : 'border-gray_E1 bg-gray_E1';
};

const OrderStatusProgress = ({
  status,
  timeline,
}: {
  status: ORDER_STATUS;
  timeline: any[];
}) => {
  const milestoneShow = React.useMemo(() => {
    const _timeline = [];
    const cloneTimeline = timeline.reverse();
    if (status === ORDER_STATUS.CANCELLED) {
      //   cloneTimeline.map((_status) => {
      _timeline.push(
        {
          status: ORDER_STATUS.ORDERED,
          iconName: ORDER_STATUS.ORDERED,
          active: true,
          time: cloneTimeline.find(
            (_status) => _status.statusTimeline == ORDER_STATUS.ORDERED
          )?.time,
          milestone: ORDER_STATUS_TEXT[ORDER_STATUS.ORDERED],
        },
        {
          status: ORDER_STATUS.CANCELLED,
          iconName: ORDER_STATUS.CANCELLED,
          active: true,
          time: cloneTimeline.find(
            (_status) => _status.statusTimeline == ORDER_STATUS.CANCELLED
          )?.time,
          milestone: ORDER_STATUS_TEXT[ORDER_STATUS.CANCELLED],
        }
      );
      //   });
    } else {
      defaultTimeline.map((_status, i) => {
        _timeline.push(
          cloneTimeline[i]?.statusTimeline === _status
            ? {
                status: _status,
                iconName: _status,
                active: true,
                time: cloneTimeline[i]?.time,
                milestone: ORDER_STATUS_TEXT[_status],
              }
            : {
                status: _status,
                iconName: _status,
                active: false,
                time: '',
                milestone: ORDER_STATUS_TEXT[_status],
              }
        );
      });
    }
    return _timeline;
  }, []);

  return (
    <div className="my-4">
      <div className="flex pb-12 px-10 max-w-5xl mx-auto">
        {milestoneShow.map((e, i) => {
          const icon = getStatusIconFromName(e.iconName, {
            className: e.active ? 'text-white' : 'text-[#a1a1a1]',
          });
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="flex-1 align-center items-center align-middle content-center flex">
                  <div className="w-full bg-grey-light items-center align-middle align-center flex-1">
                    <div
                      className={`${getColorByStatus(
                        e.status,
                        e.active
                      )} text-xs leading-none pt-[2px] text-center text-grey-darkest`}
                    ></div>
                  </div>
                </div>
              )}

              <div className="relative">
                <div
                  className={`w-10 h-10 border-2 ${getColorByStatus(
                    e.status,
                    e.active
                  )} mx-auto rounded-full text-lg flex items-center justify-center`}
                >
                  {icon}
                </div>
                <div className="absolute top-full left-1/2 translate-y-1 -translate-x-1/2 w-max bg-transparent">
                  <span className="text-center text-dark_3 text-sm max_line-1 font-normal leading-6">
                    {e.milestone}
                  </span>
                  {e.active && (
                    <span className="text-center text-gray_C1 text-xs max_line-1 font-normal">
                      {DateJS.getFormatDate(e.time, 'DD-MM-YYYY HH:mm')}
                    </span>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusProgress;
