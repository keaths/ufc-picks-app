import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Modal } from "react-native";
import { FighterSummary } from "@/types/FighterSummary";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { styleText } from "node:util";

type Props = {
    fighter: FighterSummary | null,
}

export default function FighterModalMetrics({ fighter }: Props) {

    return (

        <View style={styles.metricContainer}>
            <View style={styles.metricOutline}>
                <Text style={styles.metricTitle}>Record: <Text style={styles.metric}>11-2-4</Text></Text>
            </View>
            <View style={styles.metricOutline}>
                <Text style={styles.metricTitle}>Weight: <Text style={styles.metric}>170 lb</Text></Text>
            </View>
            <View style={styles.metricOutline}>
                <Text style={styles.metricTitle}>Reach: <Text style={styles.metric}>75.5"</Text></Text>
            </View>
            <View style={styles.metricOutline}>
                <Text style={styles.metricTitle}>Stance: <Text style={styles.metric}>Orthodox</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    metricContainer: {
        height: "25%",
    },

    metricOutline: {
        height: "25%",
        width: "100%",
        justifyContent: "center",
        borderBottomWidth: 1, 
        borderColor: "rgba(0, 0, 0, 0.35)"
    },

    metricTitle: {
        fontWeight: 700,
        color: COLORS.goldText
    },

    metric: {
        fontWeight: 500,
        color: COLORS.lightText
    }

});