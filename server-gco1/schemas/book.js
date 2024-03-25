const Book = require("../models/book");

const typeDefs = `#graphql
    type Book {
        _id : ID
        title : String!
        author : String
    }
    type Query {
        books: [Book]
    }
`;

const resolvers = {
  Query: {
    books: async () => {
      const books = await Book.findAll();
      return books;
    },
  },
};

module.exports = { typeDefs, resolvers};
