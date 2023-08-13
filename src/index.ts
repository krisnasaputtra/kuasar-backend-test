import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";

import http from "http";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

import { typeDefs, resolvers } from "./schema/index.js";
import sequelizeConnection from "./db/index.js";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await sequelizeConnection.sync();

await server.start();

app.use(
  "/graphql",
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
