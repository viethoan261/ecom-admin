import {
  OrdersStatistics,
  ProductsStatistics,
  TurnOverStatistics,
  UsersStatistics,
} from '../../types/helpers/statistics';

export enum StatisticsAction {
  GET_USER_STATISTICS_PENDING = 'GET_USER_STATISTICS_PENDING',
  GET_USER_STATISTICS_SUCCESS = 'GET_USER_STATISTICS_SUCCESS',
  GET_USER_STATISTICS_FAILURE = 'GET_USER_STATISTICS_FAILURE',

  GET_PRODUCT_STATISTICS_PENDING = 'GET_PRODUCT_STATISTICS_PENDING',
  GET_PRODUCT_STATISTICS_SUCCESS = 'GET_PRODUCT_STATISTICS_SUCCESS',
  GET_PRODUCT_STATISTICS_FAILURE = 'GET_PRODUCT_STATISTICS_FAILURE',

  GET_ORDER_STATISTICS_PENDING = 'GET_ORDER_STATISTICS_PENDING',
  GET_ORDER_STATISTICS_SUCCESS = 'GET_ORDER_STATISTICS_SUCCESS',
  GET_ORDER_STATISTICS_FAILURE = 'GET_ORDER_STATISTICS_FAILURE',

  GET_TURNOVER_STATISTICS_PENDING = 'GET_TURNOVER_STATISTICS_PENDING',
  GET_TURNOVER_STATISTICS_SUCCESS = 'GET_TURNOVER_STATISTICS_SUCCESS',
  GET_TURNOVER_STATISTICS_FAILURE = 'GET_TURNOVER_STATISTICS_FAILURE',
}

interface GetUsersStatisticsPending {
  type: StatisticsAction.GET_USER_STATISTICS_PENDING;
}

interface GetUsersStatisticsSuccess {
  type: StatisticsAction.GET_USER_STATISTICS_SUCCESS;
  payload: UsersStatistics;
}

interface GetUsersStatisticsFailure {
  type: StatisticsAction.GET_USER_STATISTICS_FAILURE;
}

interface GetProductsStatisticsPending {
  type: StatisticsAction.GET_PRODUCT_STATISTICS_PENDING;
}

interface GetProductsStatisticsSuccess {
  type: StatisticsAction.GET_PRODUCT_STATISTICS_SUCCESS;
  payload: ProductsStatistics;
}

interface GetProductsStatisticsFailure {
  type: StatisticsAction.GET_PRODUCT_STATISTICS_FAILURE;
}

interface GetOrdersStatisticsPending {
  type: StatisticsAction.GET_ORDER_STATISTICS_PENDING;
}

interface GetOrdersStatisticsSuccess {
  type: StatisticsAction.GET_ORDER_STATISTICS_SUCCESS;
  payload: OrdersStatistics[];
}

interface GetOrdersStatisticsFailure {
  type: StatisticsAction.GET_ORDER_STATISTICS_FAILURE;
}

interface GetTurnOverStatisticsPending {
  type: StatisticsAction.GET_TURNOVER_STATISTICS_PENDING;
}

interface GetTurnOverStatisticsSuccess {
  type: StatisticsAction.GET_TURNOVER_STATISTICS_SUCCESS;
  payload: TurnOverStatistics[];
}

interface GetTurnOverStatisticsFailure {
  type: StatisticsAction.GET_TURNOVER_STATISTICS_FAILURE;
}

export type StatisticsActionType =
  | GetUsersStatisticsPending
  | GetUsersStatisticsFailure
  | GetUsersStatisticsSuccess
  | GetProductsStatisticsPending
  | GetProductsStatisticsFailure
  | GetProductsStatisticsSuccess
  | GetTurnOverStatisticsPending
  | GetTurnOverStatisticsFailure
  | GetTurnOverStatisticsSuccess
  | GetOrdersStatisticsPending
  | GetOrdersStatisticsFailure
  | GetOrdersStatisticsSuccess;
