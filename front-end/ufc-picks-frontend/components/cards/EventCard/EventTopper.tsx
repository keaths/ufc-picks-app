import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    eventName: string
    eventDate: string
}

export default function EventTopper({ eventName, eventDate }: Props) {

    function formatEventDate(dateString: string) {
        const date = new Date(dateString + "T00:00:00");

        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <LinearGradient
            colors={["#2b2b2b", "#2b2b2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}>
            <View style={styles.topper}>
                <View style={styles.eventNameContainer}>
                    <Text style={styles.ufc}>{eventName.split(" ")[0]}
                        <Text style={styles.eventName}> {eventName.split("UFC ")[1].split(":")[0].toUpperCase()}</Text>
                    </Text>
                </View>
                <View style={styles.eventDate}>
                    <Text style={styles.day}>{formatEventDate(eventDate).split(",")[0]},
                        <Text style={styles.month}> {formatEventDate(eventDate).split(" ")[1]}
                            <Text style={styles.monthDay}> {formatEventDate(eventDate).split(" ")[2]}</Text>
                        </Text>
                    </Text>
                </View>
            </View>
        </LinearGradient>


    )
}

const styles = StyleSheet.create({

    gradient: {
        height: 44,
    },

    topper: {
        flexDirection: "row",
        height: "100%",
    },

    eventNameContainer: {
        paddingStart: 8,
        height: "100%",
        width: "60%",
        justifyContent: "center"
    },

    ufc: {
        fontWeight: 800,
        fontSize: 18,
        color: COLORS.goldText
    },

    eventName: {
        fontWeight: 800,
        fontSize: 16,
        color: COLORS.lightText
    },

    eventDate: {
        marginStart: "auto",
        height: "100%",
        width: "40%",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingEnd: 8,
        fontWeight: 700
    },

    day: {
        color: COLORS.goldText,
        fontWeight: 700,
    },

    month: {
        color: COLORS.lightText
    },

    monthDay: {
        color: COLORS.lightText
    }
});
