import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailsScreen from "./src/screens/TrackDetailsScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/service/navigationRef";
import InitialRouteScreen from "./src/screens/InitialRouteScreen";
import { Ionicons } from "@expo/vector-icons";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store/configureStore";
import { ActivityIndicator } from "react-native";
import { injectStore } from "./src/lib/axiosInstance";
injectStore(store);

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
  const token = useSelector((item) => item.auth.token);
  return (
    <NavigationContainer ref={navigationRef}>
      {token ? <AppContentStacks /> : <AuthenticationStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <ActivityIndicator size={"large"} style={{ marginTop: 250 }} />
        }
        persistor={persistor}
      >
        <Root />
      </PersistGate>
    </Provider>
  );
}
