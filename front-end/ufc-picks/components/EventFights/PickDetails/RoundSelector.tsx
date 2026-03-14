import { StyleSheet, Text, View } from "react-native";
import OptionButton from "./OptionButton";

type Props = {
    selectedRound: number | null;
    setSelectedRound: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function RoundSelector({ selectedRound, setSelectedRound }: Props) {

    function handleRoundSelect(round: number) {
        setSelectedRound(round);
    }
    return (
        <View>
            <View style={styles.dividerContainer}>
                <View style={styles.divider}></View>
            </View>
            <Text style={styles.test}>Round</Text>
            <View style={styles.roundRowContainer}>
                <View style={styles.roundRow}>
                    <OptionButton label={"1"} onPress={() => handleRoundSelect(1)} selected={selectedRound === 1} />
                </View>
                <View style={styles.roundRow}>
                    <OptionButton label={"2"} onPress={() => handleRoundSelect(2)} selected={selectedRound === 2} />
                </View>
                <View style={styles.roundRow}>
                    <OptionButton label={"3"} onPress={() => handleRoundSelect(3)} selected={selectedRound === 3} />
                </View>
                <View style={styles.roundRow}>
                    <OptionButton label={"4"} onPress={() => handleRoundSelect(4)} selected={selectedRound === 4} />
                </View>
                <View style={styles.roundRow}>
                    <OptionButton label={"5"} onPress={() => handleRoundSelect(5)} selected={selectedRound === 5} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

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

    picksContainer: {
        // borderWidth: 1,
        borderColor: "white",
        paddingStart: 8,
        paddingEnd: 8,
        paddingTop: 5
    },

    buttonText: {
        color: "white",
        fontWeight: "700"
    },

    test: {
        paddingStart: 8,
        color: "white",
        fontWeight: "700"
    },

    roundRowContainer: {
        flexDirection: "row",
        // borderWidth: 1,
        borderColor: "white"
    },

    roundRow: {
        width: "20%",
        height: 45,
        // borderWidth: 1,
        borderColor: "white",
        padding: 5
    },

    roundButton: {
        borderColor: "white",
        height: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)"
    }
})