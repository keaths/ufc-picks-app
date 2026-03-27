import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Modal } from "react-native";
import { FighterSummary } from "@/types/FighterSummary";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import FighterModalMetrics from "./FighterModalMetrics";
import FighterModalLast5 from "./FighterModalLast5";

type Props = {
    setShowModal: React.Dispatch<React.SetStateAction<Boolean>>;
    setModalFighter: React.Dispatch<React.SetStateAction<FighterSummary | null>>;

}

export default function FighterModalClose({ setShowModal, setModalFighter }: Props) {

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

        <View style={{ height: "15%", width: "100%", justifyContent: "center", alignItems: "center", paddingStart: 20, paddingEnd: 20, paddingTop: 10, paddingBottom: 10 }}>
            <Pressable
                style={{ height: "100%", width: "100%" }}
                onPress={(() => {
                    setShowModal(false);
                    setModalFighter(null);
                })}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}>
                <Animated.View style={{ height: "100%", width: "100%", transform: [{ scale }] }}>
                    <LinearGradient
                        style={styles.methodButton}
                        colors={["rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}>
                        <Text style={styles.methodButtonText}>CLOSE</Text>
                    </LinearGradient>
                </Animated.View>
            </Pressable>
        </View>

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

    methodButtonText: {
        color: COLORS.lightText,
        fontWeight: 700,
        fontSize: 18
    }

});