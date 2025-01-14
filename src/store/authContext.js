import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../lib/axiosInstance";
import createContextData from "./createContextData";
import { navigationRef } from "../service/navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      return { errorMessage: "", token: action.payload };
    case "signOut":
      return { errorMessage: "", token: null };
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const isUserAuthenticated = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signIn", payload: token });
  } else {
    if (navigationRef.isReady()) {
      navigationRef.navigate("SignIn");
    }
  }
};

const signUp =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("auth/sign-up", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.accesstoken);
      dispatch({ type: "signIn", payload: response.data.accesstoken });
    } catch (error) {
      dispatch({ type: "add_error", payload: "Something Went Wrong" });
    }
  };

const signIn =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("auth/sign-in", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", response.data.accesstoken);
      dispatch({ type: "signIn", payload: response.data.accesstoken });
    } catch (error) {
      dispatch({ type: "add_error", payload: "Something Went Wrong" });
    }
  };

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signOut" });
};

const clearErrorMessages = (dispatch) => () => {
  dispatch({ type: "clear_error" });
};
export const { Provider, Context } = createContextData(
  authReducer,
  { isUserAuthenticated, signUp, signIn, signOut, clearErrorMessages },
  { token: null, errorMessage: "" }
);
