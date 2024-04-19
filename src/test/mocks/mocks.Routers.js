import { Router } from "express";
import {
  updateMocksProducts,
  showMocksProducts,
} from "../mocks/mocks.Middlewares";
export const mockRouter = new Router();

mockRouter.get("/mockingproducts", updateMocksProducts, showMocksProducts);
