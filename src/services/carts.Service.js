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
      throw new NewError(ErrorType.NOT_FOUND, "ID CART NOT FOUND");
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
  async borrarcartsPorID(_id) {
    const cartsBorrado = await this.#cartsDao.deleteMany(_id);
    if (!cartsBorrado) {
      throw new NewError(ErrorType.NOT_FOUND, "ID CART ERROR");
    }
    return cartsBorrado;
  }
  async agregarProductoAlCart(_idC, product) {
    const productoSumado = await this.#cartsDao.addProductCart(
      _idC,
      product._id
    );
    return productoSumado;
  }

  async borrarProductoAlCart(_idC, _idP) {
    const cart = await this.#cartsDao.deleteOne(_idC, _idP);
    return cart;
  }
  async validarStock(cart) {
    for (let index = 0; index < cart.products.length; index++) {
      let element = cart.products[index];
      let product = await productService.buscarPorID(element._id);
      if (!(product.stock > element.quantity)) {
        return false;
      }
    }
    return true;
  }
  async sumarYSacarProductos(cart) {
    let total = 0;
    for (let index = 0; index < cart.products.length; index++) {
      let element = cart.products[index];
      let product = await productService.buscarPorID(element._id);
      total = total + element.quantity * product.price;
      product.stock = product.stock - element.quantity;
      await productService.actualizarProducto(product._id, {
        stock: product.stock,
      });
    }
    return total;
  }
}

export const cartsService = new CartsService(cartsClassDao);
