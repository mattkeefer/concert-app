import { createStackNavigator } from "@react-navigation/stack";
import EventDetailScreen from "../screens/event-detail-screen";
import SearchScreen from "../screens/search-screen";
import { useContext } from "react";
import { userDetailsContext } from "../components/user-details-context";

const Stack = createStackNavigator();

export const SearchStack = (props) => {
  const [isSignedIn, setIsSignedIn, token, setToken] =
    useContext(userDetailsContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search Screen"
        component={SearchScreen}
        options={{
          title: "Search Concerts",
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
};
