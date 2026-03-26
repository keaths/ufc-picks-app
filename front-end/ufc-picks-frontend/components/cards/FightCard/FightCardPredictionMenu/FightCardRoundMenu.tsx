import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";
import OptionButton from "./OptionButton/OptionButton";
import { COLORS } from "@/theme/colors";

type Props = {
    setRound: React.Dispatch<React.SetStateAction<number | null>>;
    selectedRound: number | null;
}

export default function FightCardRoundMenu({ setRound, selectedRound }: Props) {

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
                <Text style={styles.methodTopperText}>PREDICTED ROUND</Text>
            </View>
            <View style={styles.roundButtonRowContainer}>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"1"} onPress={() => setRound(1)} selected={selectedRound === 1} />
                </View>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"2"} onPress={() => setRound(2)} selected={selectedRound === 2}/>
                </View>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"3"} onPress={() => setRound(3)} selected={selectedRound === 3}/>
                </View>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"4"} onPress={() => setRound(4)} selected={selectedRound === 4}/>
                </View>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"5"} onPress={() => setRound(5)} selected={selectedRound === 5}/>
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
        borderColor: COLORS.goldText
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

    roundButtonRowContainer: {
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
        width: "20%",
        height: "100%",
        padding: 5
    },

    methodButton: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        width: "100%",
        height: "100%",
        borderRadius: 18
    }

});