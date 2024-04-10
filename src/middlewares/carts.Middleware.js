import { cartsService } from "../services/carts.Service.js";
import { usersService } from "../services/users.Service.js";
import { productService } from "../services/products.service.js";
import { NewError, ErrorType } from "../config/errors.Config.js";
export async function createNewCart(req, res, next) {
  try {
    res["cart"] = await cartsService.createCart();
    return next();
  } catch (error) {
    next(error);
  }
}
export async function linkCartWithUser(req, res, next) {
  try {
    await usersService.addCartToUser(res.session.email, res.cart._id);
    next();
  } catch (error) {
    next(error);
  }
}
export async function checkUserIsNotOwner(req, res, next) {
  try {
    req["cid"] = req.params.cid;
    req["product"] = await productService.findById(req.params.pid);
    if (!(res.session._id === req.product.owner)) {
      next();
    } else {
      throw new NewError(
        ErrorType.UNAUTHORIZED_USER,
        "Error - Owner of product"
      );
    }
  } catch (error) {
    next(error);
  }
}
export async function findCartUser(req, res, next) {
  try {
    res["cart"] = await usersService.findCartById(req.cid, res.session.email);
    next();
  } catch (error) {
    next(error);
  }
}
export async function addProductToArrayUser(req, res, next) {
  try {
    res["cart"] = await cartsService.addProductToCart(req.cid, req.product);
    next();
  } catch (error) {
    next(error);
  }
}
