import { getUpcomingEvents } from '@/api/events';
import EventCard from '@/components/EventCard/EventCard';
import { EventSummary } from '@/types/EventSummary';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {

  const [events, setEvents] = useState<EventSummary[]>([]);

  useEffect(() => {
    async function loadEvents(){
      const data = await getUpcomingEvents();
      setEvents(data);
      console.log(events);
    }

    loadEvents();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.eventScreen}>              
        {events.map(event => (
          <EventCard
            key={event.eventId}
            event={event}
            onPress={() =>
              router.push({
                pathname: "/events/[eventId]",
                params: { eventId: String(event.eventId)}
              })
            }
          />
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  eventScreen: {
    alignItems:"center"
  }
});
