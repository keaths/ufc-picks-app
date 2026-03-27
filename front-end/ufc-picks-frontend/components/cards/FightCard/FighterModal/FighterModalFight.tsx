import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Modal } from "react-native";
import { FighterSummary } from "@/types/FighterSummary";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import FighterModalMetrics from "./FighterModalMetrics";

type Props = {
    fighter: FighterSummary | null,
}

export default function FighterModalFight({ fighter }: Props) {

    return (

        <View style={{ height: "20%", width: "100%", borderBottomWidth: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
            <View style={{ height: 18, width: 18, borderRadius: "50%", backgroundColor: COLORS.correct, justifyContent: "center", alignItems: "center", marginEnd: 10 }}>
                <Text style={{ fontWeight: 700, fontSize: 12, color: COLORS.lightText }}>W</Text>
            </View>
            <Text style={{ fontWeight: 700, color: COLORS.lightText }}> Sean Brady </Text>
            <Text style={{ marginStart: "auto", fontWeight: 500, color: COLORS.lightText }}>Decision</Text>
        </View>

    )
}

const styles = StyleSheet.create({

    metricTitle: {
        fontWeight: 700,
        color: COLORS.goldText
    },

});