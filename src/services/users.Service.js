import { userClassDao } from "../DAO/models/users.Model.js";
import { NewError, ErrorType } from "../config/errors.Config.js";
import { hashPassword } from "../utils/crypt.js";
class UsersService {
  //@type {userClassDao}
  #usersDao;
  constructor(usersDaoClass) {
    this.#usersDao = usersDaoClass;
  }
  async register(query) {
    const newUser = await this.#usersDao.create(query);
    if (!newUser) {
      throw new NewError(ErrorType.ERROR_REQUEST, "Error Register User");
    }
    return newUser;
  }
  async updateTimeUser(userEmail) {
    await this.#usersDao.updateDate(userEmail);
  }
  async updatePassword(userId, password) {
    const passwordHash = await hashPassword(password);
    const userChange = await this.#usersDao.updatePassword(
      userId,
      passwordHash
    );
    if (!userChange) {
      throw new NewError(ErrorType.ERROR_REQUEST, "Error changing password");
    }
    return userChange;
  }
  async findUserByEmail(query) {
    const user = await this.#usersDao.findByEmail(query);
    if (!user) {
      throw new NewError(ErrorType.INVALID_DATA, "INVALID DATA");
    }
    return user;
  }
  async loginUser(query) {
    const user = await this.#usersDao.readOne(query);
    if (!user) {
      throw new NewError(ErrorType.INVALID_DATA, "INVALID DATA");
    }
    return user;
  }
  async showCartsUser(_idUser) {
    const arrayUser = await this.#usersDao.findArrayCarts(_idUser);
    return arrayUser;
  }
  async addCartToUser(emailUser, _idCart) {
    const user = await this.#usersDao.updateCarts(emailUser, _idCart);
  }
  async validCartIsFromEmilUser(_idCart, userEmail) {
    const user = await this.#usersDao.findUserByCartId(_idCart, userEmail);
    if (!user) {
      throw new NewError(ErrorType.FORBIDDEN_USER, "THIS CART IS NOT YOURS");
    }
    return user;
  }
  async findCartById(_id) {
    const carts = await this.#usersDao.findCartById(_id);
    if (!carts) {
      throw new NewError(
        ErrorType.INVALID_DATA,
        "INVALID DATA - Cart not found"
      );
    }
    return carts;
  }
}

export const usersService = new UsersService(userClassDao);
