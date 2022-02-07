const express = require("express");
const path = require("path");
var cors = require("cors");
const { ApolloServer, PubSub } = require("apollo-server-express");
const { createServer } = require("http");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
require("dotenv").config();
const pubsub = new PubSub();

const app = express();
const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === "production")
  app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const corsOptions = {
  origin: `http://localhost:${PORT}`,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);
db.once("open", () => {
  // change app to httpServer
  httpServer.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
