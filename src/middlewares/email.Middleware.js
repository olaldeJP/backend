import { cryptOneHour } from "../config/jwt.Config.js";
import { emailService } from "../services/email.Service.js";

export async function welcomeEmail(req, res, next) {
  emailService.sendWelcome(req.user.email, req.user.first_name);
  next();
}
export async function sendEmailChangePassword(req, res, next) {
  emailService.passwordChangeEmail(
    req.user.email,
    await cryptOneHour({ _id: req.user._id })
  );
  next();
}
