import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Product-list/product-list-slice'
export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
