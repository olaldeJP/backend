import { productsClassDao } from "../DAO/models/products.Models.js";
import { NewError, ErrorType } from "../config/errors.Config.js";
class ProductService {
  #productDao;
  constructor(productsModelClass) {
    this.#productDao = productsModelClass;
  }
  async createProduct(data) {
    const newProduct = await this.#productDao.create(data);
    if (!newProduct) {
      throw new NewError(ErrorType.ERROR_REQUEST, "Error to create product");
    }
    return newProduct;
  }
  async findById(_id) {
    const product = await this.#productDao.readOne(_id);
    if (!product) {
      throw new NewError(ErrorType.NOT_FOUND, "ID PRODUCT NOT FOUND");
    }
    return product;
  }
  async readManyProducts() {
    const array = await this.#productDao.readMany();
    if (!array) {
      throw new NewError(ErrorType.NOT_FOUND, "Error to show products");
    }
    return array;
  }
  async updateProduct(id, data) {
    const productoUpdate = await this.#productDao.updateOne(id, data);
    if (!productoUpdate) {
      throw new NewError(ErrorType.NOT_FOUND, "ID PRODUCT NOT FOUND");
    }
    return productoUpdate;
  }

  async deleteProductoID(_id) {
    const productDelete = await this.#productDao.deleteOne(_id);
    if (!productDelete) {
      throw new NewError(ErrorType.NOT_FOUND, "ID PRODUCT NOT FOUND");
    }
    return productDelete;
  }
  async checkStock(cart) {
    for (let index = 0; index < cart.products.length; index++) {
      let element = cart.products[index];
      let product = await this.#productDao.readOne(element._id);
      if (!(product.stock >= element.quantity)) {
        return false;
      }
    }
    return true;
  }
  async endsPurchase(cart) {
    let total = 0;
    for (let index = 0; index < cart.products.length; index++) {
      let element = cart.products[index];
      let product = await this.#productDao.readOne(element._id);
      total = total + element.quantity * product.price;
      product.stock = product.stock - element.quantity;
      await this.#productDao.updateOne(product._id, {
        stock: product.stock,
      });
    }
    return total;
  }
  async showPaginateProducts(data) {
    const opcionesDePaginacion = {
      limit: data.query.limit || 10,
      page: data.query.page || 1,
      lean: true,
    };
    const criterioBusqueda = {};
    if (data.query.sort) {
      opcionesDePaginacion.sort = {
        price: data.query.sort === "desc" ? -1 : 1,
      };
    }
    if (data.query.query) {
    }
    const productos = await this.#productDao.readPaginate(
      //se agrega la paginacion con un criterio de busqueda  y opciones de paginacion
      criterioBusqueda,
      opcionesDePaginacion
    );

    return {
      status: "success",
      payload: productos.docs, // productos enviados como arreglo
      totalPages: productos.totalPages, //total paginas
      prevPage: productos.prevPage, // link a la pagina siguiente
      nextPage: productos.nextPage, // link a la pagina anterior
      page: productos.page, //pagina actual
      hasPrevPage: productos.hasPrevPage, //si existe pagina anterior
      hasNextPage: productos.hasNextPage, //si existe pagina siguiente
      hayDocs: productos.docs > 0, //si docs es mayor a 0 los envia
      prevLink: productos.prevLink,
      user: data.user, //envia el usser conectado con fist_name , last_name , y isAdmin
    };
  }
}
export const productService = new ProductService(productsClassDao);
