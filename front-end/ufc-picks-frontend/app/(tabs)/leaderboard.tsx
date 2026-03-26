import LeaderboardLeader from "@/components/Leaderboard/LeaderBoardLeader/LeaderBoardLeader";
import LeaderBoardRow from "@/components/Leaderboard/LeaderBoardRow/LeaderboardRow";
import { useFocusEffect } from "expo-router";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Animated, Easing } from "react-native";



export default function LeaderBoard({ }) {

  const mockUsers = Array.from({ length: 9 });
  const [animationKey, setAnimationKey] = useState(0);

  function handleLeaderBoard(){
    
  }

  useFocusEffect(
      React.useCallback(() => {
        setAnimationKey((prev) => prev + 1);
      }, [])
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LeaderboardLeader rank={1} userName={"@keathTheGuru"} points={1500} index={1} animationKey={animationKey} />
      <View style={styles.rowContainer}>
        {mockUsers.map((_, index) => (
          <LeaderBoardRow 
            rank={index + 2} 
            userName={"test"} 
            points={1000} 
            index={index} 
            key={index} 
            bottomBorder={index !== mockUsers.length - 1}
            animationKey={animationKey}/>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingStart: 16,
    paddingEnd: 16,
  },

  rowContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 18,
    backgroundColor: "#252525"
  }
});