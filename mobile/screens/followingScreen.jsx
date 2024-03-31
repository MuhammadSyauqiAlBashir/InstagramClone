import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export function FollowingScreen({ route }) {
  const { following } = route.params;
  return (
    <>
      <ScrollView>
        {following.length > 0 &&
          following.map((item, id) => {
            return (
              <View key={id} style={Styles.header}>
                <Image
                  source={{ uri: "https://picsum.photos/300" }}
                  style={Styles.prfilePicture}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text style={Styles.username}>{item.username}</Text>
                  <Text style={Styles.name}>{item.name}</Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </>
  );
}

const Styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  name: {
    fontSize: 12,
    marginLeft: 10,
  },
  prfilePicture: {
    height: 50,
    width: 50,
    borderRadius: 100,
    marginLeft: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
});
