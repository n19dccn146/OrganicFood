import { ORDER_STATUS } from '~/interfaces/order.interface';

export const ORDER_STATUS_FILTER = [
  { label: 'Đã đặt hàng', value: ORDER_STATUS.ORDERED },
  { label: 'Đã xác nhận', value: ORDER_STATUS.CONFIRMED },
  { label: 'Đang vận chuyển', value: ORDER_STATUS.ON_DELIVERY },
  { label: 'Đã nhận hàng', value: ORDER_STATUS.DELIVERED },
  { label: 'Đã hủy', value: ORDER_STATUS.CANCELLED },
  //   { label: 'Giao thất bại', value: ORDER_STATUS.FAILED_DELIVERED },
];
