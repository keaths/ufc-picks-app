import { COLORS } from "@/theme/colors";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ProfileMetric from "./ProfileMetric";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
    userName: string
}

export default function ProfileHeader({ userName }: Props) {
    return (
        <LinearGradient
            colors={[
                "rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)",
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.test}>
            <View style={styles.userContainer}>
                <View style={styles.userOutline}>
                    <View style={styles.userProfilePic}>

                    </View>
                    <Text style={styles.userName}>@username</Text>
                </View>
            </View>
            <View style={styles.metricContainer}>
                <View style={styles.userMetricsContainer}>
                    <ProfileMetric title={"Total Picks"} metric={123} />
                    <ProfileMetric title={"Win Rate"} metric={0} />
                    <ProfileMetric title={"Ranking"} metric={0} />
                </View>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    test: {
        width: "100%",
        height: 210,
        borderRadius: 18,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#2b2b2b"
    },

    userContainer: {
        height: "75%",
        borderBottomWidth: 1.5,
        borderColor: COLORS.goldText,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",

    },

    userOutline: {
        height: "78%",
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center"
    },

    userProfilePic: {
        borderRadius: "50%",
        height: 100,
        width: 100,
        borderWidth: 2,
        borderColor: COLORS.goldText,
        backgroundColor: "rgb(118, 118, 118)"
    },

    userName: {
        fontSize: 16,
        fontWeight: 600,
        color: COLORS.lightText,
        marginTop: "auto"
    },

    metricContainer: {
        height: "25%",
        width: "100%"
    },

    userMetricsContainer: {
        paddingTop: 5,
        height: "100%",
        flexDirection: "row",
        width: "100%",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        marginBottom: 16,
        overflow: "hidden",
        backgroundColor: "#2b2b2b"
    },
});