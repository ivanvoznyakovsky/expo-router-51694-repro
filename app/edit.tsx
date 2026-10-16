import { router, usePreventRemove } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditScreen() {
  const [text, setText] = useState("");
  const hasUnsavedChanges = text.length > 0;

  usePreventRemove(hasUnsavedChanges, ({ repeat }) => {
    console.log("usePreventRemove callback fired");
    Alert.alert("Discard changes?", "You have unsaved changes.", [
      { text: "Keep editing", style: "cancel" },
      {
        text: "Discard",
        style: "destructive",
        onPress: () => {
          setText("");
          repeat();
        },
      },
    ]);
  });

  return (
    <View style={styles.container}>
      <Text>Type any text, then press Cancel or the native Back button.</Text>
      <TextInput
        accessibilityLabel="Draft text"
        onChangeText={setText}
        placeholder="Unsaved draft"
        style={styles.input}
        value={text}
      />
      <Button title="Cancel" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
    padding: 24,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 12,
  },
});
