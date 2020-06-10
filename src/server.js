import "./env";
import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./../generated/prisma-client";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import "./passport";
import { authenticateJwt } from "./passport";

const PORT = process.env.PORT;

const server = new GraphQLServer({ schema, context: { prisma } });

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => {
    console.log(`http://localhost:${PORT}/`);
});
