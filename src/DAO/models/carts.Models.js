import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import mongoosePaginate from "mongoose-paginate-v2";
import { NewError, ErrorType } from "../../config/errors.Config.js";

const CartSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    products: {
      type: [
        {
          _id: { type: String, ref: "products" },
          quantity: { type: Number, min: 1, default: 1 },
        },
      ],
      default: [],
    },
  },
  { collection: "carts" },
  {
    strict: "throw",
    versionKey: false,
  }
);
CartSchema.plugin(mongoosePaginate);
const cartsModel = model("carts", CartSchema);

class CartsClassDao {
  #cartsDao;
  constructor(cartModel) {
    this.#cartsDao = cartModel;
  }
  async create() {
    const newCart = await this.#cartsDao.create({});
    return await this._toPojo(newCart);
  }
  async readOne(query) {
    const cart = await this.#cartsDao.findById(query).lean();
    return this._toPojo(cart);
  }
  async readMany() {
    const array = await this.#cartsDao.find();
    return await this._toPojo(array);
  }
  async updateOne(_idC, cart) {
    const cartUpdate = await this.#cartsDao.findOneAndUpdate(
      { _id: _idC },
      { $set: cart },
      { new: true }
    );
    return await this._toPojo(cartUpdate);
  }
  async addProductCart(_idC, _idP) {
    const cart = await this.readOne(_idC);
    if (!cart) {
      throw new NewError(
        ErrorType.NOT_FOUND,
        "INVALID DATA - Id cart not found"
      );
    }
    const productFind = cart.products.find((p) => {
      return p._id == _idP;
    });
    if (!productFind) {
      cart.products.push({ _id: _idP, quantity: 1 });
    } else {
      productFind.quantity++;
    }
    const updateCart = await this.updateOne(_idC, cart);

    return await this._toPojo(updateCart);
  }
  async findAndReplaceCart(cid, arrayProducts) {
    const array = await this.#cartsDao.findOneAndReplace(
      { _id: cid },
      { products: arrayProducts },
      { new: true }
    );
    return this._toPojo(array);
  }
  async deleteOne(cid, pid) {
    let cart = await this.readOne(cid);
    if (!cart) {
      throw new NewError(
        ErrorType.NOT_FOUND,
        "INVALID DATA - Id cart not found"
      );
    }
    const productFind = await cart.products.find((p) => {
      return p._id == pid;
    });
    if (!productFind) {
      throw new NewError(
        ErrorType.INVALID_DATA,
        "INVALID DATA - Product not found at this Cart"
      );
    } else {
      productFind.quantity--;
      if (productFind.quantity == 0) {
        cart.products = await cart.products.filter(
          (element) => element._id !== pid
        );
      }
    }
    const updateCart = await this.findAndReplaceCart(cid, cart.products);
    return this._toPojo(updateCart);
  }
  async deleteAll(cid) {
    const newCart = await this.#cartsDao.findOneAndReplace(
      { _id: cid },
      { products: [] },
      { new: true }
    );
    if (!newCart) {
      throw new NewError(
        ErrorType.INVALID_DATA,
        "INVALID DATA - Id cart not found"
      );
    }
    return await this._toPojo(newCart);
  }
  async _toPojo(cart) {
    return {
      _id: cart._id,
      products: cart.products,
    };
  }
}

export const cartsClassDao = new CartsClassDao(cartsModel);
