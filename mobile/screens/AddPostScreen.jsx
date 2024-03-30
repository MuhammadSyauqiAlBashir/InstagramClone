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
import { SimpleLineIcons } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const query = gql`
  mutation Mutation($content: String!, $tags: [String], $imgUrl: String!) {
    addPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
      _id
      content
      tags
      imgUrl
      authorId
      createdAt
      updatedAt
    }
  }
`;

export default function AddPostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setimgUrl] = useState("");
  const [addPost, { error, loading, data }] = useMutation(query);

  const handleAddPost = async () => {
    try {
      await addPost({
        variables: {
          content,
          tags,
          imgUrl,
        },
      });
      navigation.navigate("Home2");
    } catch (error) {
      Alert.alert("Error Add Post", error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={Styles.container}>
      <View style={Styles.mainContainer}>
        <MaterialIcons
          name="textsms"
          size={24}
          color="black"
          style={Styles.icon}
        />
        <TextInput
          style={Styles.mainInput}
          placeholder="Description.."
          value={content}
          onChangeText={setContent}
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
          placeholder="Tags.."
          value={tags}
          onChangeText={setTags}
        />
      </View>
      <View style={Styles.mainContainer}>
        <Entypo name="images" size={24} color="black" style={Styles.icon} />
        <TextInput
          style={Styles.mainInput}
          placeholder="imgUrl.."
          value={imgUrl}
          onChangeText={setimgUrl}
        />
      </View>
      <TouchableOpacity style={Styles.loginContainer} onPress={handleAddPost}>
        <Text style={Styles.loginText}>Add Post</Text>
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
