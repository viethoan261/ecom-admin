import { BaseModel } from '.';
import { ProductProperties } from '../../reducers/product/product.type';

export interface Product extends BaseModel {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  status?: ProductStatus;
  categoryID?: number;
  categoryName?: string;
  properties?: ProductProperties[];
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
