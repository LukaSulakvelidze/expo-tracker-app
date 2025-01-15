import { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { Context as TrackContext } from "../store/trackContext";
import MapView, { Polyline } from "react-native-maps";

export default function TrackDetailsScreen({ route }) {
  const { state } = useContext(TrackContext);

  const id = route.params.id;

  const track = state.find((track) => track._id === id);
  const coords = track.locations[0].coords;

  return (
    <>
      <Text style={styles.text}>{state.name}</Text>
      <MapView
        loadingEnabled
        style={styles.map}
        initialRegion={{
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          ...coords,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 48,
  },
  map: {
    height: 300,
  },
});
