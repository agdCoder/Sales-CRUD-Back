import { Router } from "express";
import Joi from "joi";
import validate from "../middlewares/requestValidator";

import * as orderController from "../controllers/order.controller";

const createOrderSchema = Joi.object({
  customerId: Joi.number().integer().positive().required(),
});

const updateOrderSchema = Joi.object({
  customerId: Joi.number().integer().positive(),
});

const router = Router();

router.get("/order", orderController.getOrders);

router.post("/order", validate(createOrderSchema), orderController.addOrder);

router.put(
  "/order/:id",
  validate(updateOrderSchema),
  orderController.updateOrder
);

router.delete("/order/:id", orderController.deleteOrder);

export default router;
