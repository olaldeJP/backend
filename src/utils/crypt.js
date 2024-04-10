import { ErrorType, NewError } from "../config/errors.Config.js";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    try {
      const passwordhash = hashSync(password, genSaltSync(10));
      resolve(passwordhash);
    } catch (error) {
      reject(error);
    }
  });
}

export async function compareHash(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    try {
      const result = compareSync(password, hashedPassword);
      resolve(result);
    } catch (error) {
      reject(new NewError(ErrorType.INVALID_DATA, "Invalid Data"));
    }
  });
}
