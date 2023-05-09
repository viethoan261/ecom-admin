import { OrderStatus } from '../models/order';

export interface UsersStatistics {
  totalUser: number;
  totalUserOrdered: number;
}

export interface ProductsStatistics {
  totalProduct: number;
  totalActiveProduct: number;
}

export interface OrdersStatistics {
  status: OrderStatus;
  totalOrder: number;
}

export interface TurnOverStatistics {
  paymentDate: string;
  totalAmount: number;
}
