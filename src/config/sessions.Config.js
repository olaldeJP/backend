import session from "express-session";
import MongoStore from "connect-mongo";
import { logger } from "../utils/logger.js";
export const sessionConf = (app, uri) => {
  try {
    app.use(
      session({
        store: MongoStore.create({
          mongoUrl: uri,
          mongoOptions: {},
          ttl: 15,
        }),
        secret: "secret",
        resave: false,
        saveUninitialized: false,
      })
    );
    logger.HTTP("Session Config - Success");
  } catch (error) {
    logger.FATAL("Session Config - Error");
  }
};
