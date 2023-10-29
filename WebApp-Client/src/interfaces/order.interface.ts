export enum ORDER_STATUS {
  ORDERED = 'Ordered',
  CONFIRMED = 'Confirmed',
  ON_DELIVERY = 'Delivering',
  DELIVERED = 'Done',
  CANCELLED = 'Canceled',
  //   FAILED_DELIVERED = -2,
}

export const ORDER_STATUS_TEXT = {
  [ORDER_STATUS.ORDERED]: 'Đã đặt hàng',
  [ORDER_STATUS.CONFIRMED]: 'Đã xác nhận',
  [ORDER_STATUS.ON_DELIVERY]: 'Đang vận chuyển',
  [ORDER_STATUS.DELIVERED]: 'Đã nhận hàng',
  [ORDER_STATUS.CANCELLED]: 'Đã hủy',
};
