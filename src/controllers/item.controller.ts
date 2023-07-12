import { RequestHandler } from "express";

import Item from "../models/item.model";

export const getItems: RequestHandler = async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.status(200).json({ items: items });
  } catch (err: any) {
    res.status(500).json({
      message: "Error getting the items",
      error: err.message,
    });
  }
};

export const addItem: RequestHandler = async (req, res, next) => {
  const { name, price, stock, supplierId } = req.body;
  try {
    const newItem = await Item.create({
      name,
      price,
      stock,
      supplierId,
    });
    res.status(201).json({ message: "Added Item", item: newItem });
  } catch (err) {
    res.status(500).json({ message: "Error creating a new item" });
  }
};

export const updateItem: RequestHandler = async (req, res, next) => {
  const itemId = parseInt(req.params.id);
  const { name, price, stock, supplierId } = req.body;

  try {
    const item = await Item.findByPk(itemId);
    if (item) {
      await item.update({
        name,
        price,
        stock,
        supplierId,
      });
      res.json({ message: "Updated Item", item: item });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error updating the item", error: err.message });
  }
};

export const deleteItem: RequestHandler = async (req, res, next) => {
  const itemId = parseInt(req.params.id);

  try {
    const item = await Item.findByPk(itemId);
    if (item) {
      await item.destroy();
      res.json({ message: "Item successfully removed" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error deleting item", error: err.message });
  }
};

export const getItem: RequestHandler = async (req, res, next) => {
  const itemId = parseInt(req.params.id);

  try {
    const item = await Item.findByPk(itemId);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error retrieving the item", error: err.message });
  }
};
