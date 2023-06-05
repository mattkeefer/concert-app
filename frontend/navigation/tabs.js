import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStack } from "./stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "../screens/login-screen";
import { useContext } from "react";
import { userDetailsContext } from "../components/user-details-context";

const Tab = createBottomTabNavigator();

export const HomeTabs = (props) => {
  const [isSignedIn, setIsSignedIn, token, setToken] =
    useContext(userDetailsContext);

  if (!isSignedIn) {
    return <HomeStack />;
  } else {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ title: "Upcoming Concerts" }}
        />
        <Tab.Screen
          name="Search"
          component={LoginScreen}
          options={{ title: "Search" }}
        />
        <Tab.Screen
          name="Profile"
          component={LoginScreen}
          options={{ title: "Profile" }}
        />
      </Tab.Navigator>
    );
  }
};
