const express = require("express");
const path = require("path");
// Pubsub on this line
const { ApolloServer, PubSub } = require("apollo-server-express");
// this line
const { createServer } = require('http');
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
require("dotenv").config();

// this line
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

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production")
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// this line(38, 39)
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
