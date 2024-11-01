import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "../../services/authServices";
import TokenService from "../../services/tokenServices";
import api from "../../Api";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  userNameTaken: null,
  status: "idle",
  error: null,
  userProfileData: null,
};

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authServices.createUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authServices.loginUser(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const isUserNameTaken = createAsyncThunk(
  "users/isUserNameTaken",
  async (name, { rejectWithValue }) => {
    try {
      const { data } = await authServices.isUserNameTaken(name);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserData = createAsyncThunk(
  "users/getUserData",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await authServices.getUserData(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserData = createAsyncThunk(
  "users/updateUserData",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { data: user } = await authServices.updateUser(id, data);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) state.user = user;
    },
    logout: (state) => {
      TokenService.clearStorage();
      api.defaults.headers["Authorization"] = "";
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        if (payload.message === "User already exists!") {
          toast.error("User already exists with this email");
          state.status = "failed";
        } else {
          toast.success("User created successfully");
          saveUserToLocalStorage(payload);
          state.status = "succeeded";
          state.user = payload.user;
        }
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
        toast.error("Failed to create user");
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const status = saveUserToLocalStorage(payload);
        if (status) {
          state.status = "succeeded";
          state.user = payload.user;
        } else {
          state.status = "failed";
        }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
        toast.error("Failed to login");
      })
      .addCase(isUserNameTaken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(isUserNameTaken.fulfilled, (state, { payload }) => {
        state.userNameTaken = payload;
        state.status = "succeeded";
      })
      .addCase(isUserNameTaken.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
        toast.error("Failed to check username availability");
      })
      .addCase(getUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.userProfileData = payload;
        state.status = "succeeded";
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
        toast.error("Failed to fetch user data");
      })
      .addCase(updateUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, { payload }) => {
        state.user = payload;
        const user = JSON.parse(localStorage.getItem("user"));
        user.profilePic = payload.profilePic;
        localStorage.setItem("user", JSON.stringify(user));
        state.userProfileData = payload;
        state.status = "succeeded";
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
        toast.error("Failed to update user data");
      });
  },
});

const saveUserToLocalStorage = ({ user, token, message, error }) => {
  if (user && token) {
    toast.success("Logged in successfully");
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    return true;
  } else {
    if (error) {
      toast.error(error);
    } else {
      toast.error(message);
    }
    return false;
  }
};

export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;
