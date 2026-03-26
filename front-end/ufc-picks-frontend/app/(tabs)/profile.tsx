
import { getUpcomingPickedEvents } from "@/api/getUpcomingPickedEvents";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMetric from "@/components/profile/ProfileMetric";
import ProfilePicks from "@/components/profile/ProfilePick/ProfilePick";
import { COLORS } from "@/theme/colors";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from "react-native";
import { Event } from "@/types/Event";
import { useFocusEffect } from "expo-router";
import React from "react";
import { getPastPickedEvents } from "@/api/getPastPickedEvents";
import ProfileFuturePastButton from "@/components/profile/ProfileFuturePastButton/ProfileFuturePastButton";


export default function Profile({ }) {

  const [pickedUpcomingEvents, setPickedUpcomingEvents] = useState<Event[]>([]);
  const [pickedPastEvents, setPickedPastEvnents] = useState<Event[]>([]);

  const [animationKey, setAnimationKey] = useState(0);
  const [isUpcoming, setIsUpcoming] = useState<Boolean>(true);

  const skipNextAnim = useRef(false);

  useEffect(() => {
    async function loadPickedEvents() {
      const upcoming = await getUpcomingPickedEvents();
      setPickedUpcomingEvents(upcoming);
      const past = await getPastPickedEvents();
      setPickedPastEvnents(past);
    };
    loadPickedEvents();
  }, [])

  const loadProfileAndPicks = async () => {
    const data = await getUpcomingPickedEvents();
    setPickedUpcomingEvents(data);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadProfileAndPicks();

      if (skipNextAnim.current) {
        skipNextAnim.current = false;
        return;
      }

      setAnimationKey((prev) => prev + 1);
    }, [])
  );

  console.log(isUpcoming);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader userName={"@Keath"} />

      <View style={styles.picksDetailsContainer}>
        <View style={styles.yourPicksContainer}>
          <Text style={styles.yourPicks}>Your Picks</Text>
        </View>
        <ProfileFuturePastButton
          setIsUpcoming={setIsUpcoming}
          isUpcoming={isUpcoming} />
      </View>
      {isUpcoming
        ? (Array.isArray(pickedUpcomingEvents) ? pickedUpcomingEvents : []).map((event, index) => (
          <ProfilePicks
            key={event.eventId}
            event={event}
            index={index}
            animationKey={animationKey}
            onOpen={() => {
              skipNextAnim.current = true;
            }}
            isUpcoming={isUpcoming}
          />
        ))
        :
        pickedPastEvents.map((event, index) => {
          return (
            <ProfilePicks
              key={event.eventId}
              event={event}
              index={index}
              animationKey={animationKey}
              onOpen={() => {
                skipNextAnim.current = true;
              }}
              isUpcoming={isUpcoming}
            />
          )
        })
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingStart: 16,
    paddingEnd: 16,
    marginTop: 16
  },

  userMetricsContainer: {
    height: 60,
    flexDirection: "row",
    borderWidth: 1,
    width: "100%",
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "#2b2b2b"
  },

  picksDetailsContainer: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10
  },

  yourPicksContainer: {
    width: "33.33%"
  },

  yourPicks: {
    fontWeight: 700,
    fontSize: 18,
    color: COLORS.lightText
  },

});