
import { usePressAnimation } from "@/hooks/usePressAnimation";
import { StyleSheet, Text, View } from "react-native";
import OptoinButton from "./OptionButton";

type Method = "DECISION" | "KO_TKO" | "SUBMISSION"

type Props = {
    selectedMethod: Method | null;
    setSelectedMethod: React.Dispatch<React.SetStateAction<Method | null>>;
    selectedRound: number | null;
    setSelectedRound: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function MethodSelector({ selectedMethod, setSelectedMethod, setSelectedRound }: Props) {

    function handleMethodSelect(method: Method) {
        if(setSelectedRound !== null && method === "DECISION"){
            setSelectedMethod(method);
            setSelectedRound(null);
        }
        setSelectedMethod(method);
    }

    const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();

    return (
        <View style={styles.methodContainer}>
            <View style={styles.dividerContainer}>
                <View style={styles.divider}></View>
            </View>
            <Text style={styles.test}>Method</Text>
            <View style={styles.methodRowContainer}>
                <View style={styles.methodRow}>
                    <OptoinButton label={"Decision"} onPress={() => handleMethodSelect("DECISION")} selected={selectedMethod === "DECISION"}/>
                </View>
                <View style={styles.methodRow}>
                    <OptoinButton label={"KO/TKO"} onPress={() => handleMethodSelect("KO_TKO")} selected={selectedMethod === "KO_TKO"}/>
                </View>
                <View style={styles.methodRow}>
                    <OptoinButton label={"Submission"} onPress={() => handleMethodSelect("SUBMISSION")} selected={selectedMethod === "SUBMISSION"}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    methodContainer: {
        marginBottom: 5
    },

    dividerContainer: {
        width: "100%",
        paddingStart: 8,
        paddingEnd: 8,
        height: 10
    },

    divider: {
        width: "100%",
        borderTopWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.17)",
        height: 10
    },

    methodRowContainer: {
        flexDirection: "row",
        // borderWidth: 1,
        borderColor: "white"
    },

    test: {
        paddingStart: 8,
        color: "white",
        fontWeight: "700"
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
        height: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)"
    },

    buttonText: {
        color: "white",
        fontWeight: "700"
    },
})