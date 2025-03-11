import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
