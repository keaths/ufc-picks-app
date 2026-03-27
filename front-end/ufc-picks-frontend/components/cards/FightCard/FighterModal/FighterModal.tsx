import { getEventDetails } from "@/api/getEventDetails";
import { EventDetails } from "@/types/EventDetails";
import { useLocalSearchParams } from "expo-router";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, Animated, Modal } from "react-native";
import { FighterSummary } from "@/types/FighterSummary";
import { COLORS } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import FighterModalMetrics from "./FighterModalMetrics";
import FighterModalLast5 from "./FighterModalLast5";
import FighterModalClose from "./FighterModalClose";

type Props = {
    fighter: FighterSummary | null,
    setShowModal: React.Dispatch<React.SetStateAction<Boolean>>;
    setModalFighter: React.Dispatch<React.SetStateAction<FighterSummary | null>>;

}

export default function FighterModal({ fighter, setShowModal, setModalFighter }: Props) {

    return (
        <Modal
            visible={true}
            animationType="fade"
            transparent
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <View style={styles.fighterImageContainer}>
                        <Image source={{ uri: fighter?.imageUrl }} style={{ height: 125, width: 125 }} />
                    </View>
                    <LinearGradient
                        style={styles.gradient}
                        colors={["rgba(194, 173, 105, 0.4)", "rgba(194, 173, 105, 0.47)", "rgba(194, 173, 105, 0.28)"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }} />
                    <View style={{ height: "85%", width: "100%", paddingStart: 15, paddingEnd: 15, borderWidth: 2 }}>
                        <View style={{ height: "18%", width: "100%", justifyContent: "center", alignItems: "flex-end", flexDirection: "row" }}>
                            {fighter?.ranking === null ?
                            <></>
                            :
                            <View style={[{ marginEnd: 2, alignItems: "center", justifyContent: "center", height: 18, width: 18, borderRadius: 9 }, fighter?.ranking === 1 ? { backgroundColor: COLORS.goldText } : { backgroundColor: "rgba(0, 0, 0, 0.45)" }]}>                             
                                    <Text style={{ color: COLORS.lightText, fontWeight: 700, fontSize: 12 }}>{fighter?.ranking === 1 ? "C" : `${fighter && fighter.ranking - 1}`}</Text>                                    
                            </View>
                            }
                            <Text style={styles.fighterName}> {fighter?.firstName.toLocaleUpperCase()} {fighter?.lastName.toLocaleUpperCase()}</Text>
                        </View>
                        <View style={{ height: "5%", width: "100%", borderBottomWidth: 2, justifyContent: "flex-start", alignItems: "center", borderColor: "rgba(0, 0, 0, 0.21)" }}>
                            <Text style={styles.fighterNickName}>{fighter?.nickName}</Text>
                        </View>
                        <FighterModalMetrics fighter={fighter} />
                        <FighterModalLast5 fighter={fighter} />
                        <FighterModalClose setShowModal={setShowModal} setModalFighter={setModalFighter} />
                    </View>
                </View>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.66)",
        justifyContent: "center",
        alignItems: "center",
        paddingStart: 40,
        paddingEnd: 40,
        paddingTop: 170,
        paddingBottom: 170,
    },

    card: {
        height: "100%",
        width: "100%",
        backgroundColor: "#2b2b2b",
        borderRadius: 18,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.goldText,
    },

    gradient: {
        height: "15%",
        width: "100%",
        borderBottomWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.goldText
    },

    fighterImageContainer: {
        height: 120,
        width: 120,
        borderRadius: "50%",
        borderWidth: 5,
        position: "absolute",
        zIndex: 1,
        left: 100,
        top: 15,
        backgroundColor: "#252525",
        borderColor: COLORS.goldText,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },

    fighterName: {
        fontWeight: 700,
        fontSize: 18,
        color: COLORS.goldText
    },

    fighterNickName: {
        fontWeight: 500,
        fontSize: 14,
        color: COLORS.lightText
    }

});