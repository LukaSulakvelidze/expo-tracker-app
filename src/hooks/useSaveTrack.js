import { useContext } from "react";
import { Context as LocationContext } from "../store/locationContext";
import { Context as TrackContext } from "../store/trackContext";
import { useNavigation } from "@react-navigation/native";

const useSaveTrack = () => {
  const { createTrack } = useContext(TrackContext);
  const { state, reset } = useContext(LocationContext);
  const navigation = useNavigation();
  const saveTrack = async () => {
    await createTrack(state.name, state.locations);
    reset();
    navigation.navigate("TrackListFlow");
  };

  return [saveTrack];
};
export default useSaveTrack;
