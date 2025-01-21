import { compose, applyMiddleware } from "redux";
import reducer from "./reducer";
import devtoolsEnhancer from "redux-devtools-expo-dev-plugin";
import { thunk } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const composedEnhancers = compose(devtoolsEnhancer({ trace: true }));

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  composedEnhancers,
});

export default store;
