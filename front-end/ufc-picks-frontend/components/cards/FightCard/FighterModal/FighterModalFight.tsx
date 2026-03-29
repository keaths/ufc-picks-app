import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Modal } from "react-native";
import { FighterSummary } from "@/types/FighterSummary";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import FighterModalMetrics from "./FighterModalMetrics";
import { Fight } from "@/types/FightCard";

type Props = {
    fight: Fight | null,
    fighter: FighterSummary | null
}

export default function FighterModalFight({ fight, fighter }: Props) {

    const method = fight && fight.method;

    function handleWin() {
        if ((fight?.winnerCorner === "RED" && fight.redFighter.fighterId === fighter?.fighterId) ||
            fight?.winnerCorner === "BLUE" && fight.blueFighter.fighterId === fighter?.fighterId) {
            return (
                <View style={{ height: 18, width: 18, borderRadius: "50%", backgroundColor: COLORS.correct, justifyContent: "center", alignItems: "center", marginEnd: 10 }}>
                    <Text style={{ fontWeight: 700, fontSize: 12, color: COLORS.lightText }}>W</Text>
                </View>
            )
        } else {
            return (
                <View style={{ height: 18, width: 18, borderRadius: "50%", backgroundColor: COLORS.incorrect, justifyContent: "center", alignItems: "center", marginEnd: 10 }}>
                    <Text style={{ fontWeight: 700, fontSize: 12, color: COLORS.lightText }}>L</Text>
                </View>
            )
        }
    }

    const opponent = () => {
        if (fighter?.fighterId === fight?.redFighter.fighterId) {
            return fight?.blueFighter;
        } else {
            return fight?.redFighter;
        }
    }

    function handleMethod(method: string | null) {
        if (method === "DECISION") {
            return "Decision"
        } else if (method === "SUBMISSION") {
            return "Submission"
        } else {
            return "KO/TKO"
        }
    }

    return (

        <View style={{ height: "20%", width: "100%", borderBottomWidth: 1, justifyContent: "flex-start", flexDirection: "row", alignItems: "center" }}>
            {handleWin()}
            <Text style={{ fontWeight: 500, color: COLORS.lightText }}> {opponent()?.firstName} {opponent()?.lastName}</Text>
            <Text style={{ marginStart: "auto", fontWeight: 500, color: COLORS.lightText }}>{handleMethod(method)}</Text>
        </View>

    )
}

const styles = StyleSheet.create({

    metricTitle: {
        fontWeight: 700,
        color: COLORS.goldText
    },

});