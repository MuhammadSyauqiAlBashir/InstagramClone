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
  static async createUser(data){
    const newUser = await this.userCollection().insertOne(data)
    return newUser
  }
}

module.exports = User;
