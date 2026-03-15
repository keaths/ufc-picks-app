import { getEventDetails } from "@/api/eventDetails";
import { ExistingPick, getPicks } from "@/api/getPicks";
import EventFight from "@/components/EventFights/EventFight";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function EventDetailsScreen() {

    const { eventId } = useLocalSearchParams();
    const [ event, setEvent] = useState<EventDetails | null>(null);
    const [ picks, setPicks] = useState<ExistingPick[]>([]);

    useEffect(() => {
        async function loadEvent() {
            const fetchEvent = await getEventDetails(Number(eventId));
            setEvent(fetchEvent);

            const fetchPicks = await getPicks(1, Number(eventId));
            setPicks(fetchPicks);
        }
        loadEvent();

    }, [eventId]);

    const singleFight = event?.fights?.[0];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {event?.fights.map(fight => (
                <EventFight fight={fight} key={fight.fightId} pick={picks.find(p => p.fightId === fight.fightId)}/>
            ))}
            {/* {singleFight && <EventFight fight={singleFight}/>} */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        
        alignItems:"center"
    },
    
    eventCard: {
        width: "90%",
        borderRadius: 18,
        margin: 10,
    },

    eventTopper: {
        paddingStart: 8,
        paddingTop: 2,
        flexDirection: "row"
    },

    eventLocation: {
        paddingStart: 8,
        paddingBottom: 2,
        alignItems: "flex-start",
        justifyContent: "center",
    },

    eventTitleContainer: {
        paddingTop: 3,
        width: "70%",
        justifyContent: "flex-start"
    },

    eventDate: {
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(234, 56, 56, 0.69)",
        borderRadius: 10
    },

    fighterRow: {
        flexDirection: "row",
    },

    versusBadge: {
        position: "absolute",
        top: "50%",
        left: "50%",
        backgroundColor: "#151515",
        transform: [
            { translateX: -15 },
            { translateY: -3 }
        ],
        borderRadius: "50%",
        height: 30,
        width: 30,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    versusText: {
        color: "white",
        fontWeight: 700,
        fontSize: 15,
    },

    predictionsContainer: {
        padding: 8,
        alignItems: "flex-start"
    },

    predictions: {
        padding: 5,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        alignItems: "flex-start",
    },

    subTitle: {
        color: "white",
        fontWeight: 700,
        fontSize: 11
    },

    header: {
        color: "white",
        fontWeight: 700,
        fontSize: 18
    }


})