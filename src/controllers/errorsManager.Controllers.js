import { logger } from "../utils/logger.js";

export async function errorManager(error, req, res, next) {
  if (!error.code || error.code == 11000) {
    error.code = 400;
  }
  logger.ERROR(
    `${req.method}   ${error.code} - ${error.message} /
  | Date: ${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()} `
  );
  res.status(error.code).json({ status: "ERROR", message: error.message });
}
