import { COOKIE_OPTS } from "../config/cookie.Config.js";
import { ErrorType, NewError } from "../config/errors.Config.js";
import { crypt, decrypt } from "../config/jwt.Config.js";
import { usersService } from "../services/users.Service.js";

export async function saveCookieToken(req, res, next) {
  try {
    const signedCookie = await crypt(req.user);
    res.cookie("authorization", signedCookie, COOKIE_OPTS);
    next();
  } catch (error) {
    next(error);
  }
}

export async function getCookieToken(req, res, next) {
  try {
    const signedToken = req.signedCookies.authorization;
    if (signedToken) {
      const tokenDecrypt = await decrypt(signedToken);
      res.session = await usersService.findUserByEmail(tokenDecrypt.email);
      return next();
    }
    throw new NewError(ErrorType.FORBIDDEN_USER, "Please Loggin ");
  } catch (error) {
    next(error);
  }
}
