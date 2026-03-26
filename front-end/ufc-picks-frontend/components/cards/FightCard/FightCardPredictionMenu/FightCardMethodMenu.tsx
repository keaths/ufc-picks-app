import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";
import OptionButton from "./OptionButton/OptionButton";
import { COLORS } from "@/theme/colors";

type Props = {
    setMethod: React.Dispatch<React.SetStateAction<Method | null>>;
    selectedMethod: Method | null;
}

type Method = "KO_TKO" | "SUBMISSION" | "DECISION"


export default function FightCardMethodMenu({ setMethod, selectedMethod }: Props) {

    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: .93,
            useNativeDriver: true,
            speed: 70,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 70,
        }).start();
    }

    return (
        <View style={styles.methodContainer}>
            <View style={styles.methodTopper}>
                <Text style={styles.methodTopperText}>PREDICTED METHOD</Text>
            </View>
            <View style={styles.methodButtonRowContainer}>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"KO/TKO"} onPress={() => setMethod("KO_TKO")} selected={selectedMethod === "KO_TKO"} />
                </View>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"SUB"} onPress={() => setMethod("SUBMISSION")} selected={selectedMethod === "SUBMISSION"} />
                </View>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"DECISION"} onPress={() => setMethod("DECISION")} selected={selectedMethod === "DECISION"} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    methodContainer: {
        height: 90,
        justifyContent: "flex-start",
        alignItems: "center",
        borderTopWidth: 1,
        backgroundColor: "#202020",
    },

    methodTopper: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "30%",
        borderBottomWidth: 1,
        borderColor: COLORS.goldText
    },

    methodTopperText: {
        fontWeight: "700",
        color: COLORS.lightText
    },

    methodButtonRowContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        height: "70%",
        paddingTop: 5,
        paddingBottom: 5,
        paddingStart: 18,
        paddingEnd: 18,
    },

    methodButtonContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "33.33%",
        height: "100%",
        padding: 5,
    },

});