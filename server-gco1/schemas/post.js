const { ObjectId } = require("mongodb");
const Post = require("../models/post");

const typeDefsPost = `#graphql
    type Post {
        _id: ID
        content: String!
        tags: [String]
        imgUrl: String
        authorId: ID!
        comments:[Comments]
        likes:[Likes]
        createdAt: String
        updatedAt: String
        author: [author]
    }
    type author{
        _id: ID
        name: String
        username: String
        email: String
    }
    type Comments{
        content: String!
        username: String!
        createdAt: String
        updatedAt: String
    }
    type Likes{
        username: String!
        createdAt: String
        updatedAt: String
    }
    type Query {
        posts: [Post]
    }
    type Mutation {
      addPost(content: String!,tags: [String], imgUrl: String!):Post
    }
`;

const resolversPost = {
  Query: {
    posts: async () => {
      const posts = await Post.findAll();
      console.log(posts);
      return posts;
    },
  },
  Mutation: {
    addPost: async (_, { content, tags, imgUrl }, { auth }) => {
      try {
        let data = auth();
        const authorId = new ObjectId(String(data._id));
        const newPost = {
          content,
          tags,
          imgUrl,
          authorId,
          comments: [],
          likes: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        const result = await Post.createPost(newPost);
        newPost._id = result.insertedId;
        return newPost;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefsPost, resolversPost };
