
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileMetric from "@/components/profile/ProfileMetric";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventCard from "../../cards/EventCard/EventCard";
import { COLORS } from "@/theme/colors";

type Props = {
    title: string,
    date: string,
}

export default function ProfilePickHeader({ title, date }: Props) {

    function formatEventDate(dateString: string) {
        const date = new Date(dateString + "T00:00:00");

        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    }

    return (

        <View style={styles.testTopper}>
            <Text style={styles.testUfc}>{title.split(" ")[0]} <Text style={styles.testEventTitle}>{title.split("UFC ")[1].split(":")[0]}</Text></Text>
            <Text style={styles.testEventDate}>{formatEventDate(date).split(",")[0]}, <Text style={{ color: COLORS.lightText }}>{formatEventDate(date).split(", ")[1]}</Text></Text>
        </View>

    )
}

const styles = StyleSheet.create({

    testTopper: {
        flexDirection: "row",
        paddingStart: 8,
        paddingEnd: 8,
        width: "100%",
        height: "30%",
        borderBottomWidth: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#2b2b2b",
        borderColor: COLORS.goldText
    },

    testUfc: {
        fontSize: 16,
        color: COLORS.goldText,
        fontWeight: 800
    },

    testEventTitle: {
        fontSize: 16,
        color: COLORS.lightText,
        fontWeight: 700,
    },

    testEventDate: {
        fontWeight: 700,
        marginStart: "auto",
        color: COLORS.goldText
    },

});