import React, { useContext, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { gql, useQuery } from "@apollo/client";

const query = gql`
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
export function HomeScreen() {
  const { loading, error, data } = useQuery(query);
  const [show, setShow] = useState(false);
  const showSheet = () => {
    setShow(true);
  };

  return (
    <View>
      {data && data.posts.map((post, index) => <Text key={index}>{post.content}</Text>)}
    </View>
  );
}
