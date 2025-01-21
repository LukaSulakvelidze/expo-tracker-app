import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  createTransform
} from "redux-persist";

const setTransform = createTransform(
  // An "inbound" function that gets called right before state is persisted (optional).
  (inboundState, key) => {
    return { token: inboundState.token, errorMessage: '' };
  },
  // An "outbound" function that gets called right before state is rehydrated (optional).
  (outboundState, key) => {
    return outboundState
  },
  // define which reducers this transform gets called for.
  { whitelist: ['auth'] }
);

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"],
  transforms: [setTransform]
};
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
