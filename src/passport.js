import passport from "passport";
import jwt from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const opts = {
    jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET,
};

const verifyUser = async (payload, done) => {
    try {
        const user = await prisma.user({ id: payload.id });
        if (user !== null) {
            console.log("not null");
            return done(null, user);
        } else {
            console.log("null");
            return done(null, false);
        }
    } catch (err) {
        console.log("err");
        return done(err, false);
    }
};

export const authenticateJwt = (req, res, next) =>
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (user) {
            req.user = user;
        }
        next();
    })(req, res, next);

passport.use(new jwt.Strategy(opts, verifyUser));
