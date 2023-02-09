import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";
export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  token: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: "",
};

export const Login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const response = await axios.post("/api/auth/signin", {
      email: payload.email,
      password: payload.password,
    });
    if (response.status === 200)
      sessionStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
);

export const SignUp = createAsyncThunk(
  "auth/signup",
  async (payload: { email: string; password: string }) => {
    const response = await axios.post("/api/auth/signup", {
      email: payload.email,
      password: payload.password,
    });
    if (response.status === 200)
      sessionStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
      sessionStorage.removeItem("user");
    },
    persistedLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = "";
    });
    builder.addCase(Login.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
    });
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = "";
    });
    builder.addCase(SignUp.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = "";
    });
  },
});

export const authSelector = (state: RootState) => state.auth;

export const authActions = { ...authSlice.actions };

export default authSlice.reducer;
