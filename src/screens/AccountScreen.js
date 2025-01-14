import { Button } from "@rneui/base";
import { useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Context as AuthContext } from "../store/authContext";

export default function AccountScreen() {
  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Text style={styles.text}>AccountScreen</Text>
      <Button title="Sign out" onPress={signOut} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
});
