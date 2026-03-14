import { FighterSummary } from "@/types/FighterSummary";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, } from "react-native-reanimated";


type Props = {
    fighter: FighterSummary;
    isRedFighter: boolean;
    onPress: () => void;
    isSelected: boolean;
    isOtherSelected: boolean;
}

export default function EventFighterProfile({ fighter, isRedFighter, onPress, isSelected = false, isOtherSelected = false }: Props) {

    const scale = useSharedValue(1);
    const overlayOpacity = useSharedValue(0);

    useEffect(() => {
        if (isSelected) {
            scale.value = withTiming(1.05, { duration: 180 });
            overlayOpacity.value = withTiming(1, { duration: 180 });
        } else if (isOtherSelected) {
            scale.value = withTiming(0.95, { duration: 180 });
            overlayOpacity.value = withTiming(0.25, { duration: 180 });
        } else {
            scale.value = withTiming(1, { duration: 180 });
            overlayOpacity.value = withTiming(1, { duration: 180 });
        }
    }, [isSelected, isOtherSelected]);

    const animatedCardStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: overlayOpacity.value,
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    return (
        <View style={styles.fighterProfile}>
            {isRedFighter ?
                <Pressable style={styles.pressable}
                    onPress={onPress}>
                    <Animated.View style={[animatedCardStyle]}>
                        <LinearGradient
                            colors={["#8b0000a5", "#ff000000"]}
                            style={[styles.fighterProfileCard, { borderColor: "rgba(255, 73, 73, 0.38)" }]}>
                            <Image source={{ uri: fighter.imageUrl }} style={{ height: 100, width: 120 }}></Image>
                            <View style={styles.rankingRed}>
                                <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>#15</Text>
                            </View>                            
                        </LinearGradient>
                    </Animated.View>
                </Pressable>

                :

                <Pressable
                    onPress={onPress}
                    style={styles.pressable}>
                    <Animated.View style={[animatedCardStyle]}>
                        <LinearGradient
                            colors={["#001f5caf", "#0051ff00"]}
                            style={[styles.fighterProfileCard, { borderColor: "rgba(32, 138, 253, 0.47)" }]}>
                            <Image source={{ uri: fighter.imageUrl }} style={{ height: 100, width: 120 }}></Image>
                            <View style={styles.rankingBlue}>
                                <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>#15</Text>
                            </View>
                        </LinearGradient>
                    </Animated.View>
                </Pressable>

            }
            <View>
                <Text style={styles.lastName}>{fighter.firstName.toUpperCase()} {fighter.lastName.toUpperCase()}</Text>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({

    fighterProfile: {
        width: "50%",
        alignItems: "center",
        paddingStart: 4,
        paddingEnd: 4,
    },

    fighterProfileCard: {
        width: "100%",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1
    },

    lastName: {
        color: "white",
        fontWeight: 700,
        fontSize: 12,
        paddingTop: 5
    },

    rankingBlue: {
        position: "absolute",
        right: 10,
        top: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    rankingRed: {
        position: "absolute",
        left: 10,
        top: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    redSelect: {

    },

    blueSelect: {

    },

    pressable: {
        width: "100%"
    }
})