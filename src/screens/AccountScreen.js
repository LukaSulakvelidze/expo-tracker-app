import { Button } from "@rneui/base";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { signOut } from "../store/auth";

export default function AccountScreen() {
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <Text style={styles.text}>AccountScreen</Text>
      <Button title="Sign out" onPress={() => dispatch(signOut())} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
});
