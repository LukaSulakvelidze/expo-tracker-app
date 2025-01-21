import { combineReducers } from "redux";
import locationReducer from "./location";
import trackReducer from "./track";
import authReducer from "./auth";

export default combineReducers({
  auth: authReducer,
  location: locationReducer,
  tracks: trackReducer,
});
