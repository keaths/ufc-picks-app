
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMetric from "@/components/profile/ProfileMetric";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventCard from "../../cards/EventCard/EventCard";
import { COLORS } from "@/theme/colors";
import ProfilePickHeader from "./ProfilePickHeader";
import ProfilePickFighterRow from "./ProfilePickFighterRow";
import CountUp from "@/components/anims/CountUp";

type Props = {
    pickCount: number,
    fightCount: number,
    animationKey: number,
    correctPick: number,
    isUpcoming: Boolean
}

export default function ProfilePickMetrics({ pickCount, fightCount, correctPick, isUpcoming }: Props) {
    return (

        <View style={styles.metricsContainer}>
            <View style={styles.metricOutline}>
                {isUpcoming ?
                    <Text style={styles.metricText}><Text style={{ color: COLORS.goldText }}><CountUp value={pickCount} /></Text>/<CountUp value={fightCount} /> Picks Made</Text>
                    :
                    <Text style={styles.metricText}><Text style={{ color: COLORS.goldText }}><CountUp value={correctPick} /></Text>/<CountUp value={fightCount} /> Correct Picks</Text>
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({

    metricsContainer: {
        height: "65%",
        width: "100%",
        backgroundColor: "#2b2b2b",
        paddingLeft: 18,
        paddingRight: 18
    },

    metricOutline: {
        height: "70%",
        width: "100%",
        borderBottomWidth: 2,
        borderColor: "rgba(0, 0, 0, 0.21)",
        justifyContent: "center",
        alignItems: "center"
    },

    metricText: {
        fontWeight: 600,
        color: COLORS.lightText
    }
});