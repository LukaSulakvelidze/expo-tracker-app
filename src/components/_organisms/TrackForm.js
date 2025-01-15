import { Button, Input } from "@rneui/base";
import { useContext, useState } from "react";
import { View } from "react-native";
import { Context as LocationContext } from "../../store/locationContext";
import useSaveTrack from "../../hooks/useSaveTrack";

export default function TrackForm() {
  const { state, startRecording, stopRecording, changeName } =
    useContext(LocationContext);

  const [saveTrack] = useSaveTrack();
  return (
    <View>
      <Input
        placeholder="Track title"
        value={state.name}
        onChangeText={changeName}
      />
      {state.isRecording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}

      {!state.isRecording && state.locations.length > 0 && (
        <Button title="Save Recording" onPress={saveTrack} />
      )}
    </View>
  );
}
