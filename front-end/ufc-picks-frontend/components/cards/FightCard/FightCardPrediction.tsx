import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { FighterSummary } from "@/types/FighterSummary";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated } from "react-native";
import OptionButton from "./FightCardPredictionMenu/OptionButton/OptionButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/theme/colors";
import CountUp from "@/components/anims/CountUp";

type Props = {
    selectedFighter: FighterSummary | null,
    redFighter: FighterSummary | null,
    blueFighter: FighterSummary | null,
    selectedRound: number | null,
    selectedMethod: Method | null,
    setIsEditing: React.Dispatch<React.SetStateAction<Boolean>>
    onPress: () => void;
    isPast: Boolean,
    winnerCorner: string,
    method: string,
    endRound: number,
    pointAward: number | null,
    isLocked: Boolean
}

type Method = "KO_TKO" | "SUBMISSION" | "DECISION"

export default function FightCardPrediction({ selectedFighter, selectedRound, selectedMethod, setIsEditing, onPress, isPast, winnerCorner, method, endRound, redFighter, blueFighter, pointAward, isLocked }: Props) {

    function handlePrediction() {
        if (selectedMethod === "DECISION") {
            return (
                <Text style={{ fontWeight: 600 }}><MaterialCommunityIcons name="check-circle" size={16} color={COLORS.goldText} />
                    <Text style={{ color: COLORS.lightText }}> Picked: </Text>
                    <Text style={{ color: COLORS.goldText }}>{selectedFighter?.lastName}</Text>
                    <Text style={{ color: COLORS.lightText }}> by </Text>
                    <Text style={{ color: COLORS.goldText }}>{handleMethod(selectedMethod)}</Text>
                </Text>
            )
        } else {
            return (
                <Text style={{ fontWeight: 600, fontSize: 13 }}><MaterialCommunityIcons name="check-circle" size={16} color={COLORS.goldText} />
                    <Text style={{ color: COLORS.lightText }}> Picked: </Text>
                    <Text style={{ color: COLORS.goldText }}>{selectedFighter?.lastName}</Text>
                    <Text style={{ color: COLORS.lightText }}> by </Text>
                    <Text style={{ color: COLORS.goldText }}>{handleMethod(selectedMethod)}: R{selectedRound}</Text>
                </Text>
            )
        }
    }

    function handleMethod(method: string | null) {
        if (method === "DECISION") {
            return "Decision"
        } else if (method === "SUBMISSION") {
            return "Submission"
        } else {
            return "KO/TKO"
        }
    }

    function handleWinner() {
        if ((winnerCorner === "RED" && selectedFighter?.fighterId === redFighter?.fighterId) || (winnerCorner === "BLUE" && selectedFighter?.fighterId === blueFighter?.fighterId)) {
            return true;
        } else {
            return false;
        }
    }

    function handleDecision() {
        if (handleWinner() && method === selectedMethod) {
            return true;
        } else {
            return false;
        }
    }

    function handleRound() {
        if (handleWinner() && endRound === selectedRound) {
            return true;
        } else {
            return false;
        }
    }

    const fightWinner = () => {
        if (winnerCorner === "RED") {
            return redFighter;
        } else if (winnerCorner === "BLUE") {
            return blueFighter;
        }
    }

    function handleResult() {
        return (
            <Text style={{ fontWeight: 600, fontSize: 13 }}>{handleWinner() ? <MaterialCommunityIcons name="check-circle" size={16} color={COLORS.correct} /> : <MaterialCommunityIcons name="close-circle" size={16} color={COLORS.incorrect} />}
                <Text style={{ color: COLORS.lightText, }}> Result:</Text>
                <Text style={handleWinner() ? { color: COLORS.correct } : { color: COLORS.incorrect }}> {fightWinner()?.lastName}</Text>
                <Text style={{ color: COLORS.lightText }}> by</Text>
                <Text style={handleDecision() ? { color: COLORS.correct } : { color: COLORS.incorrect }}> {handleMethod(method)}</Text>
                {method === "DECISION" ?
                    <></>
                    :
                    <Text style={handleRound() ? { color: COLORS.correct } : { color: COLORS.incorrect }}>: R{endRound}</Text>
                }
            </Text>
        )
    }

    console.log(selectedFighter?.lastName)

    return (
        <LinearGradient
            colors={["#2b2b2b", "#2b2b2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}>

            {isPast ?
                <View style={{ height: "100%", flexDirection: "row" }}>

                    <View style={{ marginEnd: "auto" }}>
                        <View style={styles.fightTopper}>
                            {handlePrediction()}
                        </View>
                        <View style={styles.fightTopper}>
                            {handleResult()}
                        </View>
                    </View>


                    <View style={{ width: "25%", padding: 10, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: 700, color: COLORS.lightText }}>+
                            {pointAward != null ?
                                <CountUp value={pointAward} />
                                :
                                "0 "
                            }
                        </Text>
                    </View>
                </View>
                :
                <View style={styles.fightTopperUpcoming}>
                    {handlePrediction()}
                    <View style={styles.editButtonContainer}>
                        {isLocked ?
                            <MaterialCommunityIcons name="lock" size={24} color={COLORS.goldText} />
                            :
                            <OptionButton label={"Edit"} onPress={onPress} selected={false} />
                        }
                    </View>
                </View>
            }

        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    gradient: {
        height: "100%",
        borderBottomRightRadius: 18,
        borderBottomLeftRadius: 18,
    },

    fightTopper: {
        height: "50%",
        flexDirection: "row",
        alignItems: "center",
        paddingStart: 8,
        paddingEnd: 8,
    },

    fightTopperUpcoming: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingStart: 8,
        paddingEnd: 8,
    },

    editButtonContainer: {
        marginStart: "auto",
        padding: 5,
        width: 70,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

});