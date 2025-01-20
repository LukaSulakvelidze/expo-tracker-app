import { Button, Input } from "@rneui/base";
import { View } from "react-native";
import useSaveTrack from "../../hooks/useSaveTrack";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  startRecording,
  stopRecording,
} from "../../store/location";

export default function TrackForm() {
  const state = useSelector((item) => item.location);
  const dispatch = useDispatch();

  const [saveTrack] = useSaveTrack();
  return (
    <View>
      <Input
        placeholder="Track title"
        value={state.name}
        onChangeText={(e) => dispatch(changeName(e))}
      />
      {state.isRecording ? (
        <Button title="Stop" onPress={() => dispatch(stopRecording())} />
      ) : (
        <Button
          title="Start Recording"
          onPress={() => dispatch(startRecording())}
        />
      )}

      {!state.isRecording && state.locations.length > 0 && (
        <Button title="Save Recording" onPress={saveTrack} />
      )}
    </View>
  );
}
