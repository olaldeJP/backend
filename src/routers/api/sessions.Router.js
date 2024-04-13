import { Router } from "express";
import passport from "passport";
import { updateTime } from "../../middlewares/users.Middleware.js";
import {
  getCookieToken,
  saveCookieToken,
} from "../../middlewares/cookie.Middleware.js";
import {
  returnSession,
  returnSuccess,
} from "../../controllers/statusManager.Controllers.js";
import { logout } from "../../middlewares/sessions.Middleware.js";
export const sessionsRouter = new Router();

sessionsRouter.post(
  "/login",
  passport.authenticate("loginLocal", {
    failWithError: true,
  }),
  updateTime,
  saveCookieToken,
  returnSuccess
);

sessionsRouter.get("/current", getCookieToken, returnSession);
sessionsRouter.delete("/logout", logout, returnSuccess);
