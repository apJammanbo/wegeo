import { prisma } from "../../../../prisma/generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";
import passport from "passport";

export default {
  Mutation: {
    test: async (_, args, { request }) => {
      passport.authenticate("google", { failureRedirect: "/login" });
      return "aa";
    }
  }
};
