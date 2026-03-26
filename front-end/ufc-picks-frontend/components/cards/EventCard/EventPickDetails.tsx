import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import CountUp from "@/components/anims/CountUp";

type Props = {
    pickCount: number,
    fightCount: number
}

export default function EventTopper({ pickCount, fightCount }: Props) {

    function handlePickDetails() {
        if (pickCount == fightCount) {
            return (
                <Text style={{ fontWeight: 700, color: COLORS.goldText }}>
                    <MaterialCommunityIcons name="account-group" size={18} />
                    {pickCount}/{fightCount}
                    <Text style={{ color: COLORS.lightText }}> Picks Selected</Text>
                </Text>
            )
        } else {
            return (
                <Text style={{ fontWeight: 700, color: COLORS.goldText }}><MaterialCommunityIcons name="format-list-checks" size={18} color={COLORS.goldText} /> <CountUp value={pickCount}/>/
                    <Text style={{ color: COLORS.lightText }}><CountUp value={fightCount}/> </Text>
                    <Text style={{ color: COLORS.lightText }}>Picks Selected</Text>
                </Text>
            )
        }
    }

    return (
        <LinearGradient
            style={styles.pickDetails}
            colors={["#2b2b2b", "#2b2b2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            {handlePickDetails()}
            <View style={styles.communityPicks}>
                <Text style={{ fontWeight: 700, color: COLORS.goldText }}><MaterialCommunityIcons name="account-group" size={18} color={COLORS.goldText} /> <CountUp value={1950}/> <Text style={{ color: COLORS.lightText }}> Picks</Text>
                </Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({

    pickDetails: {
        height: 50,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingStart: 8,
        flexDirection: "row"
    },

    communityPicks: {
        marginStart: "auto",
        paddingEnd: 8
    }

});
