import React, { useCallback, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import images from "../res/images";
import { gql, useQuery } from "@apollo/client";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const data1 = [{ key: "1" }];

const query = gql`
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
      userPost {
        _id
        content
        tags
        imgUrl
        authorId
        createdAt
        updatedAt
      }
    }
  }
`;

export function ProfileScreen({ navigation }) {
  const { loading, error, data, refetch } = useQuery(query);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    flag = false;
    setRefreshing(false);
  }, []);
  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const RenderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("detailPost", {
              _id: item._id, username: data.myProfile.username
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
    <>
      <SafeAreaView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={Styles.header}>
          <Feather name="lock" size={24} color="black" />
          <View style={{ flexDirection: "column" }}>
            <Text style={Styles.username}>{data.myProfile.username}</Text>
          </View>
          <MaterialIcons
            style={Styles.icon}
            name="keyboard-arrow-down"
            size={24}
            color="black"
          />
          <View style={Styles.reverse}>
            <MaterialIcons
              style={Styles.icon}
              name="alternate-email"
              size={24}
              color="black"
            />
            <FontAwesome
              style={Styles.icon}
              name="plus-square-o"
              size={24}
              color="black"
            />
            <TouchableOpacity onPress={() => navigation.navigate("Logout")}>
              <FontAwesome5
                style={Styles.icon}
                name="bars"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <FlatList
        style={{ flex: 1, backgroundColor: "white", marginTop: -35 }}
        data={data1}
        renderItem={() => (
          <>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            >
              <View style={Styles.container}>
                <TouchableOpacity>
                  <Image
                    source={{ uri: "https://picsum.photos/600" }}
                    style={Styles.prfilePicture}
                  />
                </TouchableOpacity>

                <View style={Styles.container2}>
                  <View style={Styles.container3}>
                    <TouchableOpacity>
                      <Text style={Styles.numberContainer}>
                        {data.myProfile.userPost.length}
                      </Text>
                      <Text style={Styles.text}>Posts</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.container3}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("FollowerScreen", {
                          follower: data.myProfile.followerDetail,
                        })
                      }
                    >
                      <Text style={Styles.numberContainer}>
                        {data.myProfile.followerDetail.length}
                      </Text>
                      <Text style={Styles.text}>Followers</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.container3}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("FollowingScreen", {
                          following: data.myProfile.followingDetail,
                        })
                      }
                    >
                      <Text style={Styles.numberContainer}>
                        {data.myProfile.followingDetail.length}
                      </Text>
                      <Text style={Styles.text}>Following</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  marginStart: 10,
                  marginTop: 20,
                }}
              >
                <View style={{ marginBottom: 5 }}>
                  <Text style={{ color: "black", fontWeight: "bold" }}>
                    {data.myProfile.username}
                  </Text>
                </View>
                <View style={{ marginBottom: 5 }}>
                  <Text style={{ color: "black" }}>
                    Hello, this is my instagram profile.
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                  <View
                    style={{
                      flex: 1,
                      height: 30,
                      borderRadius: 5,
                      marginStart: 10,
                      marginEnd: 10,
                      backgroundColor: "#E4E3E3",
                      justifyContent: "center",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={{ color: "black" }}>Edit Profile</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <ScrollView horizontal={true}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginStart: 10,
                    marginEnd: 10,
                    marginTop: 10,
                    marginBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#E4E3E3",
                        width: 64,
                        height: 64,
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#262626",
                      }}
                    >
                      <Ionicons name="add" size={40} color="black" />
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    New
                  </Text>
                </View>
              </ScrollView>
              <View
                style={{
                  backgroundColor: "#DAD7D7",
                  height: 1,
                  justifyContent: "center",
                  marginTop: 10,
                }}
              ></View>
              <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginVertical: 10,
                }}
              >
                <TouchableOpacity style={{ flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    style={Styles.iconProfile}
                    name="grid"
                    size={30}
                    color="black"
                  />
                  <MaterialCommunityIcons
                    name="account-box-outline"
                    size={30}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>
            <FlatList
              data={data.myProfile.userPost}
              style={{ marginTop: 2, marginStart: 2 }}
              renderItem={({ item }) => <RenderItem item={item} />}
              numColumns={3}
              indicatorStyle={"black"}
              showsVerticalScrollIndicator={true}
            />
          </>
        )}
      />
    </>
  );
}

const Styles = StyleSheet.create({
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  reverse: {
    flexDirection: "row",
    width: "75%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  tags: {
    fontSize: 12,
    marginLeft: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  prfilePicture: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginLeft: 20,
  },
  numberContainer: {
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginEnd: 20,
  },
  text: {
    color: "black",
    //fontWeight: 'bold',
    alignSelf: "center",
  },
  container3: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    marginRight: 15,
    marginLeft: -5,
  },
  iconProfile: {
    marginRight: 150,
    marginLeft: -5,
  },
});
