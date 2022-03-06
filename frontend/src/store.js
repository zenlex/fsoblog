import { configureStore } from '@reduxjs/toolkit';
import { blogReducer, userReducer, alertReducer } from './reducers';

const initialState = {
  blogs: [],
  user: null,
  notification: null,
};

const store = configureStore({
  name: 'blogstore',
  initialState,
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    alerts: alertReducer,
  },
});

export default store;
