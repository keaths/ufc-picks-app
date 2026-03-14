import { FightCard } from "@/types/FightCard";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import EventFighterProfile from "./EventFighterProfile";
import PickDetails from "./PickDetails/PickDetails";

type Props = {
    fight: FightCard
};

type Method = "DECISION" | "KO_TKO" | "SUBMISSION" | null;

export default function EventFight({ fight }: Props) {

    const [selectedFighterId, setSelectedFighterId] = useState<number | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
    const [selectedRound, setSelectedRound] = useState<number | null>(null);

    function handleSelect(fighterId: number) {
        if (fighterId === selectedFighterId) {
            setSelectedFighterId(null);
            setSelectedMethod(null);
            setSelectedRound(null);
        } else if(selectedFighterId === null){
            setSelectedFighterId(fighterId);
        } else if(fighterId !== selectedFighterId){
            setSelectedFighterId(fighterId);
            setSelectedMethod(null);
            setSelectedRound(null);
        } 
    }

    return (
        <Animated.View
            layout={LinearTransition.duration(300)}>
            <LinearGradient
                colors={["#fdfdfd00", "#fdfdfd29"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.eventCard}>
                <LinearGradient
                    colors={["rgba(255, 255, 255, 0.21).06)", "transparent"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                />
                <View style={styles.eventTopper}>
                    <View style={styles.eventTitleContainer}>
                        <Text style={styles.header}>{fight.weightClass.toUpperCase()} {fight.isTitleFight ? "TITLE" : ""} BOUT</Text>
                    </View>
                    {/* <View style={styles.eventDate}>
                    <Text style={styles.subTitle}>testt</Text>
                </View> */}
                </View>
                {/* <View style={styles.eventLocation}>
                <Text style={styles.subTitle}></Text>
            </View> */}
                <View style={styles.fighterRow}>
                    <EventFighterProfile fighter={fight.redFighter} isRedFighter={true} onPress={() => handleSelect(fight.redFighter.fighterId)}
                     isSelected={selectedFighterId === fight.redFighter.fighterId}
                     isOtherSelected={selectedFighterId !== null && selectedFighterId !== fight.redFighter.fighterId}/>
                    <EventFighterProfile fighter={fight.blueFighter} isRedFighter={false} onPress={() => handleSelect(fight.blueFighter.fighterId)}
                     isSelected={selectedFighterId === fight.blueFighter.fighterId}
                     isOtherSelected={selectedFighterId !== null && selectedFighterId !== fight.blueFighter.fighterId} />
                    <View style={styles.versusBadge}>
                        <Text style={styles.versusText}>VS</Text>
                    </View>
                </View>
                {selectedFighterId !== null &&
                    <Animated.View
                        entering={FadeIn.duration(300).delay(50)}
                    // exiting={FadeOutUp.duration(140)}
                    >
                        <PickDetails selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}
                         selectedRound={selectedRound} setSelectedRound={setSelectedRound}
                          fightId={fight.fightId} fighterId={selectedFighterId} setFighterId={setSelectedFighterId} endRound={selectedRound}
                          />
                    </Animated.View>
                }

                {/* <View style={styles.predictionsContainer}>
                <View style={styles.predictions}>
                    <Text style={styles.subTitle}>test</Text>
                </View>
            </View> */}
            </LinearGradient>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    

    
    eventCard: {
        width: "90%",
        borderRadius: 18,
        margin: 10,
    },

    eventTopper: {
        paddingStart: 8,
        flexDirection: "row",
        justifyContent: "center",
    },

    eventLocation: {
        paddingStart: 8,
        paddingBottom: 0,
        alignItems: "flex-start",
        justifyContent: "center",
    },

    eventTitleContainer: {
        paddingTop: 3,
        paddingBottom: 3,
        justifyContent: "center",
        alignItems: "center",
    },

    eventDate: {
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(234, 56, 56, 0.69)",
        borderRadius: 10
    },

    fighterRow: {
        flexDirection: "row",
        paddingBottom: 5
    },

    versusBadge: {
        position: "absolute",
        top: "40%",
        left: "50%",
        backgroundColor: "#151515",
        transform: [
            { translateX: -15 },
            { translateY: -3 }
        ],
        borderRadius: "50%",
        height: 30,
        width: 30,
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    versusText: {
        color: "white",
        fontWeight: 700,
        fontSize: 15,
    },

    predictionsContainer: {
        padding: 8,
        alignItems: "flex-start"
    },

    predictions: {
        padding: 5,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        alignItems: "flex-start",
    },

    subTitle: {
        color: "white",
        fontWeight: 700,
        fontSize: 11
    },

    header: {
        color: "white",
        fontWeight: 700,
        fontSize: 15
    }
})