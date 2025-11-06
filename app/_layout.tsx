import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="game"/>
      <Stack.Screen name="win"/>
      <Stack.Screen name="lost"/>
    </Stack>
  );
}