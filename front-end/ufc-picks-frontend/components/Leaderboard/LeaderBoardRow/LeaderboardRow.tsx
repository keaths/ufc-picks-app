import { Socket } from "node:dgram";
import { styleText } from "node:util";
import { View, Text, StyleSheet, Image, Pressable, Animated, Easing } from "react-native";
import LeaderBoardRowRank from "./LeaderBoardRowRank";
import LeaderBoardRowUserPic from "./LeaderBoardRowUserPic";
import LeaderUserInfo from "./LeaderBoardUserInfo";
import LeaderboardScore from "./LeaderboardScore";
import { COLORS } from "@/theme/colors";
import { useEffect, useRef } from "react";

type Props = {
    rank: number,
    userName: string,
    points: number,
    index: number,
    bottomBorder: boolean,
    animationKey: number
}

export default function LeaderBoardRow({ rank, userName, points, index, bottomBorder, animationKey }: Props) {

    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(10)).current;


    useEffect(() => {
        opacity.setValue(0);
        translateY.setValue(10);
        
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                delay: index * 60,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 350,
                delay: index * 60,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true
            })
        ]).start();
    }, [animationKey]);


    return (
        <Animated.View style={[{width: "100%", opacity: opacity, transform: [{ translateY: translateY }]}]}>
            <View style={{ width: "100%" }}>
                <View style={bottomBorder ? styles.leaderRow : [styles.leaderRow, {borderBottomWidth: 0}]}>
                    <LeaderBoardRowRank rank={rank} />
                    <LeaderBoardRowUserPic />
                    <LeaderUserInfo userName={userName} />
                    <LeaderboardScore score={points} />
                </View>
                <View style={{ width: "100%" }}>
                    <View style={{ borderWidth: 0 }}></View>
                </View>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({

    leaderRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
        height: 48.5,
        borderBottomWidth: 1,
        borderColor: COLORS.goldText
    }

});
