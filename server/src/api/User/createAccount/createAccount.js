import { prisma } from "../../../../prisma/generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { name, email } = args;
      if (await prisma.user({ email })) {
        throw new Error("같은 이메일의 아이디가 존재합니다.");
      }
      const user = await prisma.createUser({
        name,
        email
      });
      return user;
    }
  }
};
