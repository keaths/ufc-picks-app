import { usePressAnimation } from "@/hooks/usePressAnimation";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";


type Props = {
    label: string,
    onPress: () => void;
    selected?: boolean
}

export default function OptionButton({ label, onPress, selected = false }: Props) {

    const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();

    return (
        <Pressable onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}>
            <Animated.View style={[styles.methodButton,
            selected && styles.methodButtonSelected,
                animatedStyle]}>
                <Text style={styles.buttonText}>{label}</Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    methodContainer: {
        marginBottom: 5
    },

    dividerContainer: {
        width: "100%",
        paddingStart: 8,
        paddingEnd: 8,
        height: 10
    },

    methodButton: {
        height: 35,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)"
    },

    methodButtonSelected: {
        height: "100%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(196, 164, 37, 0.36)",
        borderWidth: 1,
        borderColor: "rgb(196, 164, 37)"
    },

    buttonText: {
        color: "white",
        fontWeight: "700"
    },
})