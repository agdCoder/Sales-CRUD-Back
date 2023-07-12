import { RequestHandler } from "express";

import SaleOrderItem from "../models/saleOrderItem.model";
import Order from "../models/order.model";
import Item from "../models/item.model";

export const getSaleOrderItems: RequestHandler = async (req, res, next) => {
  try {
    const saleOrderItems = await SaleOrderItem.findAll({
      include: [Order, Item],
    });
    res.status(200).json({ saleOrderItems });
  } catch (err: any) {
    res.status(500).json({
      message: "Error getting the saleOrderItems",
      error: err.message,
    });
  }
};

export const addSaleOrderItem: RequestHandler = async (req, res, next) => {
  const { quantity, orderId, itemId } = req.body;
  try {
    const order = await Order.findByPk(orderId);
    const item = await Item.findByPk(itemId);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    const newSaleOrderItem = await SaleOrderItem.create({
      quantity,
      orderId,
      itemId,
    });
    res.status(201).json({
      message: "Added SaleOrderItem",
      saleOrderItem: newSaleOrderItem,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating a new SaleOrderItem" });
  }
};

export const updateSaleOrderItem: RequestHandler = async (req, res, next) => {
  const saleOrderItemId = parseInt(req.params.id);
  const { quantity, orderId, itemId } = req.body;

  try {
    const saleOrderItem = await SaleOrderItem.findByPk(saleOrderItemId);
    if (saleOrderItem) {
      const order = await Order.findByPk(orderId);
      const item = await Item.findByPk(itemId);

      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      if (!item) {
        res.status(404).json({ message: "Item not found" });
        return;
      }

      await saleOrderItem.update({
        quantity,
        orderId,
        itemId,
      });
      res.json({
        message: "Updated SaleOrderItem",
        saleOrderItem: saleOrderItem,
      });
    } else {
      res.status(404).json({ message: "SaleOrderItem not found" });
    }
  } catch (err: any) {
    res.status(500).json({
      message: "Error updating the saleOrderItem",
      error: err.message,
    });
  }
};

export const deleteSaleOrderItem: RequestHandler = async (req, res, next) => {
  const saleOrderItemId = parseInt(req.params.id);

  try {
    const saleOrderItem = await SaleOrderItem.findByPk(saleOrderItemId);
    if (saleOrderItem) {
      await saleOrderItem.destroy();
      res.json({ message: "SaleOrderItem successfully removed" });
    } else {
      res.status(404).json({ message: "SaleOrderItem not found" });
    }
  } catch (err: any) {
    res.status(500).json({
      message: "Error deleting saleOrderItem",
      error: err.message,
    });
  }
};
