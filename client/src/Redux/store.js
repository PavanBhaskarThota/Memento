import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/post.slice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;
