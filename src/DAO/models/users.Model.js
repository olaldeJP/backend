import { Schema, model } from "mongoose";
import { compareHash, hashPassword } from "../../utils/crypt.js";
import { v4 as uuidv4 } from "uuid";
import { ErrorType, NewError } from "../../config/errors.Config.js";
const UsersSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String },
    age: { type: Number },
    password: {
      type: String,
      required: true,
      default: "(NotNecesaryInThisCase)",
    },
    carts: { type: [], ref: "carts._id", default: [] },
    documents: { type: [Object] },
    last_connection: { type: String },
    role: { type: String, enum: ["admin", "user", "premium"], default: "user" },
  },
  {
    strict: "throw",
    versionKey: false,
  }
);

const usersModel = model("users", UsersSchema);

class UsersClassModel {
  //@type {userModel}
  #usersDao;
  constructor(userModel) {
    this.#usersDao = userModel;
  }
  async create(data) {
    data.password = await hashPassword(data.password);
    const newUser = await this.#usersDao.create(data);
    return await this._toPojo(newUser);
  }
  async findByEmail(query) {
    const user = await this.#usersDao.findOne({ email: query }).lean();
    if (user) {
      return await this._toPojo(user);
    }
    return null;
  }
  async findUserId(query) {
    const user = await this.#usersDao.findById(query).lean();
    if (user) {
      return await this._toPojo(user);
    }
    return null;
  }

  async readOne(query) {
    try {
      const user = await this.#usersDao.findOne({ email: query.email }).lean();
      if (await compareHash(query.password, user.password)) {
        return await this._toPojo(user);
      }
    } catch (error) {
      return null;
    }
  }

  async updateCarts(emailUser, _idCart) {
    const user = await this.#usersDao
      .findOneAndUpdate(
        { email: emailUser },
        { $push: { carts: { _id: _idCart } } },
        { new: true }
      )
      .lean();
    return this._toPojo(user);
  }

  async findArrayCarts(_idUser) {
    const array = await this.findUserId(_idUser);
    return array.carts;
  }
  async updateDate(emailUser) {
    const currentDate =
      new Date().toLocaleDateString() + "-" + new Date().toLocaleTimeString();
    const update = await this.#usersDao
      .findOneAndUpdate(
        { email: emailUser },
        { $set: { last_connection: currentDate } },
        { new: true }
      )
      .lean();
    return this._toPojo(update);
  }
  async updatePassword(idUser, newPassword) {
    const updateUser = await this.#usersDao
      .findByIdAndUpdate(
        idUser,
        { $set: { password: newPassword } },
        { new: true }
      )
      .lean();
    return await this._toPojo(updateUser);
  }
  async deleteOne(query) {
    throw new Error("NOT IMPLEMENTED");
  }

  async findUserByCartId(_idCart, userEmail) {
    const user = await this.#usersDao
      .findOne({ email: userEmail, carts: { _id: _idCart } })
      .lean();
    if (!user) {
      throw new NewError(
        ErrorType.INVALID_DATA,
        "INVALID DATA - Cart Not Found"
      );
    }
    return this._toPojo(user);
  }

  async changeRol(id) {
    const user = await this.findUserId(id);
    if (user) {
      if (user.role === "user") {
        await this.#usersDao
          .findOneAndUpdate(
            { _id: id },
            { $set: { role: "premium" } },
            { new: true }
          )
          .lean();
      } else {
        if (user.role === "premium") {
          await this.#usersDao
            .findOneAndUpdate(
              { _id: id },
              { $set: { role: "user" } },
              { new: true }
            )
            .lean();
        }
      }
      return await this._toPojo(user);
    }
    throw new NewError(ErrorType.UNAUTHORIZED_USER, "USER NOT FOUND");
  }
  async updateDocuments(emailUser, documentsUser) {
    const updateUser = await this.#usersDao
      .updateOne(
        { email: emailUser },
        { $set: { documents: documentsUser } },
        { new: true }
      )
      .lean();
    return await this._toPojo(updateUser);
  }

  async _toPojo(query) {
    const datosUsuario = {
      _id: query["_id"],
      email: query["email"],
      first_name: query["first_name"],
      last_name: query["last_name"],
      age: query["age"],
      carts: query["carts"],
      role: query["role"],
      documents: query["documents"],
      last_connection: query["last_connection"],
    };
    return datosUsuario;
  }
}

export const userClassDao = new UsersClassModel(usersModel);
