import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Product } from '../../types/models/product';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/notifications';
import { StatusTypePayload } from '../category/category.action';
import { AddProductPayload, GetAllProductsPayload, ProductActionType, ProductThunkAction } from './product.type';

const addProduct =
  (payload: AddProductPayload, cb?: Callback): ProductThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: ProductActionType.ADD_PRODUCT_PENDING });

    const api = API_URLS.PRODUCT.addProduct();
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: ProductActionType.ADD_PRODUCT_SUCCESS,
      });
      renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
      cb?.onSuccess?.();
    } else {
      dispatch({ type: ProductActionType.ADD_PRODUCT_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const getAllProducts =
  (payload?: GetAllProductsPayload, cb?: Callback): ProductThunkAction =>
  async (dispatch: AppDispatch) => {
    const finalPayload: GetAllProductsPayload = payload ?? { categoryID: -1, productName: '' };
    dispatch({ type: ProductActionType.GET_ALL_PRODUCTS_PENDING });

    const api = API_URLS.PRODUCT.getAllProducts();

    const { response, error } = await useCallApi({ ...api, payload: finalPayload });

    if (!error && response?.status === 200) {
      dispatch({
        type: ProductActionType.GET_ALL_PRODUCTS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: ProductActionType.GET_ALL_PRODUCTS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const toggleStatus =
  (payload: { id: number; type: StatusTypePayload }, cb?: Callback): ProductThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: ProductActionType.DELETE_PRODUCT_PENDING });

    const api = API_URLS.PRODUCT.toggleStatus(payload);

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      dispatch({
        type: ProductActionType.DELETE_PRODUCT_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Thay đổi thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: ProductActionType.DELETE_PRODUCT_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const editProduct =
  (payload: Partial<Product>, cb?: Callback): ProductThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: ProductActionType.EDIT_PRODUCT_PENDING });

    const { categoryID, name, id, price, properties, description } = payload;

    const api = API_URLS.PRODUCT.editProduct(id ? id : -1);

    const { response, error } = await useCallApi({
      ...api,
      payload: { name, description, price, categoryID, properties },
    });

    if (!error && response?.status === 200) {
      dispatch({
        type: ProductActionType.EDIT_PRODUCT_SUCCESS,
        payload: response.data,
      });
      renderNotification('Thông báo', 'Sửa thành công!', notiType.SUCCESS);
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: ProductActionType.EDIT_PRODUCT_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const deleteProperty =
  (propertyId: number, cb?: Callback): ProductThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: ProductActionType.EDIT_PROPERTY_PENDING });

    const api = API_URLS.PRODUCT.deleteProperty(propertyId);

    const { response, error } = await useCallApi({ ...api, payload: propertyId });

    if (!error && response?.status === 200) {
      dispatch({
        type: ProductActionType.EDIT_PROPERTY_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: ProductActionType.EDIT_PROPERTY_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const productActions = { addProduct, getAllProducts, toggleStatus, editProduct, deleteProperty };
