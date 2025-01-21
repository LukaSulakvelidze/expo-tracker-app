import { axiosInstance } from "../lib/axiosInstance";

const FETCH_TRACKS = "fetch_tracks";
const SET_LOADER = "set_loader";

export const fetchTracks = () => async (dispatch) => {
  dispatch({ type: SET_LOADER, payload: true });
  try {
    const response = await axiosInstance.get("tracks");
    dispatch({ type: FETCH_TRACKS, payload: response.data });
    dispatch({ type: SET_LOADER, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_LOADER, payload: false });
  }
};

export const createTrack = (name, locations) => async (dispatch) => {
  dispatch({ type: SET_LOADER, payload: true });
  try {
    await axiosInstance.post("tracks", { name, locations });
    dispatch({ type: SET_LOADER, payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_LOADER, payload: false });
  }
};

export const testThunk = () => async (dispatch) => {
  console.log("Thunk middleware is working");
  return Promise.resolve("Thunk works!");
};

const initialState = {
  tracks: [],
  loaderStatus: false,
};
export default function trackReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRACKS:
      return { ...state, tracks: action.payload };
    case SET_LOADER:
      return { ...state, loaderStatus: action.payload };
    default:
      return state;
  }
}
