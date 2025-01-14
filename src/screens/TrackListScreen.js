import { Button, StyleSheet, Text } from "react-native";

export default function TrackListScreen({ navigation }) {
  return (
    <>
      <Text style={styles.text}>TrackListScreen</Text>
      <Button
        title="Go To Details Stack"
        onPress={() => navigation.navigate("TrackDetails")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
});
