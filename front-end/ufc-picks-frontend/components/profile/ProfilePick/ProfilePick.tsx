
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMetric from "@/components/profile/ProfileMetric";
import { View, Text, StyleSheet, ScrollView, Animated, Easing, Pressable } from "react-native";
import EventCard from "../../cards/EventCard/EventCard";
import { COLORS } from "@/theme/colors";
import ProfilePickHeader from "./ProfilePickHeader";
import ProfilePickFighterRow from "./ProfilePickFighterRow";
import ProfilePickMetrics from "./ProfilePickMetrics";
import { Event } from "@/types/Event";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";

type Props = {
    event: Event,
    index: number,
    animationKey: number,
    onOpen: () => void;
    isUpcoming: Boolean
}

export default function ProfilePicks({ event, index, animationKey, onOpen, isUpcoming }: Props) {

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
        <Animated.View style={[styles.picksContainer, { opacity: opacity, transform: [{ translateY: translateY }, {scale: scale}] }]}>
            <Pressable 
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={() => {
                    onOpen();
                    router.push({
                    pathname: "/event/[eventId]",
                    params: { eventId: String(event.eventId) }
                })}}>
                <ProfilePickHeader title={event.eventName} date={event.eventDate} />
                <View style={styles.testEventDetails}>
                    <ProfilePickFighterRow redLast={event.redFighter.lastName} blueLast={event.blueFighter.lastName} />
                    <ProfilePickMetrics pickCount={event.pickCount} fightCount={event.fightCount} animationKey={0} correctPick={event.correctPicks} isUpcoming={isUpcoming} />
                </View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    picksContainer: {
        width: "100%",
        borderRadius: 18,
        height: 117,
        marginBottom: 16,
        overflow: "hidden"
    },

    pick: {
        width: "100%",
        height: 100,
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 18
    },

    test: {

    },

    testTopper: {
        flexDirection: "row",
        paddingStart: 8,
        paddingEnd: 8,
        width: "100%",
        height: "30%",
        borderBottomWidth: 1,
        justifyContent: "flex-start",
        alignItems: "center"
    },

    testUfc: {
        fontSize: 16,
        color: COLORS.goldText,
        fontWeight: 800
    },

    testEventTitle: {
        fontSize: 16,
        color: COLORS.lightText,
        fontWeight: 700,
    },

    testEventDate: {
        fontWeight: 700,
        marginStart: "auto"
    },

    testEventDetails: {
        height: "70%",
        justifyContent: "flex-start",
        alignItems: "center",
    },


});