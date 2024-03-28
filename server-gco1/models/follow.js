const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Follow {
  static followCollection() {
    return database.collection("Follows");
  }
  static async findAll() {
    const follows = await this.followCollection().find().toArray();
    return follows;
  }
  static async createfollow(data) {
    const agg = [
      {
        $match: {
          followingId: new ObjectId(String(data.followingId)),
          followerId: new ObjectId(String(data.followerId)),
        },
      },
    ];
    const cursor = this.followCollection().aggregate(agg);
    const result = await cursor.toArray();
    if (result.length > 0) {
      throw new Error("Can not Follow Twice");
    } else {
      data.followingId = new ObjectId(String(data.followingId));
      data.followerId = new ObjectId(String(data.followerId));
      const newfollow = await this.followCollection().insertOne(data);
      return newfollow;
    }
  }
}

module.exports = Follow;
