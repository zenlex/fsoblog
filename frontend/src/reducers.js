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
      user: {
        name: 'Testy Test',
      },
    },
  ],
  reducers: {
    getBlogs(state, action) {
      console.log('getBlogs action called', action);
      return state.sort(({ likes: a }, { likes: b }) => b - a);
    },
    setBlogs(state, action) {
      return action.payload.sort(({ likes: a }, { likes: b }) => b - a);
    },
  },
});

export const blogReducer = blogSlice.reducer;
export const { getBlogs, setBlogs } = blogSlice.actions;

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
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
      return action.payload;
    },
  },
});

export const alertReducer = alertSlice.reducer;
export const { setAlert } = alertSlice.actions;
