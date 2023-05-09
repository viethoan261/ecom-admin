import { Reducer } from "redux";
import { OrderState, OrderAction, OrderActionType } from "./order.type";

const initialState: OrderState = {
  isFetching: false,
  orders: [],
};

const orderReducer: Reducer<OrderState, OrderAction> = (state = initialState, action) => {
  switch (action.type) {
    case OrderActionType.ADD_ORDER_PENDING:
    case OrderActionType.GET_ALL_ORDERS_PENDING:
    case OrderActionType.GET_ORDER_BY_ID_PENDING:
    case OrderActionType.EDIT_ORDER_PENDING:
    case OrderActionType.DELETE_ORDER_PENDING:
      return { ...state, isFetching: true };

    case OrderActionType.ADD_ORDER_FAILURE:
    case OrderActionType.GET_ALL_ORDERS_FAILURE:
    case OrderActionType.GET_ORDER_BY_ID_FAILURE:
    case OrderActionType.EDIT_ORDER_FAILURE:
    case OrderActionType.DELETE_ORDER_FAILURE:
      return { ...state, isFetching: false };

    case OrderActionType.ADD_ORDER_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.GET_ALL_ORDERS_SUCCESS:
      return { ...state, isFetching: false, orders: action.payload };
    case OrderActionType.GET_ORDER_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.EDIT_ORDER_SUCCESS:
      return { ...state, isFetching: false };
    case OrderActionType.DELETE_ORDER_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default orderReducer;
