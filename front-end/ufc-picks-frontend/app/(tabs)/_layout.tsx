import { COLORS } from '@/theme/colors';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#0F1115",
          borderBottomColor: "#2B303A",
          borderBottomWidth: .5
        },
        headerTintColor: COLORS.goldText,
        headerTitleStyle: {
          fontWeight: 800
        },
        sceneStyle: { backgroundColor: "#1b1c1d4b" },
        tabBarStyle: {
          backgroundColor: "#0F1115",
          borderTopColor: "#2B303A",
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarActiveTintColor: COLORS.goldText,
          title: "EVENTS",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          tabBarActiveTintColor: COLORS.goldText,
          title: "LEADERBOARD",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "trophy" : "trophy-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarActiveTintColor: COLORS.goldText,
          title: "PROFILE",
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              size={size}
              color={color}
            />
          ),
        }} />
    </Tabs>
  );
}

