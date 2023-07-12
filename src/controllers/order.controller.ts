import { RequestHandler } from "express";

import Order from "../models/order.model";

export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ orders });
  } catch (err: any) {
    res.status(500).json({
      message: "Error getting the orders",
      error: err.message,
    });
  }
};

export const addOrder: RequestHandler = async (req, res, next) => {
  const { customerId } = req.body;
  try {
    const newOrder = await Order.create({
      customerId,
    });
    res.status(201).json({ message: "Added Order", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Error creating a new order" });
  }
};

export const updateOrder: RequestHandler = async (req, res, next) => {
  const orderId = parseInt(req.params.id);
  const { customerId } = req.body;

  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      await order.update({
        customerId,
      });
      res.json({ message: "Updated Order", order: order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error updating the order", error: err.message });
  }
};

export const deleteOrder: RequestHandler = async (req, res, next) => {
  const orderId = parseInt(req.params.id);

  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      await order.destroy();
      res.json({ message: "Order successfully removed" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error deleting order", error: err.message });
  }
};
