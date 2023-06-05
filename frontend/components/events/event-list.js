import { Text, View, FlatList } from "react-native";
import EventItem from "./event-item";

const EventList = ({ data }) => {
  const renderItem = ({ item }) => {
    return (
      <EventItem
        id={item.id}
        name={item.name}
        url={item.url}
        date={new Date(item.dates.start.dateTime)}
        venue={{
          name: item._embedded.venues[0].name,
          postalCode: item._embedded.venues[0].postalCode,
          city: item._embedded.venues[0].city.name,
          stateCode: item._embedded.venues[0].state.stateCode,
          countryCode: item._embedded.venues[0].country.countryCode,
          address: item._embedded.venues[0].address.line1,
        }}
        images={item.images.map((img) => img.url)}
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
