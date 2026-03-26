import CountUp from "@/components/anims/CountUp";
import { COLORS } from "@/theme/colors";
import { View, StyleSheet, Text } from "react-native";

type Props = {
    score: number
}

export default function LeaderboardScore({ score }: Props) {
    return (
        <View style={styles.scoreContainer}>
            <Text style={styles.score}><CountUp value={score}/></Text>
        </View>
    )
}

const styles = StyleSheet.create({

    scoreContainer: {
        width: "20%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingEnd: 8
        // borderWidth: 1,
        
    },

    score: {
        fontWeight: 800,
        color: COLORS.goldText
    }

});