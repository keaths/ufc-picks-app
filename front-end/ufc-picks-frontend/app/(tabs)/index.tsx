import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, ScrollView, Animated } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import EventCard from '@/components/cards/EventCard/EventCard';
import { useEffect, useRef, useState } from 'react';
import { getEvents } from '@/api/getEvents';
import { Event } from '@/types/Event';
import React from 'react';
import { skip } from 'node:test';

export default function HomeScreen() {

  const [events, setEvents] = useState<Event[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  const skipNextAnim = useRef(false);

  const loadEventsAndPicks = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.log("oops")
    }
  }

  useEffect(() => {
    async function loadEvents() {
      const data = await getEvents();
      setEvents(data);
    }

    loadEvents();
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      loadEventsAndPicks();

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

        {Array.isArray(events) ? events.map((event, index) => (
          <EventCard
            event={event}
            index={index}
            key={event.eventId}
            animationKey={animationKey}
            onOpen={() => {
              skipNextAnim.current = true;
            }}
          />
        )) : null}

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
    alignItems: "center",
    gap: 16,
  },
});
