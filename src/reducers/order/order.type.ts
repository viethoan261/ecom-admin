import { ThunkAction } from "redux-thunk";
import { RootState } from "../../redux/reducer";
import { Order } from "../../types/models/order";

export interface OrderState {
  isFetching: boolean;
  orders: Order[];
}

export enum OrderActionType {
  GET_ALL_ORDERS_PENDING = "GET_ALL_ORDERS_PENDING",
  GET_ALL_ORDERS_SUCCESS = "GET_ALL_ORDERS_SUCCESS",
  GET_ALL_ORDERS_FAILURE = "GET_ALL_ORDERS_FAILURE",

  GET_ORDER_BY_ID_PENDING = "GET_ORDER_BY_ID_PENDING",
  GET_ORDER_BY_ID_SUCCESS = "GET_ORDER_BY_ID_SUCCESS",
  GET_ORDER_BY_ID_FAILURE = "GET_ORDER_BY_ID_FAILURE",

  ADD_ORDER_PENDING = "ADD_ORDER_PENDING",
  ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS",
  ADD_ORDER_FAILURE = "ADD_ORDER_FAILURE",

  EDIT_ORDER_PENDING = "EDIT_ORDER_PENDING",
  EDIT_ORDER_SUCCESS = "EDIT_ORDER_SUCCESS",
  EDIT_ORDER_FAILURE = "ADD_ORDER_FAILURE",

  DELETE_ORDER_PENDING = "DELETE_ORDER_PENDING",
  DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS",
  DELETE_ORDER_FAILURE = "DELETE_ORDER_FAILURE",
}

//
export interface GetAllOrdersPending {
  type: OrderActionType.GET_ALL_ORDERS_PENDING;
}
export interface GetAllOrdersSuccess {
  type: OrderActionType.GET_ALL_ORDERS_SUCCESS;
  payload: Order[];
}
export interface GetAllOrdersFailure {
  type: OrderActionType.GET_ALL_ORDERS_FAILURE;
}

//
export interface GetOrderByIdPending {
  type: OrderActionType.GET_ORDER_BY_ID_PENDING;
}
export interface GetOrderByIdSuccess {
  type: OrderActionType.GET_ORDER_BY_ID_SUCCESS;
  payload: Order;
}
export interface GetOrderByIdFailure {
  type: OrderActionType.GET_ORDER_BY_ID_FAILURE;
}

//
export interface AddOrderPending {
  type: OrderActionType.ADD_ORDER_PENDING;
}
export interface AddOrderSuccess {
  type: OrderActionType.ADD_ORDER_SUCCESS;
  payload: Order;
}
export interface AddOrderFailure {
  type: OrderActionType.ADD_ORDER_FAILURE;
}

//
export interface EditOrderPending {
  type: OrderActionType.EDIT_ORDER_PENDING;
}
export interface EditOrderSuccess {
  type: OrderActionType.EDIT_ORDER_SUCCESS;
  payload: Order;
}
export interface EditOrderFailure {
  type: OrderActionType.EDIT_ORDER_FAILURE;
}

//
export interface DeleteOrderPending {
  type: OrderActionType.DELETE_ORDER_PENDING;
}
export interface DeleteOrderSuccess {
  type: OrderActionType.DELETE_ORDER_SUCCESS;
  payload: Order;
}
export interface DeleteOrderFailure {
  type: OrderActionType.DELETE_ORDER_FAILURE;
}

export type OrderAction =
  | AddOrderFailure
  | AddOrderPending
  | AddOrderSuccess
  | GetAllOrdersFailure
  | GetAllOrdersPending
  | GetAllOrdersSuccess
  | GetOrderByIdFailure
  | GetOrderByIdPending
  | GetOrderByIdSuccess
  | EditOrderFailure
  | EditOrderPending
  | EditOrderSuccess
  | DeleteOrderFailure
  | DeleteOrderPending
  | DeleteOrderSuccess;

export type OrderThunkAction = ThunkAction<void, RootState, any, OrderAction>;
