import { Router } from "express";
import { productsRouter } from "./products.Router.js";
import { usersRouter } from "./users.Router.js";
import { errorManager } from "../controllers/errorsManager.Controllers.js";
import { statusCode } from "../controllers/statusManager.Controllers.js";
import { sessionsRouter } from "./sessions.Router.js";
import { cartsRouter } from "./carts.Router.js";
export const apiRouter = new Router();

apiRouter.use(statusCode);
apiRouter.use("/products", productsRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use(errorManager);
