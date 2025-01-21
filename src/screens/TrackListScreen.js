import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import { ListItem } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchTracks } from "../store/track";

export default function TrackListScreen({ navigation }) {
  const state = useSelector((item) => item.tracks);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(fetchTracks());
  }, [isFocused]);

  if (state.loaderStatus) {
    return <ActivityIndicator size={"large"} style={{ marginTop: 250 }} />;
  }

  return (
    <FlatList
      data={state.tracks}
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
