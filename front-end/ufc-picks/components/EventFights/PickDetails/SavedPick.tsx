import { FighterSummary } from "@/types/FighterSummary"
import { MaterialIcons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import React, { SetStateAction } from "react"
import { StyleSheet, Text, View } from "react-native"
import EditButton from "./EditButton"

type Method = "DECISION" | "KO_TKO" | "SUBMISSION" | null

type Props = {
    selectedMethod: Method,
    selectedRound: number | null,
    fighter: FighterSummary | null,
    isPicked: boolean | null,
    setIsPicked: React.Dispatch<SetStateAction<boolean | null>>;
    onPress: () => void;
    setIsDisabled: React.Dispatch<SetStateAction<boolean | null>>;
}

export default function SavedPick({ selectedMethod, selectedRound, fighter, isPicked, setIsPicked, onPress, setIsDisabled }: Props) {

    function handlePickDescription(selectedMethod: string | null, selectedRound: any) {
        if (selectedMethod === "DECISION") {
            return (
                <Text style={styles.picked}>
                     Picked:
                    <Text style={styles.pickDetails}>{` ${fighter?.lastName} by Decision`}</Text>
                </Text>
            )
        } else if (selectedMethod === "KO_TKO") {
            return (
                <Text style={styles.picked}>
                    Picked:
                    <Text style={styles.pickDetails}>{` ${fighter?.lastName} by KO/TKO, R${selectedRound}`}</Text>
                </Text>);
        } else {
            return (
                <Text style={styles.picked}>
                    Picked:
                    <Text style={styles.pickDetails}>{` ${fighter?.lastName} by Submission, R${selectedRound}`}</Text>
                </Text>);
        }
    }

    return (
        <View style={styles.predictionsContainer}>
            <LinearGradient
                colors={["#6c6111a4", "rgba(67, 63, 22, 0.62)", "#242104"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.predictions}>
                <MaterialIcons name="check-circle" size={20} color="rgb(211, 158, 24)" style={{paddingEnd: 5}} />
                {handlePickDescription(selectedMethod, selectedRound)}
                <EditButton onPress={onPress}/>
            </LinearGradient>
        </View>

    )
}

const styles = StyleSheet.create({

    test: {
        borderWidth: 2,
        borderColor: "rgba(255, 234, 0, 0.24)",
        marginEnd: 10,
        width: 50,
        height: 30,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        justifyContent: "center",
        alignItems: "center"
    },

    predictionsContainer: {
        flexDirection: "row",
        paddingStart: 8,
        paddingEnd: 8,
        paddingBottom: 10,
        paddingTop: 3,
        alignItems: "flex-start",
    },

    picked: {
        flexDirection: "row",
        color: "white",
        fontSize: 14,
        fontWeight: "700",
        marginEnd: "auto"
    },

    pickDetails: {
        color: "rgb(248, 234, 193)",
        fontWeight: "700",
        fontSize: 13,
    },

    predictions: {
        flexDirection: "row",        
        height: 45,
        width: "100%",
        borderRadius: 10,
        alignItems: "center",
        paddingStart: 8,
        borderWidth: 2,
        borderColor: "rgba(255, 234, 0, 0.24)",        
    },

    subTitle: {
        color: "white",
        fontWeight: 700,
        fontSize: 12
    },
})