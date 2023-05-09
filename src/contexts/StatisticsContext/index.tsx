import { createContext, useReducer } from 'react';
import {
  OrdersStatistics,
  ProductsStatistics,
  TurnOverStatistics,
  UsersStatistics,
} from '../../types/helpers/statistics';
import { StatisticsAction, StatisticsActionType } from './actions';
import { API_URLS } from '../../config/constants/api';
import { useCallApi } from '../../utils/api';
import { Callback } from '../../types/helpers/callback';
import { notiType, renderNotification } from '../../utils/notifications';

interface StatisticsState {
  isFetching: boolean;
  usersStatistics?: UsersStatistics;
  productsStatistics?: ProductsStatistics;
  ordersStatistics?: OrdersStatistics[];
  turnoverStatistics?: TurnOverStatistics[];
}

const initialState: StatisticsState = {
  isFetching: false,
  usersStatistics: undefined,
  ordersStatistics: undefined,
  productsStatistics: undefined,
};

function statisticsReducer(state = initialState, action: StatisticsActionType): StatisticsState {
  switch (action.type) {
    case StatisticsAction.GET_ORDER_STATISTICS_PENDING:
    case StatisticsAction.GET_PRODUCT_STATISTICS_PENDING:
    case StatisticsAction.GET_USER_STATISTICS_PENDING:
    case StatisticsAction.GET_TURNOVER_STATISTICS_PENDING:
      return { ...state, isFetching: true };
    case StatisticsAction.GET_ORDER_STATISTICS_FAILURE:
    case StatisticsAction.GET_PRODUCT_STATISTICS_FAILURE:
    case StatisticsAction.GET_USER_STATISTICS_FAILURE:
    case StatisticsAction.GET_TURNOVER_STATISTICS_FAILURE:
      return { ...state, isFetching: false };
    case StatisticsAction.GET_USER_STATISTICS_SUCCESS:
      return { ...state, isFetching: false, usersStatistics: action.payload };
    case StatisticsAction.GET_PRODUCT_STATISTICS_SUCCESS:
      return { ...state, isFetching: false, productsStatistics: action.payload };
    case StatisticsAction.GET_ORDER_STATISTICS_SUCCESS:
      return { ...state, isFetching: false, ordersStatistics: action.payload };
    case StatisticsAction.GET_TURNOVER_STATISTICS_SUCCESS:
      return { ...state, isFetching: false, turnoverStatistics: action.payload };
    default:
      return state;
  }
}

function useStatisticsReducer(_state = initialState) {
  const [state, dispatch] = useReducer(statisticsReducer, _state);

  const getUsersStatistics = async (cb?: Callback) => {
    dispatch({ type: StatisticsAction.GET_USER_STATISTICS_PENDING });

    const api = API_URLS.STATISTICS.users();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: StatisticsAction.GET_USER_STATISTICS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.();
    } else {
      dispatch({ type: StatisticsAction.GET_USER_STATISTICS_FAILURE });
      renderNotification('Thông báo', 'Lấy dữ liệu thất bại', notiType.ERROR);
      cb?.onError?.();
    }
  };

  const getProductsStatistics = async (cb?: Callback) => {
    dispatch({ type: StatisticsAction.GET_PRODUCT_STATISTICS_PENDING });

    const api = API_URLS.STATISTICS.products();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: StatisticsAction.GET_PRODUCT_STATISTICS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.();
    } else {
      dispatch({ type: StatisticsAction.GET_USER_STATISTICS_FAILURE });
      renderNotification('Thông báo', 'Lấy dữ liệu thất bại', notiType.ERROR);
      cb?.onError?.();
    }
  };

  const getOrdersStatistics = async (cb?: Callback) => {
    dispatch({ type: StatisticsAction.GET_ORDER_STATISTICS_PENDING });

    const api = API_URLS.STATISTICS.orders();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: StatisticsAction.GET_ORDER_STATISTICS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.();
    } else {
      dispatch({ type: StatisticsAction.GET_ORDER_STATISTICS_FAILURE });
      renderNotification('Thông báo', 'Lấy dữ liệu thất bại', notiType.ERROR);
      cb?.onError?.();
    }
  };

  const getTurnOverStatistics = async (cb?: Callback) => {
    dispatch({ type: StatisticsAction.GET_TURNOVER_STATISTICS_PENDING });

    const api = API_URLS.STATISTICS.turnover();

    const { response, error } = await useCallApi({ ...api });

    if (!error && response?.status === 200) {
      dispatch({
        type: StatisticsAction.GET_TURNOVER_STATISTICS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.();
    } else {
      dispatch({ type: StatisticsAction.GET_TURNOVER_STATISTICS_FAILURE });
      renderNotification('Thông báo', 'Lấy dữ liệu thất bại', notiType.ERROR);
      cb?.onError?.();
    }
  };

  return { state, getOrdersStatistics, getProductsStatistics, getUsersStatistics, getTurnOverStatistics };
}

export const StatisticsContext = createContext<ReturnType<typeof useStatisticsReducer>>({
  state: initialState,
  getOrdersStatistics: async () => {},
  getProductsStatistics: async () => {},
  getUsersStatistics: async () => {},
  getTurnOverStatistics: async () => {},
});

interface Props {
  children: React.ReactNode | string;
}

export const StatisticsProvider: React.FC<Props> = ({ children }) => {
  const statisticsReducer = useStatisticsReducer();

  return <StatisticsContext.Provider value={statisticsReducer}>{children}</StatisticsContext.Provider>;
};
