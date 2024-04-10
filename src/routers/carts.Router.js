import { Router } from "express";
import { getCookieToken } from "../middlewares/cookie.Middleware.js";
import {
  createNewCart,
  linkCartWithUser,
} from "../middlewares/carts.Middleware.js";
import { successCart } from "../controllers/statusManager.Controllers.js";

export const cartsRouter = new Router();

cartsRouter.use(getCookieToken);
cartsRouter.post("/", createNewCart, linkCartWithUser, successCart);
cartsRouter.post(
  "/:cId/product/:pid",
  validarUsuarioNoSeaOwner,
  validarCarroUser,
  agregarProductosArregloCartsByCId
);
/*
cartsRouter.get("/:cId", validarCarroUser, mostrarCartByCId);
cartsRouter.get("/", mostrarListaDeCarts);
cartsRouter.put("/:cId", validarCarroUser, actualizarCarrito);
cartsRouter.delete(
  "/:cId/products/:pid",
  validarCarroUser,
  borrarProductoDelCarrito
);
cartsRouter.delete(
  "/:cId",
  validarCarroUser,
  eliminarTodosLosProductosDelCarrito
);
cartsRouter.post(
  "/:cId/purchase",
  validarCarroUser,
  validarStockYSumar,
  restarProducts,
  finalizarCompra
);
*/
