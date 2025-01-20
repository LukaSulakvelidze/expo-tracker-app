const ADD_CURRENT_LOCATION = "add_current_location";
const START_RECORDING = "start_recording";
const STOP_RECORDING = "stop_recording";
const ADD_LOCATION = "add_location";
const CHANGE_NAME = "change_name";
const RESET = "reset";

export const startRecording = () => async (dispatch) => {
  dispatch({ type: START_RECORDING });
};

export const stopRecording = () => async (dispatch) => {
  dispatch({ type: STOP_RECORDING });
};

export const addLocation = (location, isRecording) => async (dispatch) => {
  dispatch({ type: ADD_CURRENT_LOCATION, payload: location });
  if (isRecording) {
    dispatch({ type: ADD_LOCATION, payload: location });
  }
};

export const changeName = (name) => (dispatch) => {
  dispatch({ type: CHANGE_NAME, payload: name });
};

export const reset = () => (dispatch) => {
  dispatch({ type: RESET });
};

const initialState = {
  isRecording: false,
  name: "",
  locations: [],
  currentLocation: null,
};

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };
    case START_RECORDING:
      return { ...state, isRecording: true };
    case STOP_RECORDING:
      return { ...state, isRecording: false };
    case ADD_LOCATION:
      return { ...state, locations: [...state.locations, action.payload] };
    case CHANGE_NAME:
      return { ...state, name: action.payload };
    case RESET:
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
}
