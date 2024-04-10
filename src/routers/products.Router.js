import { Router } from "express";
import {
  addNewProduct,
  isAuthorizate,
  getAllProducts,
  getProductsById,
  linkProductOwner,
  updateProduct,
  ownerOfProduct,
  deleteProduct,
  getProductsPaginate,
} from "../middlewares/products.Middleware.js";
import { getCookieToken } from "../middlewares/cookie.Middleware.js";
import {
  succesResultProduct,
  successCreateProduct,
} from "../controllers/statusManager.Controllers.js";
export const productsRouter = new Router();

productsRouter.get("/", getAllProducts, succesResultProduct);
productsRouter.get("/:pid", getProductsById, succesResultProduct);
productsRouter.get(
  "/products/paginate",
  getProductsPaginate,
  succesResultProduct
);
productsRouter.post(
  "/",
  getCookieToken,
  isAuthorizate,
  linkProductOwner,
  addNewProduct,
  successCreateProduct
);

productsRouter.put(
  "/:pid",
  getCookieToken,
  isAuthorizate,
  ownerOfProduct,
  updateProduct,
  succesResultProduct
);
productsRouter.delete(
  "/:pid",
  getCookieToken,
  isAuthorizate,
  ownerOfProduct,
  deleteProduct,
  succesResultProduct
);
