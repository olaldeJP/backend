import { logger } from "../utils/logger.js";

export async function errorManager(error, req, res, next) {
  try {
    if (!error.code || error.code == 11000) {
      error.code = 400;
    }
    logger.ERROR(
      `${req.method}   ${error.code} - ${error.message} /
  | Date: ${new Date().toLocaleTimeString()} - ${new Date().toLocaleDateString()} `
    );
    return res
      .status(error.code)
      .json({ status: "ERROR", message: error.message });
  } catch (error) {
    logger.FATAL(error);
  }
}
