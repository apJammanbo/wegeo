import { prisma } from "../../../../prisma/generated/prisma-client";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { id } = args;
      return prisma.user({ id });
    }
  }
};
