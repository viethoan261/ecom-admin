import { Reducer, combineReducers } from 'redux';
import productReducer from '../reducers/product/product.reducer';
import orderReducer from '../reducers/order/order.reducer';
import categoryReducer from '../reducers/category/category.reducer';
import userReducer from '../reducers/account/user.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  product: productReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const reducer: Reducer<RootState, any> = (state: RootState | undefined, action: any) => rootReducer(state, action);

export default reducer;
