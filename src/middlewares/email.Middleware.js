import { cryptOneHour } from "../config/jwt.Config.js";
import { emailService } from "../services/email.Service.js";

export async function welcomeEmail(req, res, next) {
  try {
    emailService.sendWelcome(req.user.email, req.user.first_name);
    next();
  } catch (error) {
    next(error);
  }
}
export async function sendEmailChangePassword(req, res, next) {
  try {
    emailService.passwordChangeEmail(
      req.user.email,
      await cryptOneHour({ _id: req.user._id })
    );
    next();
  } catch (error) {
    next(error);
  }
}

export async function sendEmailDeleteAccount(req, res, next) {
  try {
    await res.usersInactive.forEach((user) => {
      emailService.deleteUserEmail(user.email);
    });
    next();
  } catch (error) {
    next(error);
  }
}
