import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axiosInstance";

const initialState = {
  tracks: [],
  loaderStatus: false,
};

const slice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    serTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setLoader: (state, action) => {
      state.loaderStatus = action.payload;
    },
  },
});

export default slice.reducer;
export const { serTracks, setLoader } = slice.actions;

export const fetchTracks = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await axiosInstance.get("tracks");
    dispatch(serTracks(response.data));
    dispatch(setLoader(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoader(false));
  }
};

export const createTrack = (name, locations) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    await axiosInstance.post("tracks", { name, locations });
    dispatch(setLoader(false));
  } catch (error) {
    console.log(error);
    dispatch(setLoader(false));
  }
};
