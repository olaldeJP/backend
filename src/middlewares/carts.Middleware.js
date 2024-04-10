import { cartsService } from "../services/carts.Service.js";
import { usersService } from "../services/users.Service.js";
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
