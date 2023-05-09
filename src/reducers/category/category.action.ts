import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Category } from '../../types/models/category';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/notifications';
import { CategoryActionType, CategoryThunkAction } from './category.type';

const getAllCategories =
  (cb?: Callback): CategoryThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CategoryActionType.GET_ALL_CATEGORIES_PENDING });

    const api = API_URLS.CATEGORY.getAllCategories();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: CategoryActionType.GET_ALL_CATEGORIES_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: CategoryActionType.GET_ALL_CATEGORIES_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const addCategory =
  (payload: Partial<Category>, cb?: Callback): CategoryThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CategoryActionType.ADD_CATEGORY_PENDING });

    const api = API_URLS.CATEGORY.addCategory();
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: CategoryActionType.ADD_CATEGORY_SUCCESS,
      });
      renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: CategoryActionType.ADD_CATEGORY_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const toggleStatus =
  (payload: { id: number; type: StatusTypePayload }, cb?: Callback): CategoryThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CategoryActionType.DELETE_CATEGORY_PENDING });

    const api = API_URLS.CATEGORY.toggleStatus(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: CategoryActionType.DELETE_CATEGORY_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Thay đổi thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: CategoryActionType.DELETE_CATEGORY_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const editCategory =
  (payload: Partial<Category>, cb?: Callback): CategoryThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: CategoryActionType.EDIT_CATEGORY_PENDING });

    const api = API_URLS.CATEGORY.editCategory(payload.id ? payload.id : -1);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: CategoryActionType.EDIT_CATEGORY_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Sửa thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: CategoryActionType.EDIT_CATEGORY_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const categoryActions = { getAllCategories, addCategory, toggleStatus, editCategory };

export enum StatusTypePayload {
  active = 'ACTIVE',
  inactive = 'INACTIVE',
}
