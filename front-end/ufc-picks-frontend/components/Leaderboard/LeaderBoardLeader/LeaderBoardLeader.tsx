import { View, StyleSheet, Text } from "react-native";
import LeaderBoardRow from "../LeaderBoardRow/LeaderboardRow";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import LeaderBoardAccolade from "./LeaderBoardAccolade";

type Props = {
    rank: number,
    userName: string,
    points: number,
    index: number,
    animationKey: number
}

export default function LeaderboardLeader({ rank, userName, points, index, animationKey }: Props) {
    return (
        <View style={styles.leaderContainer}>
            <View style={styles.leaderProfileRow}>
                <LeaderBoardRow rank={1} userName={"@KeathTheGuru"} points={13000} index={1} bottomBorder={true} animationKey={animationKey} />
            </View>
            <LinearGradient
                colors={["rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}>
            <View style={styles.leaderAccoladesContainer}>
                <View style={styles.leaderAccoladesOutline}>
                    <LeaderBoardAccolade title={"Pick Streak"} metric={12}/>
                    <LeaderBoardAccolade title={"Win Rate"} metric={55}/>
                    <LeaderBoardAccolade title={"Total Picks"} metric={923}/>
                </View>
            </View>
        </LinearGradient>

        </View >
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
        fontSize: 18,
        fontWeight: 800,
        color: COLORS.goldText
    },

    accoladeRowTitle: {
        fontWeight: 800,
        fontSize: 16,
        color: COLORS.lightText
    }

});