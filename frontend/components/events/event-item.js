import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { memo } from "react";

const EventItem = ({ id, name, description, date, images, venues }) => {
  const navigation = useNavigation();
  const startTime = new Date(date.start.dateTime);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("Event", {
          eventId: id,
          name,
          description,
          date,
          images,
          venues,
        });
      }}
    >
      <ImageBackground
        style={styles.img}
        imageStyle={{ borderRadius: 10 }}
        source={{ uri: images[0] }}
        resizeMode="cover"
      >
        <View style={{ flex: 3 }}></View>
        <View style={styles.text}>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Text numberOfLines={2} style={styles.header}>
              {name}
            </Text>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Text numberOfLines={1} style={styles.body}>
              {startTime
                .toLocaleDateString()
                .substring(0, startTime.toLocaleDateString().indexOf("/", 3))}
            </Text>
            <Text numberOfLines={1} style={styles.body}>
              {venues[0].name}
            </Text>
            <Text numberOfLines={1} style={[styles.body, {color: '#bbb'}]}>
              {venues[0].city.name}, {venues[0].state.stateCode}, {venues[0].country.countryCode}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
    height: 250,
  },
  img: {
    flex: 1,
  },
  text: {
    flex: 2,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  header: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    textTransform: "uppercase",
  },
  body: {
    color: "#eee",
    fontSize: 12,
  },
});

export default memo(EventItem);
