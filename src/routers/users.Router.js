import { Router } from "express";
import {
  register,
  updateTime,
  checkUserByEmail,
  checkToken,
  updatePassword,
} from "../middlewares/users.Middleware.js";
import {
  welcomeEmail,
  sendEmailChangePassword,
} from "../middlewares/email.Middleware.js";
import {
  returnSuccess,
  createStatusUser,
} from "../controllers/statusManager.Controllers.js";

export const usersRouter = new Router();

usersRouter.post(
  "/create",
  register,
  welcomeEmail,
  updateTime,
  createStatusUser
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
