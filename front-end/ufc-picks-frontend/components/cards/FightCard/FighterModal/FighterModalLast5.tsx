import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Modal } from "react-native";
import { FighterSummary } from "@/types/FighterSummary";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import FighterModalMetrics from "./FighterModalMetrics";
import FighterModalFight from "./FighterModalFight";

type Props = {
    fighter: FighterSummary | null,
}

export default function FighterModalLast5({ fighter }: Props) {

    return (
        <View style={{ height: "38%", width: "100%", borderColor: "rgba(0, 0, 0, 0.21)" }}>
            <View style={{ height: "20%", width: "100%", justifyContent: "center", borderBottomWidth: 1, }}>
                <Text style={styles.metricTitle}>Last 5 fights</Text>
            </View>
            <View style={{ height: "80%", width: "100%" }}>
                <FighterModalFight fighter={fighter}/>
                <FighterModalFight fighter={fighter}/>
                <FighterModalFight fighter={fighter}/>
                <FighterModalFight fighter={fighter}/>
                <FighterModalFight fighter={fighter}/>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    metricTitle: {
        fontWeight: 700,
        color: COLORS.goldText
    },

});