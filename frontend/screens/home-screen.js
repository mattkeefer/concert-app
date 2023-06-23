import { StyleSheet, Text, View } from "react-native";
import EventList from "../components/events/event-list";
import { useContext, useEffect, useState } from "react";
import { userDetailsContext } from "../components/user-details-context";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [isSignedIn, setIsSignedIn, token, setToken, username, setUsername] =
    useContext(userDetailsContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const options = {
      headers: {
        Authentication: `Bearer ${token}`,
      },
    };
    fetch(
      "https://635d-2601-18f-380-3c0-3c47-baff-228e-13bb.ngrok-free.app/concerts",
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
      <EventList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: "#121212",
  },
});

export default HomeScreen;
