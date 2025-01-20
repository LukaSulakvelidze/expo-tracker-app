import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button, Input } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessages, signIn, signUp } from "../../store/auth";

export default function Form({ screnTitle, regist }) {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text h3 style={styles.text}>
        {screnTitle}
      </Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
      />
      {state.errorMessage && (
        <Text style={styles.errorText}>Something went wrong</Text>
      )}

      <Button
        title={regist ? "Create new Account" : "Sign In"}
        onPress={() => {
          regist
            ? dispatch(signUp({ email, password }))
            : dispatch(signIn({ email, password }));
        }}
      />
      <TouchableOpacity
        onPress={() => {
          {
            regist
              ? navigation.navigate("SignIn")
              : navigation.navigate("SignUp");
            dispatch(clearErrorMessages());
          }
        }}
      >
        <Text style={styles.link}>
          {regist
            ? "Already have an account? Sign in"
            : "Don't have an account? Go to Sign up"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 300,
  },
  text: {
    marginVertical: 10,
  },

  link: {
    textAlign: "center",
    marginVertical: 10,
    color: "blue",
  },

  errorText: {
    fontSize: 16,
    color: "red",
  },
});
