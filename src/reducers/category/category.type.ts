import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/reducer';
import { Category } from '../../types/models/category';

export interface CategoryState {
  isFetching: boolean;
  categories: Category[];
}

export enum CategoryActionType {
  GET_ALL_CATEGORIES_PENDING = 'GET_ALL_CATEGORIES_PENDING',
  GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS',
  GET_ALL_CATEGORIES_FAILURE = 'GET_ALL_CATEGORIES_FAILURE',

  GET_CATEGORY_BY_ID_PENDING = 'GET_CATEGORY_BY_ID_PENDING',
  GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS',
  GET_CATEGORY_BY_ID_FAILURE = 'GET_CATEGORY_BY_ID_FAILURE',

  ADD_CATEGORY_PENDING = 'ADD_CATEGORY_PENDING',
  ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS',
  ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE',

  EDIT_CATEGORY_PENDING = 'EDIT_CATEGORY_PENDING',
  EDIT_CATEGORY_SUCCESS = 'EDIT_CATEGORY_SUCCESS',
  EDIT_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE',

  DELETE_CATEGORY_PENDING = 'DELETE_CATEGORY_PENDING',
  DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS',
  DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE',
}

//
export interface GetAllCategorysPending {
  type: CategoryActionType.GET_ALL_CATEGORIES_PENDING;
}
export interface GetAllCategorysSuccess {
  type: CategoryActionType.GET_ALL_CATEGORIES_SUCCESS;
  payload: Category[];
}
export interface GetAllCategorysFailure {
  type: CategoryActionType.GET_ALL_CATEGORIES_FAILURE;
}

//
export interface GetCategoryByIdPending {
  type: CategoryActionType.GET_CATEGORY_BY_ID_PENDING;
}
export interface GetCategoryByIdSuccess {
  type: CategoryActionType.GET_CATEGORY_BY_ID_SUCCESS;
  payload: Category;
}
export interface GetCategoryByIdFailure {
  type: CategoryActionType.GET_CATEGORY_BY_ID_FAILURE;
}

//
export interface AddCategoryPending {
  type: CategoryActionType.ADD_CATEGORY_PENDING;
}
export interface AddCategorySuccess {
  type: CategoryActionType.ADD_CATEGORY_SUCCESS;
  payload: Category;
}
export interface AddCategoryFailure {
  type: CategoryActionType.ADD_CATEGORY_FAILURE;
}

//
export interface EditCategoryPending {
  type: CategoryActionType.EDIT_CATEGORY_PENDING;
}
export interface EditCategorySuccess {
  type: CategoryActionType.EDIT_CATEGORY_SUCCESS;
  payload: Category;
}
export interface EditCategoryFailure {
  type: CategoryActionType.EDIT_CATEGORY_FAILURE;
}

//
export interface DeleteCategoryPending {
  type: CategoryActionType.DELETE_CATEGORY_PENDING;
}
export interface DeleteCategorySuccess {
  type: CategoryActionType.DELETE_CATEGORY_SUCCESS;
  payload: Category;
}
export interface DeleteCategoryFailure {
  type: CategoryActionType.DELETE_CATEGORY_FAILURE;
}

export type CategoryAction =
  | AddCategoryFailure
  | AddCategoryPending
  | AddCategorySuccess
  | GetAllCategorysFailure
  | GetAllCategorysPending
  | GetAllCategorysSuccess
  | GetCategoryByIdFailure
  | GetCategoryByIdPending
  | GetCategoryByIdSuccess
  | EditCategoryFailure
  | EditCategoryPending
  | EditCategorySuccess
  | DeleteCategoryFailure
  | DeleteCategoryPending
  | DeleteCategorySuccess;

export type CategoryThunkAction = ThunkAction<void, RootState, any, CategoryAction>;
