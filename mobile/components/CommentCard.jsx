import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

function Card({ Comment }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: `https://placekitten.com/g/200/300` }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{post.author.username}</Text>
      </View>
      <Image
        source={{
          uri: post.imgUrl,
        }}
        style={styles.image}
      />
      <View style={styles.footer}>
        <View style={styles.caption}>
          <TouchableOpacity onPress={toggleLike}>
            <AntDesign
              name={liked ? "heart" : "hearto"}
              size={24}
              color={liked ? "red" : "black"}
              style={styles.iconHeart}
            />
          </TouchableOpacity>
          <FontAwesome
            name="commenting"
            size={24}
            color="black"
            style={styles.icon}
          />
        </View>
        <Text style={styles.description}>{post.content}</Text>
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
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
    marginBottom: 5,
    marginStart: 5,
    marginTop: -5,
  },
  iconHeart: {
    marginTop: 5,
    marginRight: 15,
  },
  icon: {
    marginRight: 15,
    fontSize: 25,
    alignItems: "center",
    alignContent: "center",
  },
  description: {
    fontSize: 14,
  },
});

export default Card;
