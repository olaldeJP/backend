import swaggerUiExpress from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { logger } from "../utils/logger.js";
const SWAGGER_CONFIG = {
  definition: {
    openapi: "3.0.1",
    info: {
      version: "1",
      title: "Swagger ",
      description: "Swagger For Ecommers",
    },
  },
  apis: ["./docs/**/*.yaml"],
};

const spec = swaggerJSDoc(SWAGGER_CONFIG);
export const swaggerConf = (app) => {
  app.use("/api-doc", swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
  logger.INFO(`Swagger config - Success`);
};
