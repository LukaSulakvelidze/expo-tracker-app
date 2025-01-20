import { combineReducers } from "redux";
import authReducer from "./auth";
import locationReducer from "./location";
import trackReducer from "./track";

export default combineReducers({
  auth: authReducer,
  location: locationReducer,
  tracks: trackReducer,
});
