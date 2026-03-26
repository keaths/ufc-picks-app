import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";
import OptionButton from "./OptionButton/OptionButton";
import { COLORS } from "@/theme/colors";

type Props = {
    onPress: () => void;
}

export default function FightCardSaveButton({ onPress }: Props) {

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
                <Text style={styles.methodTopperText}>SAVE</Text>
            </View>
            <View style={styles.roundButtonRowContainer}>
                <View style={styles.methodButtonContainer}>
                    <OptionButton label={"SAVE PICK"} onPress={onPress} selected={false} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    methodContainer: {
        height: 90,
        justifyContent: "center",
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
        justifyContent: "center",
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
        width: "80%",
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