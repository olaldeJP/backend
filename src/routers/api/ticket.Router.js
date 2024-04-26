import { Router } from "express";
import {
  checkCartIsFromUser,
  checkCartStock,
  findCart,
  saveNewTicket,
  subFromDataBase,
} from "../../middlewares/carts.Middleware.js";
import { succesPurchase } from "../../controllers/statusManager.Controllers.js";
import { getCookieToken } from "../../middlewares/cookie.Middleware.js";
import { deleteCartFromUser } from "../../middlewares/users.Middleware.js";
import { sendEmailTicket } from "../../middlewares/email.Middleware.js";

export const ticketRouter = new Router();

ticketRouter.post(
  "/:cid/purchase",
  getCookieToken,
  checkCartIsFromUser,
  findCart,
  checkCartStock,
  subFromDataBase,
  saveNewTicket,
  sendEmailTicket,
  deleteCartFromUser,
  succesPurchase
);
