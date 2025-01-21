import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../service/navigationRef";
import { axiosInstance } from "../lib/axiosInstance";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    errorMessage: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearErrorMessages: (state) => {
      state.errorMessage = "";
    },
    signOut: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, setError, clearErrorMessages, signOut } =
  slice.actions;
export default slice.reducer;

export const isUserAuthenticated = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    } else {
      if (navigationRef.isReady()) {
        navigationRef.navigate("SignIn");
      }
    }
  } catch (error) {
    console.error("Error checking user authentication:", error);
  }
};

export const signUp =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance.post("auth/sign-up", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.accesstoken);
      dispatch(setToken(response.data.accesstoken));
    } catch (error) {
      dispatch(setError("Something Went Wrong"));
      console.error("Sign-up error:", error);
    }
  };

export const signIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const response = await axiosInstance.post("auth/sign-in", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.accesstoken);
      dispatch(setToken(response.data.accesstoken));
    } catch (error) {
      dispatch(setError("Something Went Wrong"));
      console.error("Sign-in error:", error);
    }
  };
