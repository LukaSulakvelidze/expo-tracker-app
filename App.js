import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailsScreen from "./src/screens/TrackDetailsScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Context, Provider } from "./src/store/authContext";
import { navigationRef } from "./src/service/navigationRef";
import { useContext } from "react";
import InitialRouteScreen from "./src/screens/InitialRouteScreen";

const Stack = createNativeStackNavigator();
const BottomStack = createBottomTabNavigator();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator initialRouteName="InitialRoute">
      <Stack.Screen
        name="InitialRoute"
        component={InitialRouteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const TrackListFlowContentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Track List" }}
      />
      <Stack.Screen
        name="TrackDetails"
        component={TrackDetailsScreen}
        options={{ title: "Track Details" }}
      />
    </Stack.Navigator>
  );
};

const AppContentStacks = () => {
  return (
    <BottomStack.Navigator initialRouteName="TrackListFlow">
      <BottomStack.Screen
        name="TrackListFlow"
        component={TrackListFlowContentStack}
        options={{ headerShown: false }}
      />
      <BottomStack.Screen name="TrackCreate" component={TrackCreateScreen} />
      <BottomStack.Screen name="Account" component={AccountScreen} />
    </BottomStack.Navigator>
  );
};

const Root = () => {
  const { state } = useContext(Context);

  return (
    <NavigationContainer ref={navigationRef}>
      {state.token ? <AppContentStacks /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider>
      <Root />
    </Provider>
  );
}
