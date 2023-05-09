import React, { createContext, useReducer } from 'react';
import { AuthAction, AuthActionType } from '../AuthContext/actions';
import { Callback } from '../../types/helpers/callback';
import { API_URLS } from '../../config/constants/api';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/notifications';
import { setToken } from '../../utils/token';
import { User } from '../../types/models/user';

export interface LoginValues {
  userName: string;
  password: string;
}

const initialState = {
  isFetching: false,
  user: null as User | null,
};

type AuthState = typeof initialState;

function authReducer(state = initialState, action: AuthActionType): AuthState {
  switch (action.type) {
    case AuthAction.LOGIN_PENDING:
    case AuthAction.SIGNUP_PENDING:
    case AuthAction.ACTIVE_USER_PENDING:
    case AuthAction.GET_CURRENT_PROFILE_PENDING:
      return { ...state, isFetching: true };

    case AuthAction.LOGIN_FAILURE:
    case AuthAction.SIGNUP_FAILURE:
    case AuthAction.ACTIVE_USER_FAILURE:
    case AuthAction.GET_CURRENT_PROFILE_FAILURE:
      return { ...state, isFetching: false };

    case AuthAction.LOGIN_SUCCESS:
      return { ...state, isFetching: false };
    case AuthAction.SIGNUP_SUCCESS:
      return { ...state, isFetching: false };
    case AuthAction.ACTIVE_USER_SUCCESS:
      return { ...state, isFetching: false };
    case AuthAction.GET_CURRENT_PROFILE_SUCCESS:
      return { ...state, isFetching: false, user: action.payload };

    default:
      return state;
  }
}

function useAuthReducer(_state = initialState) {
  const [state, dispatch] = useReducer(authReducer, _state);

  const login = async (payload: LoginValues, cb?: Callback) => {
    dispatch({ type: AuthAction.LOGIN_PENDING });

    const api = API_URLS.AUTH.login();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.LOGIN_SUCCESS,
        payload: response.data,
      });
      setToken(response.data);
      renderNotification('Thông báo', 'Đăng nhập thành công', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.LOGIN_FAILURE });
      renderNotification('Thông báo', 'Đăng nhập thất bại', notiType.ERROR);
      cb?.onError?.();
    }
  };

  const signup = async (payload: Partial<User>, cb?: Callback) => {
    dispatch({ type: AuthAction.SIGNUP_PENDING });

    const api = API_URLS.AUTH.signUp();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.SIGNUP_SUCCESS,
        payload: response.data,
      });
      renderNotification(
        'Thông báo',
        'Đăng ký thành công, vui lòng đến email được đăng ký để xác nhận tài khoản',
        notiType.SUCCESS
      );
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.SIGNUP_FAILURE });
      renderNotification('Thông báo', 'Đăng ký thất bại', notiType.ERROR);
      cb?.onError?.();
    }
  };

  const active = async (email: string, cb?: Callback) => {
    dispatch({ type: AuthAction.SIGNUP_PENDING });

    const api = API_URLS.AUTH.activeUser(email);

    const { response, error } = await useCallApi({ ...api, payload: email });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.SIGNUP_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.();
    } else {
      dispatch({ type: AuthAction.SIGNUP_FAILURE });
      renderNotification('Thông báo', 'Kích hoạt tài khoản thất bại', notiType.ERROR);
      cb?.onError?.();
    }
  };

  const getCurrentProfile = async (cb?: Callback) => {
    dispatch({ type: AuthAction.GET_CURRENT_PROFILE_PENDING });

    const api = API_URLS.AUTH.getCurrentProfile();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: AuthAction.GET_CURRENT_PROFILE_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: AuthAction.GET_CURRENT_PROFILE_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

  return { state, login, signup, active, getCurrentProfile };
}

export const AuthContext = createContext<ReturnType<typeof useAuthReducer>>({
  state: initialState,
  login: async () => {},
  signup: async () => {},
  active: async () => {},
  getCurrentProfile: async () => {},
});

interface Props {
  children: React.ReactNode | string;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const authReducer = useAuthReducer();

  return <AuthContext.Provider value={authReducer}>{children}</AuthContext.Provider>;
};
