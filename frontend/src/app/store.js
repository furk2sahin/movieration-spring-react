import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux_slices/authSlice';
import loadingReducer from '../redux_slices/loadingSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  }
});