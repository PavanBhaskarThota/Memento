import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/post.slice";
import userReducer from "./slices/user.slice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
});

export default store;
