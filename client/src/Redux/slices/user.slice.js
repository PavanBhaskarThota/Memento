import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "../../services/authServices";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authServices.createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authServices.loginUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const isUserNameTaken = createAsyncThunk(
  "users/isUserNameTaken",
  async (name, { rejectWithValue }) => {
    try {
      const response = await authServices.isUserNameTaken(name);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (id, { rejectWithValue }) => {
    try {
      const response = await authServices.getUserData(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userNameTaken: null,
    status: "idle",
    error: null,
    userProfileData: null,
  },
  reducers: {
    getUser: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      state.user = user;
    },
    logout: (state) => {
      const user = localStorage.clear();
      state.user = user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(isUserNameTaken.fulfilled, (state, action) => {
        state.userNameTaken = action.payload;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userProfileData = action.payload;
      });
  },
});

export const { getUser, logout } = userSlice.actions;

export default userSlice.reducer;
