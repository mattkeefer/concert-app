import { Text, View, FlatList } from "react-native";
import EventItem from "./event-item";

const EventList = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <EventItem
        id={item.id}
        name={item.name}
        description={item.description}
        date={item.dates}
        images={item.images.map((img) => img.url)}
        venues={item._embedded.venues}
      />
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        initialNumToRender={6}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
      />
    </View>
  );
};

export default EventList;
