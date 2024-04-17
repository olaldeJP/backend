import express from "express";
import { apiRouter } from "../src/routers/api/api.Router.js";
import { initializePassport } from "../src/config/passport.Config.js";
import { logger } from "../src/utils/logger.js";
import { sessionConf } from "../src/config/sessions.Config.js";
import { mongoConnection } from "../src/config/mongoDB.Config.js";
import { cookieConf } from "../src/config/cookie.Config.js";
import { webRouter } from "../src/routers/web/web.Routers.js";
import { handlebarsConf } from "../src/config/handlebars.Config.js";
import { errorManager } from "../src/controllers/errorsManager.Controllers.js";
export class Server {
  #server;
  constructor(URL_MONGO) {
    try {
      this.#server = express();
      this.#server.use(express.json());
      this.#server.use(express.urlencoded({ extended: true }));
      this.#server.use(express.static("public"));
      cookieConf(this.#server);
      sessionConf(this.#server, URL_MONGO);
      initializePassport(this.#server);
      handlebarsConf(this.#server);
      mongoConnection(URL_MONGO);
      this.#server.use("/api", apiRouter);
      this.#server.use("/", webRouter);
      this.#server.use(errorManager);
      logger.HTTP(`Server config - Success`);
    } catch (error) {
      logger.FATAL(` Server Config - ${error}`);
    }
  }

  connect(port) {
    return new Promise((resolve, reject) => {
      try {
        this.#server = this.#server.listen(port, () => {
          logger.HTTP(`Server listening at port ${port} - Success`);
          resolve(true);
        });
      } catch (error) {
        logger.FATAL(`Server listening - ${error}`);
      }
    });
  }
  disconnect() {
    return new Promise((resolve, reject) => {
      try {
        this.#server.close((err) => {
          if (err) return reject(err);
          logger.HTTP(`Server Disconnect - Success`);
          resolve(true);
        });
      } catch (error) {
        logger.FATAL(`Server Disconnect - ${error}`);
      }
    });
  }
}
