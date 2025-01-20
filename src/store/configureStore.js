import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducer";
import devtoolsEnhancer from "redux-devtools-expo-dev-plugin";
import { thunk } from "redux-thunk";

const composedEnhancers = compose(
  applyMiddleware(thunk),
  devtoolsEnhancer({ trace: true })
);

const store = createStore(reducer, composedEnhancers);

export default store;
