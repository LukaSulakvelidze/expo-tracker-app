import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../store/location";
import { createTrack } from "../store/track";

const useSaveTrack = () => {
  const state = useSelector((item) => item.location);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const saveTrack = async () => {
    await dispatch(createTrack(state.name, state.locations));
    dispatch(reset());
    navigation.navigate("TrackListFlow");
  };

  return [saveTrack];
};
export default useSaveTrack;
