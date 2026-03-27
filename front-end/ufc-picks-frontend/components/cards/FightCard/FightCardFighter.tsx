import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";
import FightCardTopper from "./FightCardTopper";
import { FighterSummary } from "@/types/FighterSummary";
import { COLORS } from "@/theme/colors";

type Props = {
    fighter: FighterSummary,
    isSelected: Boolean,
    isDimmed: Boolean
    onPress: () => void,
    isLocked: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<Boolean>>;
    setModalFighter: React.Dispatch<React.SetStateAction<FighterSummary | null>>
}

export default function FightCardFighter({ fighter, isSelected, onPress, isDimmed, isLocked, setShowModal, setModalFighter }: Props) {

    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: isDimmed ? .4 : 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    }, [isDimmed])

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
            bounciness: 1000
        }).start();
    }

    function handleName() {
        if (fighter.firstName.concat(fighter.lastName).length > 20) {
            return (
                <Text style={styles.fighterName}>{fighter.lastName}</Text>
            )
        } else {
            return (
                <Text style={styles.fighterName}>{fighter.firstName} {fighter.lastName}</Text>
            )
        }
    }

    return (
        <Animated.View style={[styles.testFighterContainer, { opacity }]}>
            <View style={styles.fighterContainer}>
                <Pressable
                    onPressIn={() => handlePressIn()}
                    onPressOut={() => handlePressOut()}
                    onPress={onPress}
                    onLongPress={(() => {
                        setShowModal(true);
                        setModalFighter(fighter);
                    })}
                    disabled={isLocked}>
                    <Animated.View style={[isSelected ? styles.fighterImageContainerSelected : styles.fighterImageContainerNotSelected, { transform: [{ scale }] }]}>
                        <View style={styles.fighterImageContainer}>
                            <Image source={{ uri: fighter.imageUrl }} style={styles.fighterImage} />
                        </View>
                    </Animated.View>
                </Pressable>
            </View>
            <View style={styles.fighterNameContainer}>
                {fighter.ranking !== null ?
                    <View style={[{ marginEnd: 2, alignItems: "center", justifyContent:"center", height: 18, width: 18, backgroundColor: "#2b2b2b", borderRadius: 9}, fighter.ranking === 1 ? {backgroundColor: COLORS.goldText} : {backgroundColor: "#2b2b2b"}]}>
                        <Text style={{color: COLORS.lightText, fontWeight: 700, fontSize: 12}}>{fighter.ranking === 1 ? "C" : `${fighter.ranking - 1}`}</Text>
                    </View>
                    :
                    <></>
                }
                {handleName()}
            </View>
        </Animated.View>


    )
}

const styles = StyleSheet.create({

    testFighterContainer: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
    },

    fighterContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    fighterImageContainer: {
        height: 105,
        width: 105,
        borderWidth: 3,
        borderRadius: "50%",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },

    fighterImageContainerNotSelected: {
        height: 105,
        width: 105,
        borderWidth: 3,
        borderColor: "#1a1a1a",
        borderRadius: "50%",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#252525"
    },

    fighterImageContainerSelected: {
        height: 105,
        width: 105,
        borderWidth: 6,
        borderRadius: "50%",
        borderColor: COLORS.goldText,
        backgroundColor: "#252525",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },

    fighterImage: {
        height: 105,
        width: 120
    },

    fighterNameContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

    },

    fighterName: {
        fontWeight: 600,
        textAlign: "center",
        color: COLORS.lightText
    }

});