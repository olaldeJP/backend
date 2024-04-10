import { ErrorType, NewError } from "../config/errors.Config.js";
import { isAdmin, isPremium } from "../utils/authorizathion.js";
import { productService } from "../services/products.Service.js";
export async function isAuthorizate(req, res, next) {
  try {
    if ((await isAdmin(res.session)) || (await isPremium(res.session))) {
      return next();
    }
    throw new NewError(
      ErrorType.UNAUTHORIZED_USER,
      "User has not Authorizathion to do this"
    );
  } catch (error) {
    next(error);
  }
}

export async function linkProductOwner(req, res, next) {
  try {
    req.body.owner = res.session._id;
    return next();
  } catch (error) {
    next(error);
  }
}
export async function getAllProducts(req, res, next) {
  try {
    res["products"] = await productService.readManyProducts();
    next();
  } catch (error) {
    next(error);
  }
}
export async function getProductsById(req, res, next) {
  try {
    res["products"] = await productService.findById(req.params.pid);
    next();
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    res["products"] = await productService.updateProduct(
      req.params.pid,
      req.body
    );
    next();
  } catch (error) {
    next(error);
  }
}
export async function ownerOfProduct(req, res, next) {
  try {
    const product = await productService.findById(req.params.pid);
    if (res.session._id === product.owner) {
      return next();
    }
    throw new NewError(
      ErrorType.UNAUTHORIZED_USER,
      "You are not the owner of this product"
    );
  } catch (error) {
    next(error);
  }
}
export async function deleteProduct(req, res, next) {
  try {
    res["products"] = await productService.deleteProductoID(req.params.pid);
    next();
  } catch (error) {
    next(error);
  }
}
export async function addNewProduct(req, res, next) {
  try {
    res["products"] = await productService.createProduct(req.body);
    next();
  } catch (error) {
    next(error);
  }
}
export async function getProductsPaginate(req, res, next) {
  try {
    res["products"] = await productService.showPaginateProducts(req);
    next();
  } catch (error) {
    next(error);
  }
}
