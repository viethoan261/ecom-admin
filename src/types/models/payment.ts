import { BaseModel } from ".";

export interface Payment extends BaseModel {
  orderId?: number;
  amount?: number;
  paymentDate?: string;
  price?: number;
}
