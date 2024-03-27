require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const Tokenjwt = require("./helpers/jwt");
const { typeDefsUser, resolversUser } = require("./schemas/user");
const { typeDefsPost, resolversPost } = require("./schemas/post");
const { typeDefsFollow, resolversFollow } = require("./schemas/follow");


const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsPost,typeDefsFollow],
  resolvers: [resolversUser, resolversPost, resolversFollow],
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: ({ req, res }) => {
      return {
        auth: () => {
          const auth = req.headers.authorization;
          if (!auth) {
            throw new Error("Invalid Token");
          }
          const token = auth.split(" ")[1];
          const decoded = Tokenjwt.verify(token);
          return decoded;
        },
      };
    },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
