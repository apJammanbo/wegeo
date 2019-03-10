import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "../prisma/generated/prisma-client";

/**
 * jwtOption 설정
 */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.PRISMA_MANAGEMENT_API_SECRET
};

/**
 * 유저 인증
 */
const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({ id: payload.id });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

/**
 * JWT Token 인증
 */
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

/**
 * JWT Strategy 설정
 */
passport.use(new Strategy(jwtOptions, verifyUser));

/**
 * GoogleStrategy 설정
 */
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "546932309316-n6cdk1781qutho19sc1jvtf3lbv0a272.apps.googleusercontent.com",
      clientSecret: "TlMV1CMLaVfMSNj5oAVLthst",
      callbackURL: "http://localhost:4000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.initialize();
