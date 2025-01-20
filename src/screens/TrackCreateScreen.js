import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/_organisms/Map";
import useLocation from "../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/_organisms/TrackForm";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../store/location";

export default function TrackCreateScreen() {
  const isFocused = useIsFocused();
  const state = useSelector((item) => item.location);
  const dispatch = useDispatch();
  const callback = useCallback(
    (location) => dispatch(addLocation(location, state.isRecording)),
    [state.isRecording]
  );
  useLocation(isFocused || state.isRecording, callback);
  return (
    <SafeAreaView style={styles.container}>
      <Map />
      <TrackForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  text: {
    fontSize: 40,
  },
});
