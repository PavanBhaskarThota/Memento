import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../services/postServices";
import toast from "react-hot-toast";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async ({ page, forceRefresh = false }, { getState, rejectWithValue }) => {
    const state = getState().posts;
    if (state.fetchedPages.includes(page) && !forceRefresh) {
      return [];
    }

    try {
      const response = await PostService.getAllPosts(page);
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
      if (
        response.statusText === "OK" &&
        response.data.message === "Post Deleted"
      ) {
        return response.data;
      } else if (response.data.message === "Unauthorized") {
        toast.error("You can't delete other people posts");
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PostService.likePost(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await PostService.getPostById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await PostService.updateComment(
        id,
        JSON.stringify(data)
      );
      return response.data;
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
    singlePostData: null,
    hasMore: true,
    page: 1,
    fetchedPages: [],
  },
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    resetPosts(state) {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        const { page } = action.meta;
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.posts = [...state.posts, ...action.payload];
          state.fetchedPages.push(page);
        }
        state.status = "succeeded";
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        if (action.payload) {
          state.posts.unshift(action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (action.payload.message !== "Unauthorized") {
          state.posts = state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          );
        }
        state.status = "succeeded";
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (action.payload.message === "Post Deleted") {
          state.posts = state.posts.filter(
            (post) => post._id !== action.payload.post._id
          );
        }
        state.status = "succeeded";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        if (action.payload.message !== "Unauthorized") {
          state.posts = state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
          );
          state.singlePostData = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        if (action.payload.message !== "Unauthorized") {
          state.singlePostData = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        if (action.payload.message !== "Unauthorized") {
          state.singlePostData = action.payload;
        }
        state.status = "succeeded";
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { incrementPage, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
