import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { OrderStatus } from '../../types/models/order';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/notifications';
import { OrderActionType, OrderThunkAction } from './order.type';

const getAllOrders =
  (cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.GET_ALL_ORDERS_PENDING });

    const api = API_URLS.ORDER.getAllOrders();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.GET_ALL_ORDERS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.GET_ALL_ORDERS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

const changeOrderStatus =
  (id: number | string, status: OrderStatus, cb?: Callback): OrderThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: OrderActionType.EDIT_ORDER_PENDING });

    const api = API_URLS.ORDER.changeOrderStatus(id, status);

    const { response, error } = await useCallApi({ ...api, payload: { id, status } });

    if (!error && response?.status === 200) {
      dispatch({
        type: OrderActionType.EDIT_ORDER_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: OrderActionType.EDIT_ORDER_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const orderActions = { getAllOrders, changeOrderStatus };
