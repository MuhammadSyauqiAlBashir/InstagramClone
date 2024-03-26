const { ObjectId } = require("mongodb");
const bcryptPass = require("../helpers/bcrypt");
const Tokenjwt = require("../helpers/jwt");
const Follow = require("../models/follow");
const User = require("../models/user");

const typeDefsFollow = `#graphql
    type Follow {
        _id : ID
        followingId : ID
        followerId : ID
        createdAt: String
        updatedAt: String
    }
    type Query {
      follows: [Follow]
    }
    type Mutation {
      follow(followingId: ID):Follow
    }
`;

const resolversFollow = {
  Query: {
    follows: async () => {
      const follows = await Follow.findAll();
      return follows;
    },
  },
  Mutation: {
    follow: async (_, { followingId }, { auth }) => {
      const data = auth();
      const followerId = new ObjectId(String(data._id));
      followingId = new ObjectId(String(followingId));
      const newFollow = {
        followingId,
        followerId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await Follow.createfollow(newFollow);
      newFollow._id = result.insertedId;
      return newFollow;
    },
  },
};

module.exports = { typeDefsFollow, resolversFollow };
