import {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";


export function usePressAnimation(
    pressedScale = 0.8,
    pressedOpacity = 0.9
) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const onPressIn = () => {
        scale.value = withTiming(pressedScale, {duration: 90 });
        opacity.value = withTiming(pressedOpacity, {duration: 90 });
    };

    const onPressOut = () => {
        scale.value = withTiming(1, {duration: 120});
        opacity.value = withTiming(1, {duration: 120});
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: scale.value}],
        opacity: opacity.value,
    }))

    return {
        animatedStyle, onPressIn, onPressOut
    }
}