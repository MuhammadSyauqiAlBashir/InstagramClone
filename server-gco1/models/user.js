const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class User {
  static userCollection() {
    return database.collection("Users");
  }
  static async findAll() {
    const users = await this.userCollection().find().toArray();
    return users;
  }
  static async createUser(data) {
    const newUser = await this.userCollection().insertOne(data);
    return newUser;
  }
  static async findByUsername(username) {
    return this.userCollection().findOne({
      username: username,
    });
  }
  static async userDetails(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId("66025073c4a34dc17e2ca9ef"),
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followingId",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "followers.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "Follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      },
    ];
    const cursor = this.userCollection().aggregate(agg);
    const result = await cursor.toArray();
    console.log(result);
    return result[0]
  }
}

module.exports = User;
