import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import Card from "../components/card";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
const query2 = gql`
  query Query {
    myProfile {
      _id
      name
      username
      email
      followingDetail {
        _id
        name
        username
        email
      }
      followerDetail {
        _id
        name
        username
        email
      }
    }
  }
`;

export function HomeScreen({navigation}) {
  const { loading: loading2, error: error2, data: data2, refetch:refetch2 } = useQuery(query2);
  const { loading, error, data, refetch } = useQuery(query);
  if (loading || loading2) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  let flag = false
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    refetch2()
    flag = false;
    setRefreshing(false);
  }, []);
  let user = data2?.myProfile;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data &&
        data?.posts?.map((post, index) => (
          <Card navigation={navigation} key={index} flag={flag} user={user} refetch={refetch} post={post}></Card>
        ))}
    </ScrollView>
  );
}
