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
        detailPost(_id: String!): Post
    }
    type Mutation {
      addPost(content: String!,tags: [String], imgUrl: String!):Post
      like(_id: String!):Likes
      Comment(content: String!, _id: String!):Comments
    }
`;

const resolversPost = {
  Query: {
    posts: async () => {
      const posts = await Post.findAll();
      return posts;
    },
    detailPost: async (_, args) => {
      const id = args._id;
      const post = await Post.findPostById(id);
      return post;
    },
  },
  Mutation: {
    like: async (_, {_id}, {auth}) => {
      try {
        const user = auth()
        if (!_id) throw new Error("IdRequired");
        const newLike = {
          username: user.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const result = await Post.likeComment(
          _id,
          { likes: newLike } 
        );
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    Comment: async (_, {content, _id}, {auth}) => {
      try {
        const user = auth();
        if (!content) throw new Error("ContentRequired");
        if (!_id) throw new Error("IdRequired");
        const newComment = {
          content,
          username: user.username,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        const result = await Post.likeComment(
          _id,
          { comments: newComment } 
        );

        return result;
      } catch (error) {
        throw error;
      }
    },
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
