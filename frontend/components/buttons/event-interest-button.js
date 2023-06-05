import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";

const EventInterestButton = (props) => {
  const [icon, setIcon] = useState("add");
  return (
    <Pressable
      style={styles.button}
      onPress={() => setIcon(icon === "add" ? "checkmark" : "add")}
    >
      <View style={styles.interiorContainer}>
        <Ionicons name={icon} size={20} color="#F2305F" />
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 25,
    marginRight: 20,
  },
  text: {
    color: "white",
    fontSize: 12,
  },
  interiorContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 10,
    marginLeft: -5,
  },
});

export default EventInterestButton;
