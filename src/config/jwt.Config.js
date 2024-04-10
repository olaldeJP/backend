import { ErrorType, NewError } from "../config/errors.Config.js";
import { JWT_SECRET } from "./config.js";
import jwt from "jsonwebtoken";

export function crypt(data) {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject(new Error("Invalid data for encryption"));
    }
    jwt.sign(data, JWT_SECRET, { expiresIn: "6h" }, (err, encoded) => {
      //encoded:datos encriptados
      if (err) {
        reject(err);
      } else {
        resolve(encoded);
      }
    });
  });
}

export function decrypt(token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new NewError(ErrorType.UNAUTHORIZED_USER, " UNAUTHORIZED USER"));
    }
    jwt.verify(token, JWT_SECRET, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export function cryptOneHour(data) {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject(new Error("Invalid data for encryption"));
    }
    jwt.sign(data, JWT_SECRET, { expiresIn: "1h" }, (err, encoded) => {
      //encoded:datos encriptados
      if (err) {
        reject(err);
      } else {
        resolve(encoded);
      }
    });
  });
}
