import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../services/postServices";
import toast from "react-hot-toast";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await PostService.getAllPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await PostService.createPost(post);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, post }, { rejectWithValue }) => {
    try {
      const response = await PostService.updatePost(id, post);
      if (response.data.message === "Unauthorized") {
        console.log(response.data.message);
        toast.error("Unauthorized: Please log in to update a post");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PostService.deletePost(id);
      console.log(response);
      if (
        response.statusText === "OK" &&
        response.data.message === "Post Deleted"
      ) {
        return response.data;
      }else if (response.data.message === "Unauthorized") {
        toast.error("You can't delete other people posts");
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
    message: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        if (action.payload.photo) {
          state.posts.push(action.payload);
        }
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload.message !== "Unauthorized") {
          state.posts = state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          );
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload.message === "Post Deleted") {
          state.posts = state.posts.filter(
            (post) => post._id !== action.payload.post._id
          );
        }
      });
  },
});

export default postsSlice.reducer;
