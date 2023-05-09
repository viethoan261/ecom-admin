import { User } from '../../types/models/user';

export enum AuthAction {
  LOGIN_PENDING = 'LOGIN_PENDING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILURE = 'LOGIN_FAILURE',

  SIGNUP_PENDING = 'SIGNUP_PENDING',
  SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE = 'SIGNUP_FAILURE',

  ACTIVE_USER_PENDING = 'ACTIVE_USER_PENDING',
  ACTIVE_USER_SUCCESS = 'ACTIVE_USER_SUCCESS',
  ACTIVE_USER_FAILURE = 'ACTIVE_USER_FAILURE',

  GET_CURRENT_PROFILE_PENDING = 'GET_CURRENT_PROFILE_PENDING',
  GET_CURRENT_PROFILE_SUCCESS = 'GET_CURRENT_PROFILE_SUCCESS',
  GET_CURRENT_PROFILE_FAILURE = 'GET_CURRENT_PROFILE_FAILURE',
}

interface LoginPending {
  type: AuthAction.LOGIN_PENDING;
}

interface LoginSuccess {
  type: AuthAction.LOGIN_SUCCESS;
  payload: any;
}

interface LoginFailure {
  type: AuthAction.LOGIN_FAILURE;
}

interface SignUpPending {
  type: AuthAction.SIGNUP_PENDING;
}

interface SignUpSuccess {
  type: AuthAction.SIGNUP_SUCCESS;
  payload: User;
}

interface SignUpFailure {
  type: AuthAction.SIGNUP_FAILURE;
}

interface ActiveUserPending {
  type: AuthAction.ACTIVE_USER_PENDING;
}
interface ActiveUserSuccess {
  type: AuthAction.ACTIVE_USER_SUCCESS;
  payload: User;
}
interface ActiveUserFailure {
  type: AuthAction.ACTIVE_USER_FAILURE;
}

//
interface GetCurrentProfilePending {
  type: AuthAction.GET_CURRENT_PROFILE_PENDING;
}

interface GetCurrentProfileSuccess {
  type: AuthAction.GET_CURRENT_PROFILE_SUCCESS;
  payload: User;
}
interface GetCurrentProfileFailure {
  type: AuthAction.GET_CURRENT_PROFILE_FAILURE;
}

export type AuthActionType =
  | LoginPending
  | LoginSuccess
  | LoginFailure
  | SignUpPending
  | SignUpSuccess
  | SignUpFailure
  | ActiveUserFailure
  | ActiveUserPending
  | ActiveUserSuccess
  | GetCurrentProfileFailure
  | GetCurrentProfilePending
  | GetCurrentProfileSuccess;
