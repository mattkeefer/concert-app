import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { HomeTabs } from "./navigation/tabs";
import UserDetailsProvider from "./components/user-details-context";

export default function App() {
  return (
    <NavigationContainer>
      <UserDetailsProvider>
        <HomeTabs />
        <StatusBar style="light" />
      </UserDetailsProvider>
    </NavigationContainer>
  );
}
