import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home-screen";
import LoginScreen from "../screens/login-screen";
import EventDetailScreen from "../screens/event-detail-screen";
import SignupScreen from "../screens/signup-screen";
import { useContext } from "react";
import { userDetailsContext } from "../components/user-details-context";

const Stack = createStackNavigator();

export const HomeStack = (props) => {
  const [isSignedIn, setIsSignedIn, token, setToken] =
    useContext(userDetailsContext);

  if (!isSignedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Concert Connect" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ title: "Register" }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Concerts"
          component={HomeScreen}
          options={{
            title: "Upcoming Concerts",
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#121212", borderColor: "black" },
            headerShadowVisible: false,
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: 23,
              marginTop: 15,
            },
          }}
        />
        <Stack.Screen name="Event" component={EventDetailScreen} />
      </Stack.Navigator>
    );
  }
};
