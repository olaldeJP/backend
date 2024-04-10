import "dotenv/config";

export const PORT = process.env.PORT || 8080;
export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
export const GITHUB_URL_CALLBACK = process.env.GITHUB_URL_CALLBACK;
export const URL_MONGO =
  process.env.URL_MONGO || "mongodb://localhost:27017/EcommersModel";

export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
export const emailAdmin = process.env.emailAdmin;
export const PORT_EMAIL = 587;
export const COOKIE_KEY = process.env.COOKIE_KEY;
