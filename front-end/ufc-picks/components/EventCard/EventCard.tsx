import { EventSummary } from "@/types/EventSummary";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FighterProfile from "./FighterProfile/FighterProfile";

type Props = {
    event: EventSummary;
    onPress?: () => void;
}

export default function EventCard({ event, onPress }: Props) {
    return (
        <Pressable onPress={onPress}>
            <LinearGradient
                colors={["#fdfdfd00", "#fdfdfd29"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.eventCard}>
                <LinearGradient
                    colors={["rgba(255, 255, 255, 0.21).06)", "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.eventTopper}>
                    <View style={styles.eventTitleContainer}>
                        <Text style={styles.header}>{event.eventName.split(":")[0]}</Text>
                    </View>
                    <View style={styles.eventDate}>
                        <Text style={styles.subTitle}>{event.eventDate}</Text>
                    </View>
                </View>
                <View style={styles.eventLocation}>
                    <Text style={styles.subTitle}>{event.location.toUpperCase().split(",")[0]}</Text>
                </View>
                <View style={styles.fighterRow}>
                    <FighterProfile fighter={event.redFighter} isRedFighter={true} />
                    <FighterProfile fighter={event.blueFighter} isRedFighter={false} />
                </View>
                <View style={styles.versusBadge}>
                    <Text style={styles.versusText}>VS</Text>
                </View>
                <View style={styles.predictionsContainer}>
                    <View style={styles.predictions}>
                        <Text style={styles.subTitle}>+ 1,995 Predictions</Text>
                    </View>
                </View>
            </LinearGradient>
        </Pressable>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 20
    }


})