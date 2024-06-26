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
    return this.userCollection()
      .find({
        username: { $regex: username },
      })
      .toArray();
  }
  static async findByEmail(email) {
    return this.userCollection().findOne({
      email: email,
    });
  }
  static async userDetails(id) {
    const agg = [
      {
        $match: {
          _id: new ObjectId(String(id)),
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
      {
        $lookup: {
          from: "Posts",
          localField: "_id",
          foreignField: "authorId",
          as: "userPost",
        },
      },
    ];
    const cursor = this.userCollection().aggregate(agg);
    const result = await cursor.toArray();
    return result[0];
  }
}

module.exports = User;
