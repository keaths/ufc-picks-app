import { View, StyleSheet, Text } from "react-native";
import LeaderBoardRow from "../LeaderBoardRow/LeaderboardRow";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import CountUp from "@/components/anims/CountUp";

type Props = {
    title: string,
    metric: number
}

export default function LeaderBoardAccolade({ title, metric }: Props) {
    return (

        <View style={styles.accoladeRow}>
            <View style={{ alignItems: "flex-start", width: "50%" }}>
                <Text style={styles.accoladeRowTitle}>{title}</Text>
            </View>
            <View style={{ alignItems: "flex-end", width: "50%" }}>
                <Text style={styles.accoladeRowMetric}><CountUp value={metric}/></Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    leaderContainer: {
        width: "100%",
        height: 210,
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#252525"
    },

    leaderProfileRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
    },

    gradient: {
        height: "79%",
        width: "100%"
    },

    leaderAccoladesContainer: {
        height: "100%",
        width: "100%",
        paddingStart: 18,
        paddingEnd: 18,
    },

    leaderAccoladesOutline: {
        height: "100%",
    },

    accoladeRow: {
        height: "33.333%",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1.5,
        borderColor: "rgba(0, 0, 0, 0.26)"
    },

    accoladeRowMetric: {
        fontWeight: 800,
        color: COLORS.goldText
    },

    accoladeRowTitle: {
        fontWeight: 800,
        fontSize: 16,
        color: COLORS.lightText
    }

});