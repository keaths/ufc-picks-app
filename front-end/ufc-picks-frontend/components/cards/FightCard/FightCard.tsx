import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Easing } from "react-native";
import FightCardTopper from "./FightCardTopper";
import { Fight } from "@/types/FightCard";
import FightCardFighterRow from "./FightCardFighterRow";
import { FighterSummary } from "@/types/FighterSummary";
import FightCardMethodMenu from "./FightCardPredictionMenu/FightCardMethodMenu";
import FightCardRoundMenu from "./FightCardPredictionMenu/FightCardRoundMenu";
import FightCardSaveButton from "./FightCardPredictionMenu/FightCardSaveButton";
import FightCardPrediction from "./FightCardPrediction";
import { Picks } from "@/types/Picks";
import { getPicks } from "@/api/getPicks";
import { PickRequest } from "@/types/PickRequest";
import { COLORS } from "@/theme/colors";

type Props = {
    fight: Fight,
    eventId: number,
    existingPick: Picks | null,
    index: number,
}

type Method = "KO_TKO" | "SUBMISSION" | "DECISION"

export default function FightCard({ fight, eventId, existingPick, index }: Props) {

    const [selectedFighter, setSelectedFighter] = useState<FighterSummary | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<Method | null>(null);
    const [selectedRound, setSelectedRound] = useState<number | null>(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isEditing, setIsEditing] = useState<Boolean>(false);
    const [isLocked, setIsLocked] = useState<Boolean>(false);
    const [isPast, setIsPast] = useState<Boolean>(fight.status === "COMPLETED")

    console.log(fight.winnerCorner)

    const showMethodMenu = !isSaved && selectedFighter !== null;


    const showRoundMenu =
        !isSaved &&
        selectedFighter !== null &&
        selectedMethod !== null &&
        selectedMethod !== "DECISION"

    const showSaveButton =
        !isSaved &&
        selectedFighter !== null &&
        selectedMethod !== null &&
        (selectedMethod === "DECISION" || selectedRound !== null);

    const showEditButton = isSaved;

    useEffect(() => {
        if (selectedMethod === "DECISION") {
            setSelectedRound(null);
        }
    }, [selectedMethod])

    const roundHeight = useRef(new Animated.Value(0)).current;
    const roundOpacity = useRef(new Animated.Value(0)).current;

    const methodHeight = useRef(new Animated.Value(0)).current;
    const methodOpacity = useRef(new Animated.Value(0)).current;

    const saveHeight = useRef(new Animated.Value(0)).current;
    const saveOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(methodHeight, {
                toValue: showMethodMenu ? 90 : 0,
                duration: 180,
                useNativeDriver: false
            }),
            Animated.timing(methodOpacity, {
                toValue: showMethodMenu ? 1 : 0,
                duration: 140,
                useNativeDriver: false
            })
        ]).start();
    }, [showMethodMenu, selectedFighter])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(roundHeight, {
                toValue: showRoundMenu ? 90 : 0,
                duration: 180,
                useNativeDriver: false
            }),
            Animated.timing(roundOpacity, {
                toValue: showRoundMenu ? 1 : 0,
                duration: 140,
                useNativeDriver: false
            })
        ]).start();
    }, [showRoundMenu, selectedFighter])

    useEffect(() => {
        Animated.parallel([
            Animated.timing(saveHeight, {
                toValue: showSaveButton ? 90 : 0,
                duration: 180,
                useNativeDriver: false
            }),
            Animated.timing(saveOpacity, {
                toValue: showSaveButton ? 1 : 0,
                duration: 140,
                useNativeDriver: false
            })
        ]).start();
    }, [showSaveButton, selectedFighter])

    useEffect(() => {
        if (!existingPick) {
            return;
        }

        if (fight.redFighter.fighterId === existingPick.pickedFighterId) {
            setSelectedFighter(fight.redFighter);
        } else if (fight.blueFighter.fighterId === existingPick.pickedFighterId) {
            setSelectedFighter(fight.blueFighter);
        }
        setSelectedMethod(existingPick.pickedMethod);
        setSelectedRound(existingPick.pickedRound);
        setIsSaved(true);
    }, [existingPick])

    function handleSaving() {
        setIsEditing(false);
        handleSavePick();
    }

    function buildPickPayload(): PickRequest | null {
        return {
            userId: 1,
            fightId: fight.fightId,
            pickedFighterId: selectedFighter?.fighterId,
            method: selectedMethod,
            endRound: selectedRound
        };
    }

    async function handleSavePick() {
        const payload = buildPickPayload();
        if (!payload) {
            return;
        }

        try {
            const response = await fetch(`https://263b9k85f2.execute-api.us-east-2.amazonaws.com/api/picks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                console.log("oops")
            }

            setIsSaved(true);
        } catch (error) {
            console.log(error);
        }
    }

    function handleEdit() {
        setIsEditing(true);
        setIsSaved(false);
    }

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(10)).current;

    console.log(existingPick)

    function handleFightCard() {
        if (isSaved && !isPast) {
            return (
                <FightCardPrediction
                    selectedFighter={selectedFighter}
                    selectedRound={selectedRound}
                    selectedMethod={selectedMethod}
                    setIsEditing={setIsEditing}
                    onPress={handleEdit}
                    isPast={false}
                    winnerCorner={fight.winnerCorner}
                    method={fight.method}
                    endRound={fight.endRound}
                    redFighter={fight.redFighter}
                    blueFighter={fight.blueFighter} 
                    pointAward={existingPick?.pointsAward ?? null} />
            )
        }
        else if (isSaved && isPast) {
            return (
                <FightCardPrediction
                    selectedFighter={selectedFighter}
                    selectedRound={selectedRound}
                    selectedMethod={selectedMethod}
                    setIsEditing={setIsEditing}
                    onPress={handleEdit} isPast={true}
                    winnerCorner={fight.winnerCorner}
                    method={fight.method}
                    endRound={fight.endRound}
                    redFighter={fight.redFighter}
                    blueFighter={fight.blueFighter} 
                    pointAward={existingPick?.pointsAward ?? null}  />
            )
        }
    }


    useEffect(() => {
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
    }, [index]);

    return (
        <Animated.View style={{ opacity: opacity, transform: [{ translateY: translateY }] }}>

            <View style={styles.test}>
                <FightCardTopper weightClass={fight.weightClass} isTitleBout={fight.isTitleFight} />
                <FightCardFighterRow
                    redFighter={fight.redFighter}
                    blueFighter={fight.blueFighter}
                    selectedFighter={selectedFighter}
                    setSelectedFighter={setSelectedFighter}
                    setSelectedMethod={setSelectedMethod}
                    setSelectedRound={setSelectedRound}
                    isLocked={isSaved}
                    isEditing={isEditing} />
                {!showMethodMenu && !showRoundMenu && !showSaveButton &&
                    <View style={{ height: isPast ? 60 : 40, borderTopWidth: 1, backgroundColor: "#202020" }}>
                        {handleFightCard()}
                    </View>
                }
                <Animated.View style={{ height: methodHeight, opacity: methodOpacity, overflow: "hidden" }}>
                    <FightCardMethodMenu setMethod={setSelectedMethod} selectedMethod={selectedMethod} />
                </Animated.View>

                <Animated.View style={{ height: roundHeight, opacity: roundOpacity, overflow: "hidden" }}>
                    <FightCardRoundMenu setRound={setSelectedRound} selectedRound={selectedRound} />
                </Animated.View>

                <Animated.View style={{ height: saveHeight, opacity: saveOpacity, overflow: "hidden" }}>
                    <FightCardSaveButton onPress={handleSaving} />
                </Animated.View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    test: {
        borderWidth: 1,
        width: "100%",
        borderRadius: 18,
        marginBottom: 16,
        overflow: "hidden"
    }

});