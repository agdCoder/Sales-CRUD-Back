import { Router } from "express";
import Joi from "joi";
import validate from "../middlewares/requestValidator";

import * as itemController from "../controllers/item.controller";

const createItemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  stock: Joi.number().integer().positive().required(),
  supplierId: Joi.number().integer().positive().required(),
});

const updateItemSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().positive(),
  stock: Joi.number().integer().positive(),
  supplierId: Joi.number().integer().positive(),
});

const router = Router();

router.get("/item", itemController.getItems);

router.post("/item", validate(createItemSchema), itemController.addItem);

router.put("/item/:id", validate(updateItemSchema), itemController.updateItem);

router.delete("/item/:id", itemController.deleteItem);

export default router;
