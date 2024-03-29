import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import authContext from "../context/auth";

export function LogoutScreen() {
  const { setIsSignedIn, isSignedIn } = useContext(authContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Logout Screen</Text>
      <TouchableOpacity>
        <Text
          onPress={async () => {
            await SecureStore.deleteItemAsync("accessToken");
            setIsSignedIn(false);
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
