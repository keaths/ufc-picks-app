
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMetric from "@/components/profile/ProfileMetric";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventCard from "../../cards/EventCard/EventCard";
import { COLORS } from "@/theme/colors";
import ProfilePickHeader from "./ProfilePickHeader";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    redLast: string,
    blueLast: string
}

export default function ProfilePickFighterRow({ redLast, blueLast }: Props) {
    return (

        <LinearGradient
            style={styles.fighterRowContainer}
            colors={["rgba(211, 192, 132, 0.4)", "rgba(186, 168, 107, 0.47)", "rgba(191, 170, 103, 0.38)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.leftFighterNameContainer}>
                <Text style={styles.fighterName}>{redLast}</Text>
            </View>
            <View style={{ position: "absolute", left: 172 }}>
                <Text style={styles.vs}>VS</Text>
            </View>
            <View style={styles.rightFighterNameContainer}>
                <Text style={styles.fighterName}>{blueLast}</Text>
            </View>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({

    fighterRowContainer: {
        height: "35%",
        borderBottomWidth: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        borderColor: COLORS.goldText
    },

    leftFighterNameContainer: {
        height: "100%", 
        width: "50%", 
        justifyContent: "center", 
        alignItems: "flex-end", 
        paddingEnd: 30
    },

    rightFighterNameContainer: {
        height: "100%", 
        width: "50%", 
        justifyContent: "center", 
        alignItems: "flex-start", 
        paddingStart: 30
    },

    fighterName: {
        fontWeight: 700, 
        fontSize: 16,
        color: COLORS.lightText
    },

    vs: {
        fontWeight: 800, 
        fontSize: 18,
        color: COLORS.goldText
    }


});