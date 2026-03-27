import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";
import FightCardTopper from "./FightCardTopper";
import FightCardFighter from "./FightCardFighter";
import { FighterSummary } from "@/types/FighterSummary";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/colors";

type Props = {
    redFighter: FighterSummary
    blueFighter: FighterSummary
    selectedFighter: FighterSummary | null,
    setSelectedFighter: React.Dispatch<React.SetStateAction<FighterSummary | null>>;
    isLocked: boolean;
    isEditing: Boolean;
    setSelectedMethod: React.Dispatch<React.SetStateAction<Method | null>>;
    setSelectedRound: React.Dispatch<React.SetStateAction<number | null>>;
    setShowModal: React.Dispatch<React.SetStateAction<Boolean>>;
    setModalFigther: React.Dispatch<React.SetStateAction<FighterSummary | null>>;

}

type Method = "KO_TKO" | "SUBMISSION" | "DECISION"


export default function FightCardFighterRow({ redFighter, blueFighter, selectedFighter, setSelectedFighter, isLocked, isEditing, setSelectedMethod, setSelectedRound, setShowModal, setModalFigther }: Props) {

    const isRedSelected = selectedFighter?.fighterId === redFighter.fighterId;
    const isBlueSelected = selectedFighter?.fighterId === blueFighter.fighterId;

    const shouldDimRed = selectedFighter !== null && !isRedSelected;
    const shouldDimBlue = selectedFighter !== null && !isBlueSelected;

    function handleSelection(fighter: FighterSummary) {
        if (fighter.fighterId === selectedFighter?.fighterId && !isEditing) {
            setSelectedFighter(null);
            setSelectedMethod(null);
            setSelectedRound(null);
        } else if (fighter.fighterId !== selectedFighter?.fighterId) {
            setSelectedFighter(fighter);
            setSelectedMethod(null);
            setSelectedRound(null);
        }
    }

    return (
        <LinearGradient 
            style={styles.gradient}
            colors={["rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.fightRowContainer}>
                <FightCardFighter
                    fighter={redFighter}
                    isSelected={isRedSelected}
                    onPress={() => handleSelection(redFighter)}
                    isDimmed={shouldDimRed}
                    isLocked={isLocked} 
                    setShowModal={setShowModal} 
                    setModalFighter={setModalFigther} />
                <View style={styles.vs}>
                    <Text style={styles.vsText}>VS</Text>
                </View>
                <FightCardFighter
                    fighter={blueFighter}
                    isSelected={isBlueSelected}
                    onPress={() => handleSelection(blueFighter)}
                    isDimmed={shouldDimBlue}
                    isLocked={isLocked} 
                    setShowModal={setShowModal} 
                    setModalFighter={setModalFigther} />
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    gradient: {
        width: "100%",
        height: 130
    },

    fightRowContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.goldText
    },

    vs: {
        position: "absolute",
        height: 50,
        width: 50,
        left: 159,
        top: 45,
        justifyContent: "center",
        alignItems: "center"
    },

    vsText: {
        fontSize: 22,
        fontWeight: 800,
        color: COLORS.lightText
    }

});