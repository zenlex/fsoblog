import { configureStore } from '@reduxjs/toolkit';
import {
  blogReducer,
  userReducer,
  alertReducer,
  usersInfoReducer,
  visibilityReducer,
} from './reducers';

const initialState = {
  blogs: [],
  user: null,
  notification: null,
  usersInfo: [],
  visibilities: {},
};

const store = configureStore({
  name: 'blogstore',
  initialState,
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    alert: alertReducer,
    usersInfo: usersInfoReducer,
    visibilities: visibilityReducer,
  },
});

export default store;
