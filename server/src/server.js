import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import passport from "passport";

/**
 * Grapqhql Server 생성
 */
const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

// #region 구글 인증

/**
 * 구글 인증 요청
 */
server.express.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

/**
 * 구글 인증 콜백
 */
server.express.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    // 인증이 실패하면 진행될 리다이렉트 주소
    failureRedirect: "/login",
    // JWT를 사용하기 때문에 세션은 사용하지 않는다.
    session: false
  }),
  function(req, res) {
    res.cookie("token", "token");
    res.redirect("/");
  }
);

// #endregion

server.express.use(authenticateJwt);

export default server;
