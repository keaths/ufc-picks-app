import { getEventDetails } from "@/api/getEventDetails";
import { COLORS } from "@/theme/colors";
import { EventDetails } from "@/types/EventDetails";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";

type Props = {
    weightClass: string | undefined,
    isTitleBout: boolean
}

export default function FightCardTopper({ weightClass, isTitleBout }: Props) {

    return (
        <LinearGradient
            colors={["#2b2b2b", "#2b2b2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.fightTopper, {borderTopLeftRadius: 18, borderTopRightRadius: 18}]}>
            <Text style={styles.boutText}>{weightClass?.toUpperCase()} {isTitleBout ? "TITLE" : ""} BOUT</Text>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    fightTopper: {
        height: 44,
        borderBottomWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    boutText: {
        fontSize: 16,
        fontWeight: "800",
        color: COLORS.lightText
    }

});