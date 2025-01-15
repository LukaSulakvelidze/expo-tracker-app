import createContextData from "./createContextData";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, isRecording: true };
    case "stop_recording":
      return { ...state, isRecording: false };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "change_name":
      return { ...state, name: action.payload };
    case "reset":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const startRecording = (dispatch) => async () => {
  dispatch({ type: "start_recording" });
};

const stopRecording = (dispatch) => async () => {
  dispatch({ type: "stop_recording" });
};

const addLocation = (dispatch) => async (location, isRecording) => {
  dispatch({ type: "add_current_location", payload: location });
  if (isRecording) {
    dispatch({ type: "add_location", payload: location });
  }
};

const changeName = (dispatch) => (name) => {
  dispatch({ type: "change_name", payload: name });
};

const reset = (dispatch) => () => {
  dispatch({ type: "reset" });
};

export const { Context, Provider } = createContextData(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset,
  },
  { isRecording: false, name: "", locations: [], currentLocation: null }
);
