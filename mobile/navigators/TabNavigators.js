import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import { ReelsScreen } from "../screens/ReelsScreen";
import { Foundation } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import LogoTitle from "../components/instagram";
import AddPostScreen from "../screens/AddPostScreen";
import ExploreScreen from "../screens/ExploreScreen";
import HeartLogo from "../components/heart";

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerLeft: () => <LogoTitle />,
        headerRight: () => <HeartLogo />
      }}
    >
      <Tab.Screen
        name="Home2"
        component={HomeScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-variant"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="search1" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square-o" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="reels"
        component={ReelsScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="play-box-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
