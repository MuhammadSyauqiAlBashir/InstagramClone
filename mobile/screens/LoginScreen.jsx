import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import authContext from "../context/auth";
import * as SecureStore from "expo-secure-store";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoTitle from "../components/instagram";
import { Colors } from "react-native/Libraries/NewAppScreen";
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setIsSignedIn } = useContext(authContext);
  const [loginFunction, { loading, error, data }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await SecureStore.setItemAsync("accessToken", data?.login.accessToken);
      setIsSignedIn(true);
    },
  });
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  async function handleLogin() {
    try {
      await loginFunction({
        variables: { username: username, password: password },
      });
      setPassword("");
      setUsername("");
      Alert.alert("Login Successful");
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  }
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <LogoTitle></LogoTitle>
      </View>
      <View style={Styles.mainContainer}>
        <SimpleLineIcons
          name="user"
          size={20}
          color="black"
          style={Styles.icon}
        />
        <TextInput
          onChangeText={setUsername}
          value={username}
          style={Styles.mainInput}
          placeholder="username.."
        />
      </View>
      <View style={Styles.mainContainer}>
        <Feather name="lock" size={20} color="black" style={Styles.icon} />
        <TextInput
          style={Styles.mainInput}
          placeholder="password.."
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <FontAwesome6
            name={passwordVisible ? "eye" : "eye-slash"}
            size={24}
            color="black"
            style={{ marginRight: 15, marginLeft: 10, fontSize: 17 }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={Styles.loginContainer} onPress={handleLogin}>
        <Text style={Styles.loginText}>Log in</Text>
      </TouchableOpacity>
      <View style={Styles.registerContainer}>
        <Text>-Or-</Text>
      </View>
      <View style={Styles.registerContainer}>
        <TouchableOpacity>
          <Text>
            Dont't Have Account?{" "}
            <Text
              onPress={() => {
                navigation.navigate("Register");
              }}
              style={Styles.registerText}
            >
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 5,
    marginLeft: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  mainContainer: {
    borderColor: "#ececec",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  mainInput: {
    flex: 1,
    marginLeft: 2,
    fontSize: 14,
  },
  registerContainer: {
    alignItems: "center",
    alignContent: "space-between",
    marginTop: 90,
  },
  registerText: {
    color: "#0088f8",
  },
  loginContainer: {
    alignItems: "center",
    height: 50,
    marginTop: 30,
    backgroundColor: "#0088f8",
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
