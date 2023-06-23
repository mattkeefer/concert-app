import { useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { userDetailsContext } from "../components/user-details-context";
import EventList from "../components/events/event-list";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isSignedIn, setIsSignedIn, token, setToken, username, setUsername] =
    useContext(userDetailsContext);

  const searchConcerts = async () => {
    const options = {
      headers: {
        Authentication: `Bearer ${token}`,
      },
    };
    fetch(
      `https://b83e-2601-18f-380-3c0-698e-f989-70b7-e2df.ngrok-free.app/concerts?keyword=${keyword}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setData(
          data._embedded.events.filter(
            (e) => e._embedded.venues[0] && e._embedded.venues[0].state
          )
        );
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.screen}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search here..."
          onChangeText={setKeyword}
          value={keyword}
          multiline={false}
        />
        <TouchableOpacity onPress={searchConcerts} style={styles.buttonParent}>
          <Ionicons name="search" size={16} color="#000" />
        </TouchableOpacity>
      </View>
      <View>
        <EventList data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    height: "100%",
    backgroundColor: "#121212",
  },
  input: {
    width: "90%",
  },
  searchContainer: {
    margin: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  buttonParent: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});

export default SearchScreen;
