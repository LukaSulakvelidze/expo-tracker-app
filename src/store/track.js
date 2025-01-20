import { axiosInstance } from "../lib/axiosInstance";

const FETCH_TRACKS = "fetch_tracks";

export const fetchTracks = () => async (dispatch) => {
  const response = await axiosInstance.get("tracks");
  dispatch({ type: "fetch_tracks", payload: response.data });
};

export const createTrack = (name, locations) => async () => {
  try {
    await axiosInstance.post("tracks", { name, locations });
  } catch (error) {
    console.log(error);
  }
};

export default function trackReducer(state = [], action) {
  switch (action.type) {
    case FETCH_TRACKS:
      return action.payload;
    default:
      return state;
  }
}
