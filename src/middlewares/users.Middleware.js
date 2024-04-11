import { ErrorType, NewError } from "../config/errors.Config.js";
import { decrypt } from "../config/jwt.Config.js";
import { usersService } from "../services/users.Service.js";

export async function register(req, res, next) {
  try {
    req.user = await usersService.register(req.body);
    next();
  } catch (error) {
    return next(error);
  }
}

export async function updateTime(req, res, next) {
  try {
    await usersService.updateTimeUser(req.user.email);
    next();
  } catch (error) {
    next(error);
  }
}
export async function checkUserByEmail(req, res, next) {
  try {
    req["user"] = await usersService.findUserByEmail(req.body.email);
    next();
  } catch (error) {
    next(error);
  }
}
export async function checkToken(req, res, next) {
  try {
    const user = await decrypt(req.params.tokenjwt);
    if (user) {
      req["userId"] = user._id;
      return next();
    }
    throw new NewError(ErrorType.NOT_FOUND, "Link Expired");
  } catch (error) {
    next(error);
  }
}
export async function updatePassword(req, res, next) {
  try {
    await usersService.updatePassword(req.userId, req.body.password);
    next();
  } catch (error) {
    next(error);
  }
}
