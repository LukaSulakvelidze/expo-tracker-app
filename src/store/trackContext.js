import { axiosInstance } from "../lib/axiosInstance";
import createContextData from "./createContextData";

const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;

    default:
      return state;
  }
};

const fetchTracks = (dispatch) => async () => {
  const response = await axiosInstance.get("tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};

const createTrack = () => async (name, locations) => {
  try {
    await axiosInstance.post("tracks", { name, locations });
  } catch (error) {
    console.log(error);
  }
};

export const { Context, Provider } = createContextData(
  trackReducer,
  {
    fetchTracks,
    createTrack,
  },
  []
);
