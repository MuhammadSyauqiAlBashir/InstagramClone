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
    const newfollow = await this.followCollection().insertOne(data);
    return newfollow;
  }
}

module.exports = Follow;
