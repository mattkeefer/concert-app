import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { memo } from "react";

const EventItem = ({ id, name, url, date, venue, images }) => {
  const navigation = useNavigation();
  const dateObject = new Date(date);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate("Event", {
          eventId: id,
          name,
          url,
          date,
          venue,
          images,
        });
      }}
    >
      <Image style={styles.img} source={{ uri: images[0] }} />
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.body}>
          {dateObject
            .toString()
            .substring(0, dateObject.toString().indexOf(" ", 8))}
        </Text>
        <Text numberOfLines={1} style={styles.body}>
          {venue.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 10,
  },
  img: {
    height: 160,
    width: "100%",
    borderRadius: 15,
  },
  textContainer: {
    marginVertical: 10,
    marginLeft: 5,
  },
  title: {
    color: "#F2305F",
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: "600",
  },
  body: {
    color: "white",
    fontSize: 14,
  },
});

export default memo(EventItem);
