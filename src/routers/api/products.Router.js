import { Router } from "express";
import {
  addNewProduct,
  isPremiumOrAdmin,
  getAllProducts,
  getProductsById,
  linkProductOwner,
  updateProduct,
  ownerOfProduct,
  deleteProduct,
  getProductsPaginate,
} from "../../middlewares/products.Middleware.js";
import { getCookieToken } from "../../middlewares/cookie.Middleware.js";
import {
  succesResultProduct,
  successCreateProduct,
} from "../../controllers/statusManager.Controllers.js";
import { upload } from "../../config/multer.Config.js";
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
  isPremiumOrAdmin,
  linkProductOwner,
  upload.array("files", 4),
  addNewProduct,
  successCreateProduct
);

productsRouter.put(
  "/:pid",
  getCookieToken,
  isPremiumOrAdmin,
  ownerOfProduct,
  updateProduct,
  succesResultProduct
);
productsRouter.delete(
  "/:pid",
  getCookieToken,
  isPremiumOrAdmin,
  ownerOfProduct,
  deleteProduct,
  succesResultProduct
);
