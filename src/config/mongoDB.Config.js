import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
export const mongoConnection = (uri) => {
  mongoose
    .connect(uri)
    .then(() => logger.HTTP("Mongo Data Base Conected - Success"))
    .catch((error) => logger.FATAL("Error : ", error));
};
