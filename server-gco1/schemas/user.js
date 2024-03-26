const bcryptPass = require("../helpers/bcrypt");
const User = require("../models/user");

const typeDefs = `#graphql
    type User {
        _id : ID
        name : String
        username : String!
        email : String!
        password : String!
    }
    type Query {
        users: [User]
    }
    type Mutation {
      addUser(name: String, username: String!, email: String!, password: String!):User
    }
`;

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.findAll();
      return users;
    },
  },
  Mutation : {
    addUser: async (_, {name, username, email, password}) => {
      password = bcryptPass.hashPassword(password)
      const newUser = { 
        name, username, email, password
      }
      const result = await User.createUser(newUser)
      newUser._id = result.insertedId
      return newUser
    }
  }
};

module.exports = { typeDefs, resolvers };
