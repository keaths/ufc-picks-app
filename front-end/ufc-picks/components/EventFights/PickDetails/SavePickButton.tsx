import { usePressAnimation } from "@/hooks/usePressAnimation";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

type Props = {
    onPress: () => void;
}

export default function SavePicksButton({ onPress }: Props) {

    const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();

    return (
        <View style={styles.saveContainer}>
            <Pressable
                onPress={() => onPress()}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={{width: "100%"}} >
                <Animated.View style={[styles.saveButton, animatedStyle]}>
                    <Text style={styles.buttonText}>Save Pick</Text>
                </Animated.View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonText: {
        color: "white",
        fontWeight: "700"
    },

    saveContainer: {
        // borderWidth: 1,
        borderColor: "white",
        paddingStart: 6,
        paddingEnd: 8,
        height: 65,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    saveButton: {
        backgroundColor: "rgba(196, 164, 37, 0.36)",
        borderWidth: 1,
        borderColor: "rgb(196, 164, 37)",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "95%",
        borderRadius: 10
    }
})