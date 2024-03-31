import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigators/StackNavigators";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </ApolloProvider>
  );
}
