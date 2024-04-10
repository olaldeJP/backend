import { COOKIE_OPTS } from "../config/cookie.Config.js";
export async function logout(req, res, next) {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ status: "logout error", body: err });
      }
      res.clearCookie("authorization", COOKIE_OPTS);
      return next();
    });
  } catch (error) {
    next(error);
  }
}
