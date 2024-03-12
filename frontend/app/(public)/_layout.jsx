import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F3E7FD",
          // backgroundColor: '$purple'
        },
        headerTintColor: "#000",
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "MalaMal App",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerTitle: "Create Account",
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
