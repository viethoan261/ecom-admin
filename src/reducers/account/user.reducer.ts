import { Reducer } from 'redux';
import { UserState, UserAction, UserActionType } from './user.type';

const initialState: UserState = {
  isFetching: false,
  users: [],
};

const userReducer: Reducer<UserState, UserAction> = (state = initialState, action) => {
  switch (action.type) {
    case UserActionType.GET_ALL_USERS_PENDING:
    case UserActionType.GET_USER_BY_ID_PENDING:
    case UserActionType.EDIT_USER_PENDING:
    case UserActionType.DELETE_USER_PENDING:
    case UserActionType.FORGOT_PASSWORD_PENDING:
      return { ...state, isFetching: true };

    case UserActionType.GET_ALL_USERS_FAILURE:
    case UserActionType.GET_USER_BY_ID_FAILURE:
    case UserActionType.EDIT_USER_FAILURE:
    case UserActionType.DELETE_USER_FAILURE:
    case UserActionType.FORGOT_PASSWORD_FAILURE:
      return { ...state, isFetching: false };

    case UserActionType.GET_ALL_USERS_SUCCESS:
      return { ...state, isFetching: false, users: action.payload };
    case UserActionType.GET_USER_BY_ID_SUCCESS:
      return { ...state, isFetching: false };
    case UserActionType.EDIT_USER_SUCCESS:
      return { ...state, isFetching: false };
    case UserActionType.DELETE_USER_SUCCESS:
      return { ...state, isFetching: false };
    case UserActionType.FORGOT_PASSWORD_SUCCESS:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default userReducer;
