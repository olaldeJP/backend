import { engine } from "express-handlebars";
import { logger } from "../utils/logger.js";
export const handlebarsConf = (app) => {
  try {
    app.engine(
      "handlebars",
      engine({
        helpers: {
          eq: (v1, v2) => v1 === v2,
          neq: (v1, v2) => v1 !== v2,
        },
      })
    );
    app.set("view engine", "handlebars");
    app.set("views", "./public/views");
    logger.HTTP("Engine HandleBars - Success");
  } catch (error) {
    logger.FATAL("Engine HandleBars - Error");
  }
};
