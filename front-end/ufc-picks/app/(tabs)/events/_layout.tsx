import { Stack } from "expo-router";
import { StyleSheet } from "react-native";


export default function EventsLayout(){
    return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "#19191c",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Upcoming Events" }}
      />
      <Stack.Screen
        name="[eventId]"
        options={{ title: "Event Details" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#77777d"
    }
})