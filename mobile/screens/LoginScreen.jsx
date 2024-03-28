import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import authContext from "../context/auth";
import * as SecureStore from "expo-secure-store";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoTitle from "../components/instagram";
const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;

export function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsSignedIn } = useContext(authContext);
  const [loginFunction, { loading, error, data }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync("accessToken", data?.login.accessToken);
      setIsSignedIn(true);
    },
  });
  function handleLogin() {
    loginFunction({ variables: { username: username, password: password } });
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LogoTitle />
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      ></TextInput>
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>
      <TouchableOpacity title="Home" onPress={() => handleLogin()}>
        <Text variant="titleLarge">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
