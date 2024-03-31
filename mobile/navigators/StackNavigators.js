import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { AddPostScreen } from "../screens/AddPostScreen";
import TabNavigator from "./TabNavigators";
import { HomeScreen } from "../screens/HomeScreen";
import AuthContext from "../context/auth";
import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { LogoutScreen } from "../screens/LogoutScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { CommentScreen } from "../screens/CommentScreen";
import { FollowingScreen } from "../screens/followingScreen";
import { FollowerSCreen } from "../screens/followerScreen";
import DetailPost from "../screens/detailPost";
import { SearchProfile } from "../screens/searchprofile";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  async () => {
    const accessToken = await SecureStore.getItemAsync("accessToken");
    if (accessToken) {
      setIsSignedIn(true);
    }
  };
  return (
    <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      <Stack.Navigator>
        {!isSignedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
            name="Comments"
            component={CommentScreen}
            options={{headerShown: true}}
            />
            <Stack.Screen 
            name="FollowingScreen"
            component={FollowingScreen}
            options={{headerShown: true}}
            />
            <Stack.Screen 
            name="FollowerScreen"
            component={FollowerSCreen}
            options={{headerShown: true}}
            />
            <Stack.Screen 
            name="detailPost"
            component={DetailPost}
            options={{headerShown: true}}
            />
            <Stack.Screen 
            name="SearchProfile"
            component={SearchProfile}
            options={{headerShown: true}}
            />
            <Stack.Screen
              name="Logout"
              component={LogoutScreen}
              options={{ headerShown: true }}
            />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

export default StackNavigator;
