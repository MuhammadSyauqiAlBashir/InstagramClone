const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Post {
  static postCollection() {
    return database.collection("Posts");
  }
  static async findAll() {
    const posts = await this.postCollection().find().toArray();
    return posts;
  }
  static async createPost(data){
    const newpost = await this.postCollection().insertOne(data)
    return newpost
  }
}

module.exports = Post;
