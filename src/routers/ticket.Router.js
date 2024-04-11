import { Router } from "express";
import {
  checkCartIsFromUser,
  checkCartStock,
  findCart,
  saveNewTicket,
  subFromDataBase,
} from "../middlewares/carts.Middleware.js";
import { succesPurchase } from "../controllers/statusManager.Controllers.js";
import { getCookieToken } from "../middlewares/cookie.Middleware.js";

export const ticketRouter = new Router();

ticketRouter.post(
  "/:cid/purchase",
  getCookieToken,
  checkCartIsFromUser,
  findCart,
  checkCartStock,
  subFromDataBase,
  saveNewTicket,
  succesPurchase
);
