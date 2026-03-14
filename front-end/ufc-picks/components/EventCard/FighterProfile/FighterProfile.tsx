import { FighterSummary } from "@/types/FighterSummary";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
    fighter: FighterSummary;
    isRedFighter: boolean;
}

export default function FighterProfile({ fighter, isRedFighter }: Props) {

    return (
        <View style={styles.fighterProfile}>
            {isRedFighter ?
                <LinearGradient
                    colors={["#8b0000a5", "#ff000000"]}
                    style={[styles.fighterProfileCard, { borderColor: "rgba(255, 73, 73, 0.38)" }]}>
                    <Image source={{ uri: fighter.imageUrl }} style={{ height: 100, width: 120 }}></Image>
                    <View style={styles.rankingRed}>
                        <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>#15</Text>
                    </View>
                </LinearGradient>

                :
                <LinearGradient
                    colors={["#001f5caf", "#0051ff00"]}
                    style={[styles.fighterProfileCard, { borderColor: "rgba(32, 138, 253, 0.47)" }]}>
                    <Image source={{ uri: fighter.imageUrl }} style={{ height: 100, width: 120 }}></Image>
                    <View style={styles.rankingBlue}>
                        <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>#15</Text>                
                    </View>
                </LinearGradient>
            }
            <View>
                <Text style={styles.lastName}>{fighter.firstName.toUpperCase()} {fighter.lastName.toUpperCase()}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    fighterProfile: {
        width: "50%",
        alignItems: "center",
        paddingStart: 4,
        paddingEnd: 4,
    },

    fighterProfileCard: {
        width: "100%",
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1
    },

    lastName: {
        color: "white",
        fontWeight: 700,
        fontSize: 12,
        paddingTop: 5
    },

    rankingBlue: {
        position: "absolute",
        right: 10,
        top: 10,
        alignItems: "center",
        justifyContent: "center"
    },

    rankingRed: {
        position: "absolute",
        left: 10,
        top: 10,
        alignItems: "center",
        justifyContent: "center"
    }
})