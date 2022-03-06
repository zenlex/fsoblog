import { configureStore } from '@reduxjs/toolkit';
import { blogReducer, userReducer, alertReducer } from './reducers';

const initialState = {
  blogs: [
    {
      title: 'TestBlog',
      author: 'TestAuthor',
      likes: 42,
      url: 'http://dontshowme.com',
    },
  ],
  user: null,
  notification: null,
};

const store = configureStore({
  name: 'blogstore',
  initialState,
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    alert: alertReducer,
  },
});

export default store;
