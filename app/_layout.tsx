import { Stack } from "expo-router";
import { StrictMode } from "react";

export default function RootLayout() {
  return (
    <StrictMode>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="edit" options={{ title: "Edit" }} />
      </Stack>
    </StrictMode>
  );
}
