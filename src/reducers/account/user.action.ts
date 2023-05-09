import { NavigateFunction } from 'react-router-dom';
import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { User } from '../../types/models/user';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/notifications';
import { ResetPasswordPayload, UserActionType, UserThunkAction } from './user.type';
import ROUTER from '../../config/router';

const getAllUsers =
  (cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.GET_ALL_USERS_PENDING });

    const api = API_URLS.USER.getAllUsers();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.GET_ALL_USERS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: UserActionType.GET_ALL_USERS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getProfileById =
  (id: number, cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.GET_USER_BY_ID_PENDING });

    const api = API_URLS.USER.getUserById(id);

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.GET_ALL_USERS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: UserActionType.GET_ALL_USERS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const editUser =
  (payload: Partial<User>, cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.EDIT_USER_PENDING });

    const api = API_URLS.USER.editUser(payload.id ?? -1);
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.EDIT_USER_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: UserActionType.EDIT_USER_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const resetPassword =
  (payload: ResetPasswordPayload, navigate: NavigateFunction): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.RESET_PASSWORD_PENDING });

    const api = API_URLS.USER.resetPassword(payload.token, payload.pass, payload.confirmPass);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.RESET_PASSWORD_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Khôi phục mật khẩu thành công', notiType.SUCCESS);
      navigate(ROUTER.AUTH.LOGIN);
    } else {
      dispatch({ type: UserActionType.RESET_PASSWORD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const forgotPassword =
  (email: string, cb?: Callback): UserThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionType.FORGOT_PASSWORD_PENDING });

    const api = API_URLS.USER.forgotPassword(email);

    const { response, error } = await useCallApi({ ...api, payload: email });

    if (!error && response?.status === 200) {
      dispatch({
        type: UserActionType.FORGOT_PASSWORD_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Hãy kiểm tra email của bạn để lấy lại mật khẩu!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: UserActionType.FORGOT_PASSWORD_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const userActions = { getAllUsers, getProfileById, editUser, resetPassword, forgotPassword };
