import { BaseModel } from ".";

export interface Rating extends BaseModel {
  userId?: number;
  productId?: number;
  score?: number;
}
