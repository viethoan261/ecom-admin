import { Reducer } from 'redux';
import { CategoryState, CategoryAction, CategoryActionType } from './category.type';
import { CategoryStatus } from '../../types/models/category';

const initialState: CategoryState = {
  isFetching: false,
  categories: [],
};

const categoryReducer: Reducer<CategoryState, CategoryAction> = (state = initialState, action) => {
  switch (action.type) {
    case CategoryActionType.ADD_CATEGORY_PENDING:
    case CategoryActionType.GET_ALL_CATEGORIES_PENDING:
    case CategoryActionType.GET_CATEGORY_BY_ID_PENDING:
    case CategoryActionType.EDIT_CATEGORY_PENDING:
    case CategoryActionType.DELETE_CATEGORY_PENDING:
      return { ...state, isFetching: true };

    case CategoryActionType.ADD_CATEGORY_FAILURE:
    case CategoryActionType.GET_ALL_CATEGORIES_FAILURE:
    case CategoryActionType.GET_CATEGORY_BY_ID_FAILURE:
    case CategoryActionType.EDIT_CATEGORY_FAILURE:
    case CategoryActionType.DELETE_CATEGORY_FAILURE:
      return { ...state, isFetching: false };

    case CategoryActionType.ADD_CATEGORY_SUCCESS:
      return { ...state, isFetching: false };
    case CategoryActionType.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    case CategoryActionType.GET_CATEGORY_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    case CategoryActionType.EDIT_CATEGORY_SUCCESS:
      return { ...state, isFetching: false };
    case CategoryActionType.DELETE_CATEGORY_SUCCESS:
      return { ...state, isFetching: false };

    default:
      return state;
  }
};

export default categoryReducer;
