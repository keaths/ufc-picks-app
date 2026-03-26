import { COLORS } from "@/theme/colors";
import { View, StyleSheet, Text } from "react-native";

type Props = {
    rank: number
}

export default function LeaderBoardRowRank({ rank }: Props) {

    return (
        <View style={styles.rankContainer}>
            <View style={rank === 1 ? styles.rankFirstOutline : styles.rankOutline}>
                <Text style={rank === 1 ? styles.rankTextFirst : styles.rankText}>{rank}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    rankContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
    },

    rankOutline: {
        borderWidth: 2,
        borderRadius: "50%",
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.goldText
    },

    rankText: {
        fontWeight: 700,
        fontSize: 18,
        color: COLORS.lightText
    },

    rankFirstOutline: {
        borderWidth: 3,
        borderRadius: "50%",
        height: 35,
        width: 35,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.goldText,
        backgroundColor: "rgba(125, 77, 0, 0.22)"
    },

    rankTextFirst: {
        fontWeight: 700,
        fontSize: 18,
        color: COLORS.goldText
    },

});