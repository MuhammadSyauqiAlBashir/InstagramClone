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
  static async findByUsername(username) {
    return this.userCollection().findOne({
      username: username
    })
  }
}

module.exports = User;
