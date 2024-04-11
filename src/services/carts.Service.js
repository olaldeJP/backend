import { cartsClassDao } from "../DAO/models/carts.Models.js";
import { NewError, ErrorType } from "../config/errors.Config.js";
import { productService } from "./products.service.js";

class CartsService {
  #cartsDao;
  constructor(cartsClassDao) {
    this.#cartsDao = cartsClassDao;
  }
  async findById(_id) {
    const carts = await this.#cartsDao.readOne(_id);
    if (!carts) {
      throw new NewError(
        ErrorType.INVALID_DATA,
        "INVALID DATA - Id cart not found"
      );
    }
    return carts;
  }
  async readManyCarts() {
    const array = await this.#cartsDao.readMany();
    return array;
  }
  async createCart() {
    const cartCreado = await this.#cartsDao.create();
    if (!cartCreado) {
      throw new NewError(ErrorType.ERROR_REQUEST, "CREATE CART ERROR");
    }
    return cartCreado;
  }
  async actualizarcarts(id, carts) {
    const cartsoUpdate = await this.#cartsDao.updateOne(id, carts);
    if (!cartsoUpdate) {
      throw new NewError(ErrorType.ERROR_REQUEST, "UPDATE CART ERROR");
    }
    return cartsoUpdate;
  }
  async deleteAllProducts(_id) {
    const cartDeleted = await this.#cartsDao.deleteAll(_id);
    return cartDeleted;
  }
  async addProductToCart(_idC, product) {
    const productoSumado = await this.#cartsDao.addProductCart(
      _idC,
      product._id
    );
    if (!productoSumado) {
      throw new NewError(ErrorType.ERROR_REQUEST, "Add product ERROR");
    }
    return productoSumado;
  }
  async findCartAndReplace(_idC, arrayProducts) {
    const array = await this.#cartsDao.findAndReplaceCart(_idC, arrayProducts);
    if (!array) {
      throw new NewError(ErrorType.ERROR_REQUEST, "Replace Cart ERROR");
    }
    return array;
  }
  async deleteOneProductFromCart(_idC, _idP) {
    const cart = await this.#cartsDao.deleteOne(_idC, _idP);
    if (!cart) {
      throw new NewError(ErrorType.ERROR_REQUEST, "Delete Cart ERROR");
    }
    return cart;
  }
}

export const cartsService = new CartsService(cartsClassDao);
