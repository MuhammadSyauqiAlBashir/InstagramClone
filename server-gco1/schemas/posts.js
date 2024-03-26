const bcryptPass = require("../helpers/bcrypt");
const Post = require("../models/post");
const User = require("../models/post");

const typeDefsPost = `#graphql
    type Post {
        _id : ID
        content : String!
        tags : []
    }
    type Query {
        posts: [Post]
    }
    type Mutation {
      addPost(name: String!, username: String!, email: String!, password: String!):Post
    }
`;

const resolversPost = {
  Query: {
    posts: async () => {
      const posts = await Post.findAll();
      return posts;
    },
  },
  Mutation: {
    addUser: async (_, { name, username, email, password }) => {
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
  },
};

module.exports = { typeDefsPost, resolversPost };
