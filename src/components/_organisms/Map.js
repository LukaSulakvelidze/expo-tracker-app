import React, { useContext, useRef } from "react";
import MapView, { Circle, Polyline } from "react-native-maps";
import { Context as LocationContext } from "../../store/locationContext";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Button } from "@rneui/base";

export default function Map() {
  const { state } = useContext(LocationContext);
  const mapRef = useRef(null);

  if (!state.currentLocation) {
    return <ActivityIndicator size={"large"} style={styles.spinner} />;
  }

  const centerMapOnUserLocation = async () => {
    mapRef.current?.animateToRegion(
      {
        latitude: state.currentLocation.coords.latitude,
        longitude: state.currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  return (
    <>
      <MapView
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          ...state.currentLocation.coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        loadingEnabled
      >
        <Circle
          center={{
            ...state.currentLocation.coords,
          }}
          radius={25}
          strokeColor={"rgba(158, 158, 255, 1)"}
          fillColor={"rgba(158, 158, 255, 0.3)"}
        />
        <Polyline
          coordinates={state.locations.map((location) => location.coords)}
        />
      </MapView>
      <Button title="See My Location" onPress={centerMapOnUserLocation} />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 300,
  },

  spinner: {
    marginTop: 250,
  },
});
