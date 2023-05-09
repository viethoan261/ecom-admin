import { StatusTypePayload } from '../../reducers/category/category.action';
import { GetAllProductsPayload } from '../../reducers/product/product.type';
import { OrderStatus } from '../../types/models/order';

export const HEADERS = {
  header: () => ({
    accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  }),
  fileHeader: () => ({
    'Content-Type': 'multipart/form-data',
  }),
  authHeader: () => ({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `${localStorage.getItem('token')}`,
  }),
};

export const API_URLS = {
  AUTH: {
    login: () => ({
      endPoint: 'Users/Login',
      method: 'POST',
      headers: HEADERS.header(),
    }),
    activeUser: (payload: string) => ({
      endPoint: `Users/Active?email=${payload}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    signUp: () => ({
      endPoint: `Users/Signup`,
      method: 'POST',
      headers: HEADERS.header(),
    }),
    getCurrentProfile: () => ({
      endPoint: 'Users/Profile',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
  },
  CATEGORY: {
    getAllCategories: () => ({
      endPoint: 'Categories',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    addCategory: () => ({
      endPoint: `Categories`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    toggleStatus: ({ id, type }: { id: number; type: StatusTypePayload }) => ({
      endPoint: `Categories/${id}?type=${type}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    editCategory: (id: number) => ({
      endPoint: `Categories/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
  },
  PRODUCT: {
    getAllProducts: () => ({
      endPoint: 'Products/search',
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    addProduct: () => ({
      endPoint: `Products`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    editProduct: (id: number) => ({
      endPoint: `Products/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    deleteProperty: (propertyId: number) => ({
      endPoint: `Products/${propertyId}/property`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    getProductById: (id: number) => ({
      endPoint: `Products/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    toggleStatus: ({ id, type }: { id: number; type: StatusTypePayload }) => ({
      endPoint: `Products/${id}?type=${type}`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
  },
  USER: {
    getAllUsers: () => ({
      endPoint: 'Users',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    getUserById: (id: number) => ({
      endPoint: `Users/${id}`,
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    editProfile: () => ({
      endPoint: `Users/Profile`,
      method: 'POST',
      headers: HEADERS.authHeader(),
    }),
    editUser: (id: string | number) => ({
      endPoint: `Users/${id}/edit`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
    resetPassword: (token: string, pass: string, confirmPass: string) => ({
      endPoint: `Users/ResetPassword?token=${token}&pass=${pass}&confirmPass=${confirmPass}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
    forgotPassword: (email: string) => ({
      endPoint: `Users/ForgotPassword?email=${email}`,
      method: 'GET',
      headers: HEADERS.header(),
    }),
  },
  ORDER: {
    getAllOrders: () => ({
      endPoint: 'Orders',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    changeOrderStatus: (id: string | number, status: OrderStatus) => ({
      endPoint: `Orders/${id}/status?status=${status}`,
      method: 'PUT',
      headers: HEADERS.authHeader(),
    }),
  },
  STATISTICS: {
    users: () => ({
      endPoint: 'Statistics/users',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    products: () => ({
      endPoint: 'Statistics/products',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    orders: () => ({
      endPoint: 'Statistics/orders',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
    turnover: () => ({
      endPoint: 'Statistics/turnover',
      method: 'GET',
      headers: HEADERS.authHeader(),
    }),
  },
};
