import { useIsFocused } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Context as TrackContext } from "../store/trackContext";
import { ListItem } from "@rneui/base";

export default function TrackListScreen({ navigation }) {
  const { state, fetchTracks } = useContext(TrackContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchTracks();
  }, [isFocused]);

  return (
    <FlatList
      data={state}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("TrackDetails", { id: item._id })
            }
          >
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      }}
    />
  );
}
