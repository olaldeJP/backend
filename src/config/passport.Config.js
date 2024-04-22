import passport from "passport";
import { usersService } from "../services/users.Service.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import {
  GITHUB_CLIENT_SECRET,
  GITHUB_URL_CALLBACK,
  GITHUB_CLIENT_ID,
} from "./config.js";

export const initializePassport = (app) => {
  passport.use(
    "loginLocal",
    new LocalStrategy(
      {
        usernameField: "email",
      }, //cambia el ussernameField por email
      async function validUser(username, password, done) {
        //por defecto busca el email y passport del req.body
        try {
          const userLogin = await usersService.loginUser({
            email: username,
            password: password,
          });
          done(null, userLogin);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "loginGithub",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_URL_CALLBACK,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const user = await usersService.findOrCreate(profile.username);
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
  passport.serializeUser((user, next) => {
    next(null, user);
  });

  passport.deserializeUser((user, next) => {
    next(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
