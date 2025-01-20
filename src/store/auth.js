import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "../service/navigationRef";
import { axiosInstance } from "../lib/axiosInstance";

// action types
const SIGNIN = "signIn";
const SIGNOUT = "signOut";
const ADD_ERROR = "add_error";
const CLEAR_ERROR = "clear_error";

const initialState = {
  token: null,
  errorMessage: "",
};

// action creators
export const isUserAuthenticated = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: SIGNIN, payload: token });
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
      dispatch({ type: SIGNIN, payload: response.data.accesstoken });
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: "Something Went Wrong" });
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
      dispatch({ type: SIGNIN, payload: response.data.accesstoken });
    } catch (error) {
      dispatch({ type: ADD_ERROR, payload: "Something Went Wrong" });
    }
  };

export const signOut = () => async (dispatch) => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: SIGNOUT });
};

export const clearErrorMessages = () => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

// reducer
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      return { errorMessage: "", token: action.payload };
    case SIGNOUT:
      return { errorMessage: "", token: null };
    case ADD_ERROR:
      return { ...state, errorMessage: action.payload };
    case CLEAR_ERROR:
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
}
