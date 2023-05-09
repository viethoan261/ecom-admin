import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../redux/reducer';
import { User } from '../../types/models/user';

export interface UserState {
  isFetching: boolean;
  users: User[];
}

export enum UserActionType {
  GET_ALL_USERS_PENDING = 'GET_ALL_USERS_PENDING',
  GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS',
  GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE',

  GET_USER_BY_ID_PENDING = 'GET_USER_BY_ID_PENDING',
  GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS',
  GET_USER_BY_ID_FAILURE = 'GET_USER_BY_ID_FAILURE',

  EDIT_USER_PENDING = 'EDIT_USER_PENDING',
  EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
  EDIT_USER_FAILURE = 'ADD_USER_FAILURE',

  DELETE_USER_PENDING = 'DELETE_USER_PENDING',
  DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = 'DELETE_USER_FAILURE',

  RESET_PASSWORD_PENDING = 'RESET_PASSWORD_PENDING',
  RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE',

  FORGOT_PASSWORD_PENDING = 'FORGOT_PASSWORD_PENDING',
  FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE',
}

//
export interface GetAllUsersPending {
  type: UserActionType.GET_ALL_USERS_PENDING;
}
export interface GetAllUsersSuccess {
  type: UserActionType.GET_ALL_USERS_SUCCESS;
  payload: User[];
}
export interface GetAllUsersFailure {
  type: UserActionType.GET_ALL_USERS_FAILURE;
}

//
export interface GetUserByIdPending {
  type: UserActionType.GET_USER_BY_ID_PENDING;
}
export interface GetUserByIdSuccess {
  type: UserActionType.GET_USER_BY_ID_SUCCESS;
  payload: User;
}
export interface GetUserByIdFailure {
  type: UserActionType.GET_USER_BY_ID_FAILURE;
}

//
export interface EditUserPending {
  type: UserActionType.EDIT_USER_PENDING;
}
export interface EditUserSuccess {
  type: UserActionType.EDIT_USER_SUCCESS;
  payload: User;
}
export interface EditUserFailure {
  type: UserActionType.EDIT_USER_FAILURE;
}

//
export interface DeleteUserPending {
  type: UserActionType.DELETE_USER_PENDING;
}
export interface DeleteUserSuccess {
  type: UserActionType.DELETE_USER_SUCCESS;
  payload: User;
}
export interface DeleteUserFailure {
  type: UserActionType.DELETE_USER_FAILURE;
}

//
export interface ResetPasswordPending {
  type: UserActionType.DELETE_USER_PENDING;
}
export interface ResetPasswordSuccess {
  type: UserActionType.DELETE_USER_SUCCESS;
  payload: User;
}
export interface ResetPasswordFailure {
  type: UserActionType.DELETE_USER_FAILURE;
}

//
export interface ForgotPasswordPending {
  type: UserActionType.FORGOT_PASSWORD_PENDING;
}
export interface ForgotPasswordSuccess {
  type: UserActionType.FORGOT_PASSWORD_SUCCESS;
  payload: User;
}
export interface ForgotPasswordFailure {
  type: UserActionType.FORGOT_PASSWORD_FAILURE;
}

export type UserAction =
  | GetAllUsersFailure
  | GetAllUsersPending
  | GetAllUsersSuccess
  | GetUserByIdFailure
  | GetUserByIdPending
  | GetUserByIdSuccess
  | EditUserFailure
  | EditUserPending
  | EditUserSuccess
  | ResetPasswordFailure
  | ResetPasswordPending
  | ResetPasswordSuccess
  | ForgotPasswordFailure
  | ForgotPasswordPending
  | ForgotPasswordSuccess
  | DeleteUserFailure
  | DeleteUserPending
  | DeleteUserSuccess;

export type UserThunkAction = ThunkAction<void, RootState, any, UserAction>;

export interface ResetPasswordPayload {
  token: string;
  pass: string;
  confirmPass: string;
}
