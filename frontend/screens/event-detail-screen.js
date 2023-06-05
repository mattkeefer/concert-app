import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  Image,
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import EventInterestButton from "../components/buttons/event-interest-button";

const EventDetailScreen = () => {
  const route = useRoute();
  const { eventId, name, description, date, images, venues } = route.params;
  const navigation = useNavigation();
  const startTime = new Date(date.start.dateTime);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "",
      headerBackTitle: " ",
    });
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.heading}>
        <ImageBackground
          style={{ flex: 1, justifyContent: "center" }}
          source={{ uri: images[1] }}
          resizeMode="cover"
        />
        <View style={styles.backdrop}>
          <View style={{ flex: 1 }}>
            <Image style={styles.eventImage} source={{ uri: images[0] }} />
          </View>
          <View
            style={{
              justifyContent: "space-between",
              padding: 5,
              flex: 2,
            }}
          >
            <Text numberOfLines={2} style={styles.title}>
              {name}
            </Text>
            <View style={styles.buttonContainer}>
              <EventInterestButton text="Interested" />
              <EventInterestButton text="Going" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {},
  heading: {
    height: 500,
    flex: 1,
  },
  eventImage: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  backdrop: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default EventDetailScreen;
