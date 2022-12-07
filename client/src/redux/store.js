import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartRedux';
import userSlice from './userRedux';

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: useReducer
  }
});
