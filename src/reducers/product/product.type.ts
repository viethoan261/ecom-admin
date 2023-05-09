import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/reducer';
import { Product } from '../../types/models/product';
import { Colors, Sizes } from '../../config/constants/system';
import { FileWithPath } from '@mantine/dropzone';

export interface ProductState {
  isFetching: boolean;
  products: Product[];
}

export enum ProductActionType {
  GET_ALL_PRODUCTS_PENDING = 'GET_ALL_PRODUCTS_PENDING',
  GET_ALL_PRODUCTS_SUCCESS = 'GET_ALL_PRODUCTS_SUCCESS',
  GET_ALL_PRODUCTS_FAILURE = 'GET_ALL_PRODUCTS_FAILURE',

  GET_PRODUCT_BY_ID_PENDING = 'GET_PRODUCT_BY_ID_PENDING',
  GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS',
  GET_PRODUCT_BY_ID_FAILURE = 'GET_PRODUCT_BY_ID_FAILURE',

  ADD_PRODUCT_PENDING = 'ADD_PRODUCT_PENDING',
  ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS',
  ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE',

  EDIT_PRODUCT_PENDING = 'EDIT_PRODUCT_PENDING',
  EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
  EDIT_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE',

  EDIT_PROPERTY_PENDING = 'EDIT_PROPERTY_PENDING',
  EDIT_PROPERTY_SUCCESS = 'EDIT_PROPERTY_SUCCESS',
  EDIT_PROPERTY_FAILURE = 'ADD_PROPERTY_FAILURE',

  DELETE_PRODUCT_PENDING = 'DELETE_PRODUCT_PENDING',
  DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
  DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE',
}

//
export interface GetAllProductsPending {
  type: ProductActionType.GET_ALL_PRODUCTS_PENDING;
}
export interface GetAllProductsSuccess {
  type: ProductActionType.GET_ALL_PRODUCTS_SUCCESS;
  payload: Product[];
}
export interface GetAllProductsFailure {
  type: ProductActionType.GET_ALL_PRODUCTS_FAILURE;
}

//
export interface GetProductByIdPending {
  type: ProductActionType.GET_PRODUCT_BY_ID_PENDING;
}
export interface GetProductByIdSuccess {
  type: ProductActionType.GET_PRODUCT_BY_ID_SUCCESS;
  payload: Product;
}
export interface GetProductByIdFailure {
  type: ProductActionType.GET_PRODUCT_BY_ID_FAILURE;
}

//
export interface AddProductPending {
  type: ProductActionType.ADD_PRODUCT_PENDING;
}
export interface AddProductSuccess {
  type: ProductActionType.ADD_PRODUCT_SUCCESS;
  payload: Product;
}
export interface AddProductFailure {
  type: ProductActionType.ADD_PRODUCT_FAILURE;
}

//
export interface EditProductPending {
  type: ProductActionType.EDIT_PRODUCT_PENDING;
}
export interface EditProductSuccess {
  type: ProductActionType.EDIT_PRODUCT_SUCCESS;
  payload: Product;
}
export interface EditProductFailure {
  type: ProductActionType.EDIT_PRODUCT_FAILURE;
}

//
export interface EditPropertyPending {
  type: ProductActionType.EDIT_PROPERTY_PENDING;
}
export interface EditPropertySuccess {
  type: ProductActionType.EDIT_PROPERTY_SUCCESS;
  payload: any;
}
export interface EditPropertyFailure {
  type: ProductActionType.EDIT_PROPERTY_FAILURE;
}

//
export interface DeleteProductPending {
  type: ProductActionType.DELETE_PRODUCT_PENDING;
}
export interface DeleteProductSuccess {
  type: ProductActionType.DELETE_PRODUCT_SUCCESS;
  payload: Product;
}
export interface DeleteProductFailure {
  type: ProductActionType.DELETE_PRODUCT_FAILURE;
}

export type ProductAction =
  | AddProductFailure
  | AddProductPending
  | AddProductSuccess
  | GetAllProductsFailure
  | GetAllProductsPending
  | GetAllProductsSuccess
  | GetProductByIdFailure
  | GetProductByIdPending
  | GetProductByIdSuccess
  | EditProductFailure
  | EditProductPending
  | EditProductSuccess
  | EditPropertyFailure
  | EditPropertyPending
  | EditPropertySuccess
  | DeleteProductFailure
  | DeleteProductPending
  | DeleteProductSuccess;

export type ProductThunkAction = ThunkAction<void, RootState, any, ProductAction>;

export interface GetAllProductsPayload {
  productName: string;
  categoryID: number;
}
export interface AddProductPayload {
  name?: string;
  description?: string;
  price?: number;
  categoryID?: number;
  properties: ProductProperties[];
}

export interface ProductProperties {
  color: Colors;
  size: Sizes;
  quantity: number;
  imagePath: string | FileWithPath[];
  propertyID: number;
}
