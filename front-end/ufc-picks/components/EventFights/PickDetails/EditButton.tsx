import { usePressAnimation } from "@/hooks/usePressAnimation";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";

type Props = {
    onPress: () => void;
}

export default function EditButton({ onPress }: Props) {

    const { animatedStyle, onPressIn, onPressOut } = usePressAnimation();

    return (
        <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPress}>           
            <Animated.View style={[styles.test, animatedStyle]}>
                <Text style={styles.pickDetails}>Edit</Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({

    test: {
        borderWidth: 2,
        borderColor: "rgba(255, 234, 0, 0.24)",
        marginEnd: 10,
        width: 50,
        height: 30,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        justifyContent: "center",
        alignItems: "center"
    },

    pickDetails: {
        color: "rgb(248, 234, 193)",
        fontWeight: "700",
        fontSize: 13,
    },
})