import { Router } from "express";
import {
  register,
  updateTime,
  checkUserByEmail,
  checkToken,
  checkUserById,
  checkDocuments,
  updatePassword,
  changeRol,
} from "../../middlewares/users.Middleware.js";
import {
  welcomeEmail,
  sendEmailChangePassword,
} from "../../middlewares/email.Middleware.js";
import {
  returnSuccess,
  successcreateUser,
} from "../../controllers/statusManager.Controllers.js";
import { updateFilesUser } from "../../middlewares/multer.Middleware.js";
import { upload } from "../../config/multer.Config.js";
import { getCookieToken } from "../../middlewares/cookie.Middleware.js";

export const usersRouter = new Router();

usersRouter.post(
  "/create",
  register,
  welcomeEmail,
  updateTime,
  successcreateUser
);
usersRouter.put(
  "/sendEmailToChange",
  checkUserByEmail,
  sendEmailChangePassword
);

usersRouter.get(
  "/changePassword/:tokenjwt",
  checkToken,
  updatePassword,
  returnSuccess
);

usersRouter.put(
  "/premium/:idUser",
  getCookieToken,
  checkDocuments,
  changeRol,
  returnSuccess
);

usersRouter.post(
  "/:uid/documents",
  checkUserById,
  upload.array("files", 4),
  updateFilesUser,
  returnSuccess
);
