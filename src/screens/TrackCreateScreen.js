import { useCallback, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/_organisms/Map";
import { Context as LocationContext } from "../store/locationContext";
import useLocation from "../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";
import TrackForm from "../components/_organisms/TrackForm";

export default function TrackCreateScreen() {
  const isFocused = useIsFocused();
  const { state, addLocation } = useContext(LocationContext);

  const callback = useCallback(
    (location) => addLocation(location, state.isRecording),
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
