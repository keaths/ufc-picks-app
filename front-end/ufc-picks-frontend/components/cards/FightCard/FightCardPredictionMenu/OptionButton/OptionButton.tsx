import { getEventDetails } from "@/api/getEventDetails";
import { COLORS } from "@/theme/colors";
import { EventDetails } from "@/types/EventDetails";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";

type Props = {
    label: string,
    onPress: () => void;
    selected: boolean;
}

export default function OptionButton({ label, onPress, selected }: Props) {

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

    function handleSave() {
        if (label === "SAVE PICK") {
            return (
                <LinearGradient
                    colors={[
                        "rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height: "100%", width: "100%", borderRadius: 18 }}>
                    <Animated.View style={[styles.methodButtonSelected, { transform: [{ scale }] }]}>
                        <Text style={[styles.optionText]}>{label}</Text>
                    </Animated.View>
                </LinearGradient>
            )
        } else if (label === "Edit") {
            return (
                <Animated.View style={[styles.methodButton, { transform: [{ scale }] }, { borderColor: COLORS.goldText }]}>
                    <Text style={[styles.optionText]}>{label}</Text>
                </Animated.View>
            )
        }
        if (selected) {
            return (
                <LinearGradient
                    colors={[
                        "rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height: "100%", width: "100%", borderRadius: 18 }}>
                    <Animated.View style={[styles.methodButtonSelected, { transform: [{ scale }] }]}>
                        <Text style={[styles.optionText]}>{label}</Text>
                    </Animated.View>
                </LinearGradient>
            )
        } else {
            return (
                <Animated.View style={[styles.methodButton, { transform: [{ scale }] }]}>
                    <Text style={[styles.optionText]}>{label}</Text>
                </Animated.View>
            )
        }
    }

    return (
        <Pressable style={[styles.methodButton, { borderWidth: 0 }]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}>
            {handleSave()}
        </Pressable>
    )
}

const styles = StyleSheet.create({


    methodButton: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        width: "100%",
        height: "100%",
        borderRadius: 18,
        borderColor: COLORS.goldText
    },

    methodButtonSelected: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        width: "100%",
        height: "100%",
        borderRadius: 18,
        borderColor: COLORS.goldText
    },

    optionText: {
        fontWeight: 700,
        color: COLORS.lightText
    },

});