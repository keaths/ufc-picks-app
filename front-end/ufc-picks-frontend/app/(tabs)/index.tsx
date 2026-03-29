import { StyleSheet, View, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import EventCard from '@/components/cards/EventCard/EventCard';
import { useRef, useState } from 'react';
import { getEvents } from '@/api/getEvents';
import { Event } from '@/types/Event';
import React from 'react';

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  const skipNextAnim = useRef(false);
  const isLoadingRef = useRef(false);

  const loadEvents = async () => {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadEvents();

      if (skipNextAnim.current) {
        skipNextAnim.current = false;
        return;
      }

      setAnimationKey((prev) => prev + 1);
    }, [])
  );

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        {(Array.isArray(events) ? events : []).map((event, index) => (
          <EventCard
            key={event.eventId}
            event={event}
            index={index}
            animationKey={animationKey}
            onOpen={() => {
              skipNextAnim.current = true;
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingStart: 16,
    paddingEnd: 16,
    marginTop: 16,
    alignItems: 'center',
    gap: 16,
  },
});