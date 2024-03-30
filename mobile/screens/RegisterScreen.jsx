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
import React, { useContext, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LogoTitle from "../components/instagram";

const REGISTER = gql`
mutation Register($username: String!, $email: String!, $password: String!, $name: String) {
  register(username: $username, email: $email, password: $password, name: $name) {
    _id
    name
    username
    email
  }
}
`;

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [register, { error, loading, data }] = useMutation(REGISTER);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async () => {
    try {
      await register({
        variables: {
          name,
          username,
          email,
          password,
        },
      });
      navigation.navigate("Login");
      Alert.alert("Registration Successfull");
    } catch (error) {
      Alert.alert("Error Registering", error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
         size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.logoContainer}>
        <LogoTitle></LogoTitle>
      </View>
      <View style={Styles.mainContainer}>
        <FontAwesome5 name="user" size={20} color="#333" style={Styles.icon} />
        <TextInput
          style={Styles.mainInput}
          placeholder="name.."
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={Styles.mainContainer}>
        <SimpleLineIcons
          name="user"
          size={20}
          color="black"
          style={Styles.icon}
        />
        <TextInput
          style={Styles.mainInput}
          placeholder="username.."
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={Styles.mainContainer}>
        <Fontisto name="email" size={20} color="black" style={Styles.icon} />
        <TextInput
          style={Styles.mainInput}
          placeholder="email.."
          value={email}
          onChangeText={setEmail}
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
            name={passwordVisible ? 'eye' : 'eye-slash'}
            size={24}
            color="black"
            style={{ marginRight: 15, marginLeft: 10, fontSize: 17 }}
          
          />
        </TouchableOpacity>
      </View>
      <View style={Styles.registerContainer}>
        <TouchableOpacity>
          <Text>
            Already Have Account?{" "}
            <Text
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={Styles.registerText}
            >
              Login here
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={Styles.loginContainer} onPress={handleRegister}>
        <Text style={Styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
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
    alignItems: "flex-end",
    marginTop: 10,
    marginEnd: 20,
    alignContent: "space-between",
  },
  registerText: {
    color: "#0088f8",
  },
  loginContainer: {
    alignItems: "center",
    height: 40,
    marginTop: 30,
    backgroundColor: "#0088f8",
    justifyContent: "center",
    marginStart: 20,
    marginEnd: 20,
    borderRadius: 5,
  },
  loginText: {
    color: "#fff",
  },
});