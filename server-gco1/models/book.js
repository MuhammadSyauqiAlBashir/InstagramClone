const { ObjectId } = require("mongodb");
const { database } = require("../config/mongo");

class Book {
  static bookCollection() {
    return database.collection("books");
  }
  static async findAll() {
    const books = await this.bookCollection().find().toArray();
    return books;
  }
}

module.exports = Book