import { BaseModel } from '.';

export interface Order extends BaseModel {
  customerID?: number;
  staffId?: number;
  status?: OrderStatus;
  orderDate?: string;
  price?: number;
  categoryId?: number;
  address?: string;
  method?: string;
  orderID?: number;
}

export enum OrderStatus {
  pending = 'PENDING',
  rejected = 'CANCELLED',
  delivering = 'DELIVERING',
  delivered = 'DELIVERED',
}

export const OrderStatusStrategy = {
  [OrderStatus.delivered]: {
    label: 'Thành công',
  },
  [OrderStatus.delivering]: {
    label: 'Đang giao',
  },
  [OrderStatus.pending]: {
    label: 'Đang chờ',
  },
  [OrderStatus.rejected]: {
    label: 'Huỷ bỏ',
  },
};
