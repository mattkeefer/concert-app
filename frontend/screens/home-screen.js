import { StyleSheet, Text, View } from "react-native";
import EventList from "../components/events/event-list";
import { useContext, useEffect, useState } from "react";
import { userDetailsContext } from "../components/user-details-context";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [isSignedIn, setIsSignedIn, token, setToken, username, setUsername] =
    useContext(userDetailsContext);
  const apiKey = "XKaUFETa7GCC7tXGc22PPjvjG5JF8jjC";
  const postalCode = "02116";
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authentication: `Bearer ${token}`,
      },
    };
    // const res = await fetch(
    //   `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&postalCode=${postalCode}&sort=date,name,asc&size=20&apikey=${apiKey}`
    // );
    fetch(
      "https://e66f-2601-188-c880-8280-8536-884d-f81c-277.ngrok-free.app/concerts",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data._embedded.events);
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
    padding: 20,
  },
});

export default HomeScreen;
