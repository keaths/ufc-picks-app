import { savePick } from "@/api/savePick";
import React, { SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import MethodSelector from "./MethodSelector";
import RoundSelector from "./RoundSelector";
import SavePicksButton from "./SavePickButton";

type Method = "DECISION" | "KO_TKO" | "SUBMISSION"

type Props = {
    selectedMethod: Method | null,
    setSelectedMethod: React.Dispatch<React.SetStateAction<Method | null>>;
    selectedRound: number | null,
    setSelectedRound: React.Dispatch<React.SetStateAction<number | null>>;
    fightId: number,
    setFighterId: React.Dispatch<React.SetStateAction<number | null>>;
    fighterId: number | null,
    endRound: number | null,
    isPicked: boolean | null,
    setIsPicked: React.Dispatch<SetStateAction<boolean | null>>;
    setIsExpanded: React.Dispatch<SetStateAction<boolean | null>>;
    setIsDisabled: React.Dispatch<SetStateAction<boolean | null>>;
    setIsEditing: React.Dispatch<SetStateAction<boolean | null>>;
}

export default function PickDetails({ selectedMethod, setSelectedMethod, selectedRound, setSelectedRound, fightId, fighterId, endRound, setIsPicked, setIsExpanded, setIsDisabled, setIsEditing}: Props) {

    async function handleSavePick(){
        console.log("starting");
        const payload = {
            userId: 1,
            fightId: fightId,
            pickedFighterId: fighterId,
            method: selectedMethod,
            endRound: endRound
        }

        console.log(payload);
        try{
            await savePick(payload); 
        } catch (error){
            console.log("Failed, ", error);
        }
        console.log("done I think");
        // setFighterId(null);
        setIsPicked(true);
        setIsExpanded(false);
        setIsDisabled(true);
        setIsEditing(false);
    }

    return (
        <View style={styles.picksContainer}>
            <MethodSelector selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} setSelectedRound={setSelectedRound} selectedRound={selectedRound} />
            {(selectedMethod !== null && selectedMethod !== "DECISION") &&
                <Animated.View
                    entering={FadeIn.duration(300).delay(50)}
                    exiting={FadeOut.duration(10).delay(50)}
                >
                    <RoundSelector selectedRound={selectedRound} setSelectedRound={setSelectedRound} />
                </Animated.View>
            }
            {((selectedMethod === "DECISION" && selectedRound == null) || (selectedMethod !== "DECISION" && selectedRound !== null)) &&
                <Animated.View
                    entering={FadeIn.duration(300).delay(50)}
                    exiting={FadeOut.duration(10).delay(50)}
                >
                    <SavePicksButton onPress={() => handleSavePick()}/>
                </Animated.View>
            }
        </View>
    )
}

const styles = StyleSheet.create({

    picksContainer: {
        // borderWidth: 1,
        borderColor: "white",
        paddingStart: 8,
        paddingEnd: 8,
        paddingTop: 5
    },

    test: {
        color: "white",
        fontWeight: "700"
    },

    methodRowContainer: {
        flexDirection: "row",
        // borderWidth: 1,
        borderColor: "white"
    },

    methodRow: {
        width: "33.333%",
        height: 45,
        // borderWidth: 1,
        borderColor: "white",
        padding: 5
    },

    roundRow: {
        width: "20%",
        height: 45,
        // borderWidth: 1,
        borderColor: "white",
        padding: 5
    },

    methodButton: {
        borderWidth: 1,
        borderColor: "white",
        height: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },

    saveContainer: {
        // borderWidth: 1,
        borderColor: "white",
        height: 55,
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: "center",
        alignItems: "center"
    },

    saveButton: {
        borderWidth: 1,
        borderColor: "yellow",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "95%",
        borderRadius: 10
    }
})