import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../authService";

//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (response && response.data && eresponse.message) || message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "/login",
  async ({ userType, userData }, thunkAPI) => {
    try {
      if (userType === "patient")
        return await authService.loginPatient(userData);
      if (userType === "medecin")
        return await authService.loginMedecin(userData);
      if (userType === "admin") return await authService.loginAdmin(userData);
    } catch (error) {
      const customError = {
        message: error.response.data.message,
        status: error.response.status,
      };
      console.log("custom error", customError);
      return thunkAPI.rejectWithValue(customError);
    }
  }
);

export const logout = createAsyncThunk("/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("action.payload", action.payload);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
