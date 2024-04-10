import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import mongoosePaginate from "mongoose-paginate-v2";

const productoSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    code: { type: Number, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    owner: { type: String, required: true, ref: "users.email" },
    stock: { type: Number, required: true, default: 0 },
    thumbnail: { type: [String], default: [] },
  },
  { collection: "products" },
  {
    strict: "throw",
    versionKey: false,
  }
);
productoSchema.plugin(mongoosePaginate);

export const productsModel = model("products", productoSchema);

class ProductsClassModel {
  #productDao;
  constructor(productModel) {
    this.#productDao = productModel;
  }
  async create(data) {
    const newProducto = await this.#productDao.create(data);
    return await this._toPojo(newProducto);
  }

  async readOne(query) {
    const product = await this.#productDao.findById(query).lean();
    return product;
  }
  async readMany() {
    const array = await this.#productDao.find().lean();
    return array;
  }
  async readPaginate(criterioBusqueda, opcionesDePaginacion) {
    const productsPaginate = await await this.#productDao.paginate(
      criterioBusqueda,
      opcionesDePaginacion
    );
    return productsPaginate;
  }
  async readMany() {
    const array = await this.#productDao.find().lean();
    return array;
  }
  async updateOne(query, data) {
    const productUpdate = await this.#productDao
      .findByIdAndUpdate(
        query,
        { $set: data },
        {
          new: true,
        }
      )
      .lean();
    return productUpdate;
  }

  async deleteOne(query) {
    const productDelete = await this.#productDao
      .findByIdAndDelete(query)
      .lean();
    return productDelete;
  }

  async _toPojo(data) {
    const product = {
      id: data.id,
      title: data.title,
      code: data.code,
      description: data.description,
      price: data.price,
      owner: data.owner,
      stock: data.stock,
      thumbnail: data.thumbnail,
    };
    return product;
  }
}

export const productsClassDao = new ProductsClassModel(productsModel);
