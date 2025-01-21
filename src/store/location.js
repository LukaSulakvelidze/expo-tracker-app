import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRecording: false,
  name: "",
  locations: [],
  currentLocation: null,
};

const slice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setRecording: (state) => {
      state.isRecording = true;
    },
    unSetRecording: (state) => {
      state.isRecording = false;
    },
    setLocations: (state, action) => {
      state.locations.push(action.payload);
    },
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setReset: (state) => {
      state.isRecording = false;
      state.name = "";
      state.locations = [];
    },
  },
});

export default slice.reducer;
export const {
  setRecording,
  unSetRecording,
  setLocations,
  setCurrentLocation,
  setName,
  setReset,
} = slice.actions;

export const startRecording = () => async (dispatch) => {
  dispatch(setRecording());
};

export const stopRecording = () => async (dispatch) => {
  dispatch(unSetRecording());
};

export const addLocation = (location, isRecording) => async (dispatch) => {
  dispatch(setCurrentLocation(location));
  if (isRecording) {
    dispatch(setLocations(location));
  }
};

export const changeName = (name) => (dispatch) => {
  dispatch(setName(name));
};

export const reset = () => (dispatch) => {
  dispatch(setReset());
};
