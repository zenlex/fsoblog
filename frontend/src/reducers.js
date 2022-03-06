import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [
    {
      title: 'TestBlog',
      author: 'TestAuthor',
      likes: 42,
      url: 'http://dontshowme.com',
      id: 42,
    },
  ],
  reducers: {
    getBlogs(state, action) {
      console.log('getBlogs action called', action);
    },
  },
});

export const blogReducer = blogSlice.reducer;
export const { getBlogs } = blogSlice.actions;

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log('userReducer called', action);
      return state;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setUser } = userSlice.actions;

const alertSlice = createSlice({
  name: 'alerts',
  initialState: null,
  reducers: {
    setAlert(state, action) {
      console.log('alertReducer called', action);
      return state;
    },
  },
});

export const alertReducer = alertSlice.reducer;
export const { setAlert } = alertSlice.actions;
