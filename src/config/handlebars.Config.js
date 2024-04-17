import { engine } from "express-handlebars";
import { logger } from "../utils/logger.js";
export const handlebarsConf = (app) => {
  try {
    app.engine("handlebars", engine());
    app.set("view engine", "handlebars");
    app.set("views", "./public/views");
    logger.HTTP("Engine HandleBars - Success");
  } catch (error) {
    logger.FATAL("Engine HandleBars - Error");
  }
};
