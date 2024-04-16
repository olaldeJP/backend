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
  async findUserById(query) {
    const user = await this.#usersDao.findUserId(query);
    if (!user) {
      throw new NewError(ErrorType.INVALID_DATA, "INVALID DATA");
    }
    return user;
  }
  async getAllUsers() {
    const users = await this.#usersDao.findUsers();
    if (!users) {
      throw new NewError(ErrorType.ERROR_REQUEST, "ERROR REQUEST");
    }
    const array = users.map((user) => {
      return {
        first_name: user.first_name,
        email: user.email,
        role: user.role,
        last_connection: user.last_connection,
      };
    });
    return array;
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
  async validToChangeToPremium(uid) {
    const user = await this.#usersDao.findUserId(uid);
    let identification = false;
    let adress = false;
    let state = false;

    for (let index = 0; index < user.documents.length; index++) {
      const element = user.documents[index];
      if (element.name === "identification.pdf") {
        identification = true;
      }
      if (element.name === "adress.pdf") {
        adress = true;
      }
      if (element.name === "state.pdf") {
        state = true;
      }
    }
    if (identification && adress && state) {
      return true;
    } else {
      return false;
    }
  }

  async checkDocumentsArray(path, documents) {
    for (let index = 0; index < documents.length; index++) {
      if (documents[index].path === path) {
        return true;
      }
    }
    return false;
  }
  async updateArrayDocumentsUser(user) {
    return await this.#usersDao.updateDocuments(user.email, user.documents);
  }
  async changeRolUser(id) {
    const user = await this.#usersDao.changeRol(id);
    return user;
  }
  async deleteCart(id) {
    const user = await this.#usersDao.deleteOneCart(id);
    return user;
  }
  async getUsersInactives(users) {
    const array = await users.filter((user) => {
      if (!(user.role === "admin")) {
        const currentDate = new Date();
        const dif = currentDate - new Date(user.last_connection);
        const difMints = Math.abs(dif) / (1000 * 60);
        return difMints > 120;
      }
    });
    return array;
  }
  async deleteUsers(array) {
    await array.forEach((element) => {
      this.#usersDao.deleteUser(element);
    });
  }
}

export const usersService = new UsersService(userClassDao);
