import { getEvents } from "@/api/getEvents";
import { Event } from "@/types/Event";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Easing } from "react-native";
import EventTopper from "./EventTopper";
import EventFighterRow from "./EventFighterRow";
import EventPickDetails from "./EventPickDetails";
import { useRouter } from "expo-router";
import { COLORS } from "@/theme/colors";

type Props = {
    event: Event,
    index: number,
    animationKey: number,
    onOpen: () => void;
}

export default function EventCard({ event, index, animationKey, onOpen }: Props) {
    const router = useRouter();

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

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(10)).current;


    useEffect(() => {
        opacity.setValue(0);
        translateY.setValue(10);

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                delay: index * 160,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 350,
                delay: index * 160,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true
            })
        ]).start();
    }, [animationKey]);

    return (
        <Animated.View style={{ opacity: opacity, transform: [{ translateY: translateY }] }}>
            <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => {
                    onOpen();
                    router.push({
                    pathname: "/event/[eventId]",
                    params: { eventId: String(event.eventId) }
                })}}>
                <Animated.View style={[styles.test, { transform: [{ scale }] }]}>
                    <EventTopper eventName={event.eventName} eventDate={event.eventDate} />
                    <EventFighterRow redFighter={event.redFighter} blueFighter={event.blueFighter} />
                    <EventPickDetails pickCount={event.pickCount} fightCount={event.fightCount} />
                </Animated.View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    test: {
        height: 210,
        width: "100%",
        borderRadius: 18,
        overflow: "hidden",
    },

});
