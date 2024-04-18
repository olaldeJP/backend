import { Router } from "express";
import passport from "passport";
import {
  realTimeProductsWeb,
  loginView,
  verPerfil,
  mostrarProductosCarrito,
  ventanaRegister,
  restartPassword,
  productView,
  viewUpdateProduct,
  homeWeb,
} from "../../controllers/web.Constrollers.js";
import {
  getCookieTokenWeb,
  saveCookieToken,
} from "../../middlewares/cookie.Middleware.js";

export const webRouter = new Router();
webRouter.use(getCookieTokenWeb);
webRouter.get("/home", homeWeb);

//Renderiza la pagina de RealTimeHandlebars
webRouter.get("/realTimeProducts", realTimeProductsWeb);

//Renreriza la ventana de chatHandlebars
webRouter.get("/productView/:id", productView);

//Muestra ventana de registro.handlebars
webRouter.get("/register", ventanaRegister);

webRouter.get("/githublogin", passport.authenticate("loginGithub"));

webRouter.get(
  "/githubcallback",
  passport.authenticate("loginGithub", { failWithError: true }),
  saveCookieToken,
  homeWeb
);

webRouter.get("/", loginView);

//////Muestra ventana de Login.handlebars
webRouter.get("/perfil", verPerfil);

webRouter.get("/restartpassword", restartPassword);

// visualizar solo un carrito especifico
webRouter.get("/carts/:cid", mostrarProductosCarrito);
webRouter.get("/updateProduct/:id", viewUpdateProduct);
