const { ObjectId } = require("mongodb");
const Follow = require("../models/follow");

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
      const followerId = data._id;
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
