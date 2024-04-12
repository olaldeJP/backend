import { usersService } from "../services/users.Service.js";
import { logger } from "../utils/logger.js";
export async function updateFilesUser(req, res, next) {
  if (req.body.type === "profile") {
    await usersService.updateArrayDocumentsUser(req.user);
  }
  try {
    for (let index = 0; index < req.files.length; index++) {
      const fileExist = await usersService.checkDocumentsArray(
        req.files[index].originalname,
        req.user.documents
      );
      if (!fileExist) {
        req.user.documents.push({
          name: req.files[index].originalname,
          path: req.files[index].path,
        });
      } else {
        logger.WARNING(
          `File ${req.files[index].originalname} Is Already Uploaded`
        );
      }
    }
    await usersService.updateArrayDocumentsUser(req.user);
    next();
  } catch (error) {
    next(error);
  }
}
