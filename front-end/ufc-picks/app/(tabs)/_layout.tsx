import { Tabs } from "expo-router";

export default function EventsLayout(){
    return (
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: "#19191c",
        },
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}