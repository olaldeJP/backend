import { Router } from "express";
import { getCookieToken } from "../../middlewares/cookie.Middleware.js";
import {
  checkUserIsNotOwner,
  createNewCart,
  checkCartIsFromUser,
  addProductToArrayUser,
  findCart,
  linkCartWithUser,
  showCarts,
  deleteAllProducts,
  deleteProductFromCart,
  replaceCart,
  subFromDataBase,
  saveNewTicket,
  checkCartStock,
} from "../../middlewares/carts.Middleware.js";
import {
  returnSuccess,
  successCart,
} from "../../controllers/statusManager.Controllers.js";

export const cartsRouter = new Router();

cartsRouter.use(getCookieToken);
cartsRouter.post("/", createNewCart, linkCartWithUser, successCart);
cartsRouter.post(
  "/:cid/product/:pid",
  checkUserIsNotOwner,
  checkCartIsFromUser,
  addProductToArrayUser,
  successCart
);
cartsRouter.get("/:cid", checkCartIsFromUser, findCart, successCart);
cartsRouter.get("/", showCarts, successCart);
cartsRouter.put("/:cid", checkCartIsFromUser, replaceCart, successCart);
cartsRouter.delete(
  "/:cid/products/:pid",
  checkCartIsFromUser,
  deleteProductFromCart,
  successCart
);
cartsRouter.delete(
  "/:cid",
  checkCartIsFromUser,
  deleteAllProducts,
  returnSuccess
);

cartsRouter.post(
  "/:cid/purchase",
  checkCartIsFromUser,
  findCart,
  checkCartStock,
  subFromDataBase,
  saveNewTicket,
  returnSuccess
);
