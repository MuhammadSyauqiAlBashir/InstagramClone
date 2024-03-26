const { ObjectId } = require("mongodb");
const bcryptPass = require("../helpers/bcrypt");
const Tokenjwt = require("../helpers/jwt");
const User = require("../models/user");

const typeDefsUser = `#graphql
    type User {
        _id : ID
        name : String
        username : String!
        email : String!
        password : String!
        followingDetail:[userDetail]
        followerDetail:[userDetail]
    }
    type userDetail{
        _id : ID
        name : String
        username : String
        email : String
        password : String
    }
    type Query {
      users: [User],
      userDetail: User
    }
    type Token{
      accessToken: String
    }
    type Mutation {
      register(name: String!, username: String!, email: String!, password: String!):User
      login(username: String!, password: String!):Token
    }
`;

const resolversUser = {
  Query: {
    users: async () => {
      const users = await User.findAll();
      return users;
    },
    userDetail: async (_, __, { auth }) => {
      const data = auth();
      const userId = new ObjectId(String(data._id));
      const user = await User.userDetails(userId);
      return user;
    },
  },
  Mutation: {
    register: async (_, { name, username, email, password }) => {
      password = bcryptPass.hashPassword(password);
      const newUser = {
        name,
        username,
        email,
        password,
      };
      const result = await User.createUser(newUser);
      newUser._id = result.insertedId;
      return newUser;
    },
    login: async (_, args) => {
      try {
        const { username, password } = args;
        if (!username) throw { name: "UsernameRequired" };
        if (!password) throw { name: "PasswordRequired" };
        const user = await User.findByUsername(username);
        if (!user) throw { name: "InvalidLogin" };
        const checkPass = bcryptPass.comparePassword(password, user.password);
        if (!checkPass) throw { name: "InvalidLogin" };
        const token = {
          accessToken: Tokenjwt.genToken({
            _id: user._id,
            email: user.email,
          }),
        };
        return token;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { typeDefsUser, resolversUser };
