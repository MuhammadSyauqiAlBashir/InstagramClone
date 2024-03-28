import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { AddPostScreen } from "../screens/AddPostScreen";
import TabNavigator from "./TabNavigators";
import { HomeScreen } from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
