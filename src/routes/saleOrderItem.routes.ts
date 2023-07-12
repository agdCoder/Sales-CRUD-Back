import { Router } from "express";
import Joi from "joi";
import validate from "../middlewares/requestValidator";

import * as saleOrderItemController from "../controllers/saleOrderItem.controller";

const createSaleSchema = Joi.object({
  quantity: Joi.number().integer().positive().required(),
  orderId: Joi.number().integer().positive().required(),
  itemId: Joi.number().integer().positive().required(),
});

const updateSaleSchema = Joi.object({
  quantity: Joi.number().integer().positive(),
  orderId: Joi.number().integer().positive(),
  itemId: Joi.number().integer().positive(),
});

const router = Router();

router.get("/sale", saleOrderItemController.getSaleOrderItems);

router.post(
  "/sale",
  validate(createSaleSchema),
  saleOrderItemController.addSaleOrderItem
);

router.put(
  "/sale/:id",
  validate(updateSaleSchema),
  saleOrderItemController.updateSaleOrderItem
);

router.delete("/sale/:id", saleOrderItemController.deleteSaleOrderItem);

export default router;
