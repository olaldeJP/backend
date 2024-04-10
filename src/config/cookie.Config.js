import cookieParser from "cookie-parser";
import { COOKIE_KEY } from "./config.js";
export const COOKIE_OPTS = {
  signed: true,
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
};

export const cookieConf = async function (app) {
  app.use(cookieParser(COOKIE_KEY));
};
