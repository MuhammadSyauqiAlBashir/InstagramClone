import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";

const query = gql`
  query Query($id: String!) {
    detailPost(_id: $id) {
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
const like = gql`
  mutation Mutation($id: String!) {
    like(_id: $id) {
      likes {
        username
        createdAt
        updatedAt
      }
    }
  }
`;
function DetailPost({ route, navigation }) {
  const { _id } = route.params;
  const { username } = route.params;
  let flag = false

  const { loading, error, data, refetch } = useQuery(query, {
    variables: { id: _id },
    notifyOnNetworkStatusChange: true,
  });

  const [likefunction, { loading: loading2, error: error2, data: data2 }] =
    useMutation(like);
  data?.detailPost?.likes.map((item) => {
    if (item.username === username) {
      flag = true;
    }
  });
  async function handleLike() {
    try {
      await likefunction({
        variables: {
          id: _id,
        },
      });
      flag = true;
      refetch();
    } catch (error) {
      Alert.alert("Something Error", error.message);
    }
  }
  if (loading || loading2) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="account-circle" size={35} color="black" />
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.tags}>
            {data?.detailPost?.tags.map((item) => {
              return item + " ";
            })}
          </Text>
        </View>
      </View>
      <Image
        source={{
          uri: data.detailPost.imgUrl,
        }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <View style={styles.caption}>
          <TouchableOpacity onPress={handleLike}>
            <AntDesign
              name={flag ? "heart" : "hearto"}
              size={24}
              color={flag ? "red" : "black"}
              style={styles.iconComment}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Comments", { id: data.detailPost._id })
            }
          >
            <FontAwesome5
              name="comment"
              size={24}
              color="black"
              style={styles.iconComment}
            ></FontAwesome5>
          </TouchableOpacity>
          <Feather
            name="send"
            size={24}
            color="black"
            style={styles.iconComment}
          />
        </View>
        <View>
          {data.detailPost.likes.length > 1 && (
            <Text style={styles.numberOfLike}>
              Liked by {data.detailPost.likes[0].username} and{" "}
              {data.detailPost.likes.length - 1} others
            </Text>
          )}
          {data.detailPost.likes.length === 1 && (
            <Text style={styles.numberOfLike}>
              Liked by {data.detailPost.likes[0].username}
            </Text>
          )}
          {data.detailPost.likes.length === 0 && (
            <Text style={styles.numberOfLike}>
              No one has liked this post yet
            </Text>
          )}
        </View>
        <View style={styles.nameAccount}>
          <Text style={styles.postName}>{data.detailPost.author.username}</Text>
          <Text style={styles.description}>{data.detailPost.content}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    marginBottom: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  nameAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    width: "100%",
    height: 500,
  },
  footer: {
    padding: 10,
  },
  caption: {
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginStart: 5,
  },
  iconComment: {
    marginRight: 15,
    marginLeft: -5,
  },
  numberOfLike: {
    marginRight: 15,
    fontSize: 15,
  },
  description: {
    fontSize: 14,
    marginLeft: 7,
    marginTop: 2,
  },
  postName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  tags: {
    fontSize: 12,
    marginLeft: 10,
  },
});

export default DetailPost;
