
import ProfileHeader from "@/components/profile/ProfileHeader";
import { COLORS } from "@/theme/colors";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CountUp from "../anims/CountUp";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
    title: string,
    metric: number
}

export default function ProfileMetric({ title, metric }: Props) {

    function handleIcon() {
        if (title === "Total Picks") {
            return (
                <MaterialCommunityIcons name="format-list-checks" size={18} color={COLORS.goldText} />
            )
        } else if (title === "Win Rate") {
            return (
                <MaterialCommunityIcons name="percent" size={18} color={COLORS.goldText} />

            )
        } else {
            return (
                <MaterialCommunityIcons name="trophy" size={18} color={COLORS.goldText} />

            )
        }
    }
    return (
        <View style={styles.metricContainer}>
            <View style={styles.metricContentContainer}>
                <Text style={styles.metricTitle}>{handleIcon()} {title}</Text>
            </View>
            <View style={styles.metricContentContainer}>
                <Text style={styles.metricQuantity}>{title === "Ranking" ? "#" : ""}<CountUp value={metric} /></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    metricContainer: {
        width: "33.333%",
        height: "100%",
        alignItems: "center",
    },

    metricContentContainer: {
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderRightWidth: 3,
        borderRightColor: "rgba(0, 0, 0, 0.1)"
    },

    metricTitle: {
        fontWeight: 700,
        color: COLORS.lightText
    },

    metricQuantity: {
        fontWeight: 700,
        color: COLORS.goldText
    },

});