import { Router } from "express";
import { productsRouter } from "./products.Router.js";
import { usersRouter } from "./users.Router.js";
import { statusCode } from "../../controllers/statusManager.Controllers.js";
import { sessionsRouter } from "./sessions.Router.js";
import { cartsRouter } from "./carts.Router.js";
import { ticketRouter } from "./ticket.Router.js";
export const apiRouter = new Router();

apiRouter.use(statusCode);
apiRouter.use("/products", productsRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/ticket", ticketRouter);
