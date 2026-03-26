import { useEffect, useRef, useState } from "react";
import { Animated, Easing, Text } from "react-native";


export default function CountUp({ value }: {value: number}) {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        animatedValue.setValue(0);

        const listener = animatedValue.addListener(({ value }) => {
            setDisplayValue(Math.floor(value));
        });

        Animated.timing(animatedValue, {
            toValue: value,
            duration: 1000,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: false,
        }).start();

        return () => {
            animatedValue.removeListener(listener);
        };
    }, [value]);

    return <Text>{displayValue}</Text>;
}