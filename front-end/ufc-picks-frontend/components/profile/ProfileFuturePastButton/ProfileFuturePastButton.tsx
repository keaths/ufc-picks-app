
import { getUpcomingPickedEvents } from "@/api/getUpcomingPickedEvents";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMetric from "@/components/profile/ProfileMetric";
import ProfilePicks from "@/components/profile/ProfilePick/ProfilePick";
import { COLORS } from "@/theme/colors";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Animated } from "react-native";
import { Event } from "@/types/Event";
import { useFocusEffect } from "expo-router";
import React from "react";
import { getPastPickedEvents } from "@/api/getPastPickedEvents";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    setIsUpcoming: React.Dispatch<React.SetStateAction<Boolean>>,
    isUpcoming: Boolean
}

export default function ProfileFuturePastButton({ setIsUpcoming, isUpcoming }: Props) {

    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
            speed: 70,
            bounciness: 6,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 70,
            bounciness: 6,
        }).start();
    };

    return (

        <View style={styles.profileFutureButtonContainer}>
            <View style={styles.profileFutureButtonOutline}>
                <Pressable
                    style={styles.buttonContainer}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={(() => {
                        setIsUpcoming(true);
                        console.log(isUpcoming);
                    })}>
                    {isUpcoming ?
                        <LinearGradient
                            colors={[
                                "rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)",
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ height: "100%", width: "100%" }}>
                            <Animated.View style={[styles.buttonOutline, { transform: [{ scale: scale }] }]}>
                                <Text style={styles.buttonText}>Upcoming</Text>
                            </Animated.View>
                        </LinearGradient>
                        :
                        <Animated.View style={[styles.buttonOutline, { transform: [{ scale: scale }] }]}>
                            <Text style={styles.buttonText}>Upcoming</Text>
                        </Animated.View>
                    }
                </Pressable>
                <Pressable
                    style={[styles.buttonContainer, {borderRightWidth: 0}]}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    onPress={(() => {
                        setIsUpcoming(false);
                        console.log(isUpcoming);
                    })}>
                    {!isUpcoming ?
                        <LinearGradient
                            colors={[
                                "rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)",
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ height: "100%", width: "100%" }}>
                            <Animated.View style={[styles.buttonOutline, { transform: [{ scale: scale }] }]}>
                                <Text style={styles.buttonText}>Past</Text>
                            </Animated.View>
                        </LinearGradient>
                        :
                        <Animated.View style={[styles.buttonOutline, { transform: [{ scale: scale }] }]}>
                            <Text style={styles.buttonText}>Past</Text>
                        </Animated.View>
                    }
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    profileFutureButtonContainer: {
        width: "50%",
        marginStart: "auto",
        height: "100%",
        padding: 5,
        borderRadius: 18
    },

    profileFutureButtonOutline: {
        height: "100%",
        backgroundColor: "#2b2b2b",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.goldText,
        flexDirection: "row",
        overflow: "hidden"
    },

    buttonContainer: {
        width: "50%",
        height: "100%",
        borderRightWidth: 2,
        borderColor: COLORS.goldText,
    },

    buttonOutline: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    buttonOutlineSelected: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.goldText,
    },

    buttonText: {
        color: COLORS.lightText,
        fontWeight: 700
    }



});