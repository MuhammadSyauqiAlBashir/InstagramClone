import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const query = gql`
  query Query($username: String) {
    findUser(username: $username) {
      _id
      name
      username
      email
    }
  }
`;

export default function ExploreScreen() {
  const [keyword, setkeyword] = useState("");
  const navigation = useNavigation();
  const { data, loading, error } = useQuery(query, {
    variables: { username: keyword },
  });
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by username"
        value={keyword}
        onChangeText={setkeyword}
        autoCapitalize="none"
      />
      <ScrollView style={{ flex: 1 }}>
        {keyword !== "" &&
          data?.findUser.map((item) => {
            return (
              <TouchableOpacity
                key={data?.findUser._id}
                style={styles.resultItem}
                onPress={() =>
                  navigation.navigate("SearchProfile", { username: item?.username })
                }
              >
                <MaterialCommunityIcons style={{marginTop:4}} name="account-circle" size={35} color="black" />
                <View style={{flexDirection:"column", marginLeft: 8}}>
                <Text style={styles.name}>{item?.name}</Text>
                <Text style={styles.username}>{item?.username}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    flexDirection:"row"
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: -5,
  },
  username: {
    fontSize: 17,
    marginLeft: -5,
  },
  email: {
    fontSize: 16,
    color: "gray",
  },
});
