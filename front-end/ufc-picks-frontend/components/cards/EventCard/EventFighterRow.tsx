import { COLORS } from "@/theme/colors";
import { FighterSummary } from "@/types/FighterSummary";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Image } from "react-native";


type Props = {
    redFighter: FighterSummary
    blueFighter: FighterSummary
}

export default function EventFighterRow({ redFighter, blueFighter }: Props) {

    function handleName(fighter: FighterSummary) {
        if (fighter.lastName.includes(" ")) {
            return (
                <View>
                    <Text style={styles.fighterName}>{fighter.lastName.split(" ")[0]}</Text>
                    <Text style={styles.fighterName}>{fighter.lastName.split(" ")[1]}</Text>
                </View>
            )
        } else {
            return (
                <Text style={styles.fighterName}>{fighter.lastName}</Text>
            )
        }
    }

    return (

        <LinearGradient
            colors={["rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.fightRowContainer}>
            <View style={styles.fighters}>
                <View style={styles.redFighterContainer}>
                    <Image source={{ uri: `${redFighter.imageUrl}` }} style={styles.redFighter} />
                </View>
                <View style={styles.blueFighterContainer}>
                    <Image source={{ uri: `${blueFighter.imageUrl}` }} style={styles.blueFighter} />
                </View>
            </View>
            <View style={styles.eventFight}>
                <Text style={styles.fighterName}>{handleName(redFighter)}</Text>
                <Text style={styles.vs}>VS</Text>
                <Text style={styles.fighterName}>{handleName(blueFighter)}</Text>
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({

    fightRowContainer: {
        flexDirection: "row",
        width: "100%",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: COLORS.goldText,
        height: "55%"
    },

    gradient: {
        height: "100%",
        width: "100%"
    },

    fighters: {
        width: "60%"
    },

    eventFight: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
    },

    fighterName: {
        fontWeight: 700,
        color: "white",
        fontSize: 18,
        textAlign: "center"
    },

    vs: {
        fontWeight: 800,
        fontSize: 16,
        color: COLORS.goldText
    },

    redFighterContainer: {
        justifyContent: "flex-end",
        position: "absolute"
    },

    blueFighterContainer: {
        justifyContent: "flex-end",
        position: "absolute",
        left: 90,
        top: 2
    },

    redFighter: {
        zIndex: 2,
        height: 110,
        width: 150,
        top: 2
    },

    blueFighter: {
        zIndex: 1,
        height: 110,
        width: 150
    },
});
