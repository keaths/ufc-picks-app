import { ExistingPick } from "@/api/getPicks";
import { FightCard } from "@/types/FightCard";
import { FighterSummary } from "@/types/FighterSummary";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import EventFighterProfile from "./EventFighterProfile";
import PickDetails from "./PickDetails/PickDetails";
import SavedPick from "./PickDetails/SavedPick";

type Props = {
    fight: FightCard;
    pick?: ExistingPick;
};

type Method = "DECISION" | "KO_TKO" | "SUBMISSION" | null;

export default function EventFight({ fight, pick }: Props) {

    const [selectedFighterId, setSelectedFighterId] = useState<number | null>(null);
    const [selectedFighter, setSelectedFighter] = useState<FighterSummary | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
    const [selectedRound, setSelectedRound] = useState<number | null>(null);
    const [isPicked, setIsPicked] = useState<boolean | null>(null);
    const [isEditing, setIsEditing] = useState<boolean | null>(null);
    const [isExpanded, setIsExpanded] = useState<boolean | null>(false);
    const [isDisabled, setIsDisabled] = useState<boolean | null>(false);

    function handleSelect(fighterId: number, fighter: FighterSummary) {
        if (fighterId !== selectedFighterId && isEditing) {
            setSelectedFighterId(fighterId);
            setSelectedFighter(fighter);
            setSelectedMethod(null);
            setSelectedRound(null); 
        } else if((fighterId === selectedFighterId && fighterId === pick?.pickedFighterId) && isEditing){
            setSelectedFighterId(fighterId);
            setSelectedFighter(selectedFighter);
            setSelectedMethod(pick.pickedMethod);
            setSelectedRound(pick.pickedRound);
            setIsPicked(true);
            setIsExpanded(false);
            setIsDisabled(true);
        } else if(pick && (fighterId === selectedFighterId && fighterId !== pick?.pickedFighterId) && isEditing){
            setSelectedFighterId(pick.pickedFighterId);
            setSelectedFighter(pick.pickedFighter);
            setSelectedMethod(pick.pickedMethod);
            setSelectedRound(pick.pickedRound);
            setIsPicked(true);
            setIsExpanded(false);
            setIsDisabled(true);
        } else if (fighterId === selectedFighterId && !isEditing) {
            setIsExpanded(false);
            setSelectedFighterId(null);
            setSelectedMethod(null);
            setSelectedRound(null);
        } else if (fighterId === selectedFighterId && isEditing) {
            setIsExpanded(false);
            setIsPicked(true);
            setIsDisabled(true);
        } else if (selectedFighterId === null) {
            setIsExpanded(true);
            setSelectedFighterId(fighterId);
            setSelectedFighter(fighter);
        } else if (fighterId !== selectedFighterId) {
            setIsExpanded(true);
            setSelectedFighterId(fighterId);
            setSelectedFighter(fighter);
            setSelectedMethod(null);
            setSelectedRound(null);
        } 
    }

    function handleEdit(){
        setIsPicked(false);
        setIsExpanded(true);
        setIsDisabled(false);
        setIsEditing(true);
    }

    useEffect(() => {
        if(!pick){
            return;
        }
        setSelectedFighterId(pick.pickedFighterId);
        setSelectedFighter(pick.pickedFighter);
        setSelectedMethod(pick.pickedMethod);
        setSelectedRound(pick.pickedRound);
        setIsPicked(true);
        setIsDisabled(true);
    }, [pick])

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
                </View>
                <View style={styles.fighterRow}>
                    <EventFighterProfile fighter={fight.redFighter} isRedFighter={true} onPress={() => handleSelect(fight.redFighter.fighterId, fight.redFighter)}
                        isSelected={selectedFighterId === fight.redFighter.fighterId}
                        isOtherSelected={selectedFighterId !== null && selectedFighterId !== fight.redFighter.fighterId} isDisabled={isDisabled}/>
                    <EventFighterProfile fighter={fight.blueFighter} isRedFighter={false} onPress={() => handleSelect(fight.blueFighter.fighterId, fight.blueFighter)}
                        isSelected={selectedFighterId === fight.blueFighter.fighterId}
                        isOtherSelected={selectedFighterId !== null && selectedFighterId !== fight.blueFighter.fighterId} isDisabled={isDisabled}/>
                    <View style={styles.versusBadge}>
                        <Text style={styles.versusText}>VS</Text>
                    </View>
                </View>
                {isExpanded !== false &&
                    <Animated.View
                        entering={FadeIn.duration(300).delay(50)}
                    // exiting={FadeOutUp.duration(140)}
                    >
                        <PickDetails selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod}
                            selectedRound={selectedRound} setSelectedRound={setSelectedRound}
                            fightId={fight.fightId} fighterId={selectedFighterId} setFighterId={setSelectedFighterId} endRound={selectedRound}
                            isPicked={isPicked} setIsPicked={setIsPicked} setIsExpanded={setIsExpanded} setIsDisabled={setIsDisabled} setIsEditing={setIsEditing}
                        />
                    </Animated.View>
                }
                {isPicked &&
                    <SavedPick selectedMethod={selectedMethod} selectedRound={selectedRound}
                     fighter={selectedFighter} isPicked={isPicked}
                      setIsPicked={setIsPicked} onPress={handleEdit} 
                      setIsDisabled={setIsDisabled} />
                }
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