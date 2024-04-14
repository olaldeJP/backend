import { cartsService } from "../services/carts.Service.js";
import { usersService } from "../services/users.Service.js";
import { productService } from "../services/products.Service.js";
import { NewError, ErrorType } from "../config/errors.Config.js";
import { ticketService } from "../services/ticket.Service.js";
export async function createNewCart(req, res, next) {
  try {
    if (!res.session.carts) {
      res["cart"] = await cartsService.createCart();
    }
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
export async function checkCartIsFromUser(req, res, next) {
  try {
    res["user"] = await usersService.validCartIsFromEmilUser(
      req.params.cid,
      res.session.email
    );
    next();
  } catch (error) {
    next(error);
  }
}
export async function addProductToArrayUser(req, res, next) {
  try {
    res["cart"] = await cartsService.addProductToCart(
      req.params.cid,
      req.product
    );
    next();
  } catch (error) {
    next(error);
  }
}
export async function findCart(req, res, next) {
  try {
    res["cart"] = await cartsService.findById(req.params.cid);
    next();
  } catch (error) {
    next(error);
  }
}
export async function showCarts(req, res, next) {
  try {
    res["cart"] = await usersService.showCartsUser(res.session._id);
    next();
  } catch (error) {
    next(error);
  }
}

export async function replaceCart(req, res, next) {
  try {
    res["cart"] = await cartsService.findCartAndReplace(
      req.params.cid,
      req.body.products
    );
    next();
  } catch (error) {
    next(error);
  }
}
export async function deleteProductFromCart(req, res, next) {
  try {
    res["cart"] = await cartsService.deleteOneProductFromCart(
      req.params.cid,
      req.params.pid
    );
    next();
  } catch (error) {
    next(error);
  }
}

export async function deleteAllProducts(req, res, next) {
  try {
    await cartsService.deleteAllProducts(req.params.cid);
    next();
  } catch (error) {
    next(error);
  }
}

export async function checkCartStock(req, res, next) {
  try {
    if (await productService.checkStock(res.cart)) {
      return next();
    }
    throw new NewError(ErrorType.ERROR_REQUEST, " Error - Stock Error ");
  } catch (error) {
    next(error);
  }
}
export async function subFromDataBase(req, res, next) {
  try {
    const total = await productService.endsPurchase(res.cart);
    res["total"] = total;
    return next();
  } catch (error) {
    next(error);
  }
}
export async function saveNewTicket(req, res, next) {
  try {
    res["ticket"] = await ticketService.createTicket(
      res.total,
      res.session.email
    );
    next();
  } catch (error) {
    next(error);
  }
}

export async function checkUserHasCart(req, res, next) {
  try {
    if (!res.session.carts) {
      return next();
    }
    throw new NewError(ErrorType.ERROR_REQUEST, "Has cart already");
  } catch (error) {
    next(error);
  }
}
