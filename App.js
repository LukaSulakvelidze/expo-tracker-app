import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailsScreen from "./src/screens/TrackDetailsScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  Context as AuthContext,
  Provider as AuthProvider,
} from "./src/store/authContext";
import { navigationRef } from "./src/service/navigationRef";
import { useContext } from "react";
import InitialRouteScreen from "./src/screens/InitialRouteScreen";
import { Provider as LocationProvider } from "./src/store/locationContext";
import { Provider as TrackProvider } from "./src/store/trackContext";
import { Ionicons } from "@expo/vector-icons";

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
      <Stack.Screen name="TrackList" component={TrackListScreen} />
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
    <BottomStack.Navigator
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "#333",
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: "#ddd",
        },
      }}
      initialRouteName="TrackListFlow"
    >
      <BottomStack.Screen
        name="TrackListFlow"
        component={TrackListFlowContentStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <BottomStack.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <BottomStack.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" color={color} size={size} />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
};

const Root = () => {
  const { state } = useContext(AuthContext);
  return (
    <NavigationContainer ref={navigationRef}>
      {state.token ? <AppContentStacks /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}
