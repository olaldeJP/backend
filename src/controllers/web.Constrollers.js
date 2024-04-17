// import { managerProducts } from "../../dao/models/fs/productManager.js";

export async function realTimeProductsWeb(req, res) {
  return res.status(200).render("realTimeProducts.handlebars", {
    titulo: " realTimeProductsWeb",
    user: req.user,
  });
}
//Muestra la pagina principal con los productos paginados
export async function homeWeb(req, res) {
  try {
    return res.status(200).render("home.handlebars", { user: res.session });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function productView(req, res) {
  try {
    res.status(200).render("product.handlebars", { user: res.session });
  } catch (error) {
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}
export async function mostrarProductosCarrito(req, res) {
  try {
    res.status(200).render("carrito.handlebars");
  } catch (error) {
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}

export async function ventanaRegister(req, res) {
  try {
    res.status(200).render("register.handlebars", { status: "success" });
  } catch (error) {
    res.status(400).render("register.handlebars", { status: "error" });
  }
}

export async function loginView(req, res) {
  res.status(200).render("login.handlebars", { statuss: "sucess" });
}

export async function verPerfil(req, res) {
  if (res.session) {
    res.status(201).render("perfil.handlebars", {
      status: "success",
      user: res.session,
    });
  } else {
    res.status(201).render("perfil.handlebars", {
      status: "error",
    });
  }
}

export async function restartPassword(req, res) {
  res.render("restartPassword.handlebars");
}

export async function viewUpdateProduct(req, res) {
  res.render("updateProduct.handlebars", {
    status: "success",
    user: res.session,
  });
}
