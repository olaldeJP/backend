import cookieParser from "cookie-parser";
import { COOKIE_KEY } from "./config.js";
export const COOKIE_OPTS = {
  signed: true,
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
};
import { logger } from "../utils/logger.js";
export const cookieConf = async function (app) {
  try {
    app.use(cookieParser(COOKIE_KEY));
    logger.HTTP("Cookie Config - Success");
  } catch (error) {
    logger.FATAL("Cookie Config - Error");
  }
};
