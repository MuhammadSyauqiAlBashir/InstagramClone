const { database } = require("../config/mongo");
const redis = require("../config/redis");
class Post {
  static postCollection() {
    return database.collection("Posts");
  }
  static async findAll() {
    const redisPosts = await redis.get("posts");
    if (redisPosts) {
      return JSON.parse(redisPosts);
    } else {
      const agg = [
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $lookup: {
            from: "Users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
      ];
      const cursor = this.postCollection().aggregate(agg);
      const result = await cursor.toArray();
      return result
    }
  }
  static async createPost(data) {
    const newpost = await this.postCollection().insertOne(data);
    await redis.del("posts");
    return newpost;
  }
}

module.exports = Post;
