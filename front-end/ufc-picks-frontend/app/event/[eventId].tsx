import { getEventDetails } from "@/api/getEventDetails";
import { getEventSummary } from "@/api/getEventSummary";
import { getPicks } from "@/api/getPicks";
import FightCard from "@/components/cards/FightCard/FightCard";
import { Event } from "@/types/Event";
import { EventDetails } from "@/types/EventDetails";
import { Picks } from "@/types/Picks";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, ScrollView } from "react-native";



export default function EventDetailsScreen() {
    const { eventId } = useLocalSearchParams();
    const [eventDetails, setEventDetails] = useState<EventDetails>();
    const [eventSummary, setEventSummary] = useState<Event>();
    const [picks, setPicks] = useState<Picks[]>([]);

    const picksByFightId = useMemo(() => {
        return Object.fromEntries(
            picks.map((pick) => [pick.fightId, pick])
        );
    }, [picks]);


    useEffect(() => {
        async function loadEvent() {
            const eventData = await getEventDetails(Number(eventId));
            setEventDetails(eventData);
        }

        loadEvent();

    }, [eventId])

    useEffect(() => {
        async function loadPicks() {
            const data = await getPicks(1, Number(eventId));
            setPicks(data);

        }
        loadPicks();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {eventDetails?.fights.map((fight, index) => {
                return (
                    <FightCard
                        fight={fight}
                        key={fight.fightId}
                        index={index}
                        eventId={Number(eventId)}
                        existingPick={picksByFightId[fight.fightId] ?? null
                        } />
                );
            })}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
        paddingStart: 16,
        paddingEnd: 16,
    },

});