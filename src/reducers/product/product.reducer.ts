import { Reducer } from 'redux';
import { ProductState, ProductAction, ProductActionType } from './product.type';

const initialState: ProductState = {
  isFetching: false,
  products: [],
};

const productReducer: Reducer<ProductState, ProductAction> = (state = initialState, action) => {
  switch (action.type) {
    case ProductActionType.ADD_PRODUCT_PENDING:
    case ProductActionType.GET_ALL_PRODUCTS_PENDING:
    case ProductActionType.GET_PRODUCT_BY_ID_PENDING:
    case ProductActionType.EDIT_PRODUCT_PENDING:
    case ProductActionType.EDIT_PROPERTY_PENDING:
    case ProductActionType.DELETE_PRODUCT_PENDING:
      return { ...state, isFetching: true };

    case ProductActionType.ADD_PRODUCT_FAILURE:
    case ProductActionType.GET_ALL_PRODUCTS_FAILURE:
    case ProductActionType.GET_PRODUCT_BY_ID_FAILURE:
    case ProductActionType.EDIT_PRODUCT_FAILURE:
    case ProductActionType.EDIT_PROPERTY_FAILURE:
    case ProductActionType.DELETE_PRODUCT_FAILURE:
      return { ...state, isFetching: false };

    case ProductActionType.ADD_PRODUCT_SUCCESS:
      return { ...state, isFetching: false };
    case ProductActionType.GET_ALL_PRODUCTS_SUCCESS:
      return { ...state, isFetching: false, products: action.payload };
    case ProductActionType.GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    case ProductActionType.EDIT_PRODUCT_SUCCESS:
      return { ...state, isFetching: false };
    case ProductActionType.EDIT_PROPERTY_SUCCESS:
      return { ...state, isFetching: false };
    case ProductActionType.DELETE_PRODUCT_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default productReducer;
