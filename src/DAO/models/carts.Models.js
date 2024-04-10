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
  async create(data) {
    const newCart = await this.#cartsDao.create({});
    return { _id: newCart._id, products: newCart.products };
  }
  async readOne(query) {
    const cart = await this.#cartsDao.findById(query).lean();
    return cart;
  }
  async readMany() {
    const array = await this.#cartsDao.find().lean();
    return array;
  }
  async updateOne(_idC, cart) {
    const cartUpdate = this.#cartsDao.findOneAndUpdate(
      { _id: _idC },
      { $set: cart },
      { new: true }
    );
    return cartUpdate;
  }
  async updateMany(query, data) {}

  async addProductCart(_idC, _idP) {
    const cart = await this.readOne(_idC);
    if (!cart) {
      throw new NewError(ErrorType.NOT_FOUND, "ID CART NOT FOUND");
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

    return updateCart;
  }
  async deleteOne(cid, pid) {
    const cart = await cartsMongoose
      .findByIdAndUpdate(
        cid,
        { $pull: { products: { _id: pid } } },
        { new: true }
      )
      .lean();
    return cart;
  }

  async deleteMany() {
    const newCart = await this.#cartsDao.findOneAndReplace(
      { _id: cid },
      { products: [] },
      { new: true }
    ).lean;
    return newCart;
  }
}

export const cartsClassDao = new CartsClassDao(cartsModel);
