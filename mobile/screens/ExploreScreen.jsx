import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, gql } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

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

const query2 = gql`
  query Query {
    posts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;
const query3 = gql`
  query Query {
    myProfile {
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
  const { loading: loading2, error: error2, data: data2 } = useQuery(query2);
  const { loading: loading3, error: error3, data: data3 } = useQuery(query3);

  const { data, loading, error } = useQuery(query, {
    variables: { username: keyword },
  });
  const RenderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("detailPost", {
              _id: item._id,
              username: data3.myProfile.username,
            })
          }
        >
          <Image
            source={{ uri: item.imgUrl }}
            style={{
              height: 200,
              flex: 1,
              marginEnd: 2,
              marginBottom: 2,
              alignItems: "center",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by username"
        value={keyword}
        onChangeText={setkeyword}
        autoCapitalize="none"
      />
      {keyword === "" && (
        <FlatList
          data={data2.posts}
          renderItem={({ item }) => <RenderItem item={item} />}
          numColumns={3}
          indicatorStyle={"black"}
          showsVerticalScrollIndicator={true}
        />
      )}
      <ScrollView style={{ flex: 1 }}>
        {keyword !== "" &&
          data?.findUser.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.resultItem}
                onPress={() =>
                  navigation.navigate("SearchProfile", {
                    id: item?._id,
                  })
                }
              >
                <MaterialCommunityIcons
                  style={{ marginTop: 4 }}
                  name="account-circle"
                  size={35}
                  color="black"
                />
                <View style={{ flexDirection: "column", marginLeft: 8 }}>
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
    flexDirection: "row",
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
