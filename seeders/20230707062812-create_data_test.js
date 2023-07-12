"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "items",
      [
        {
          name: "Item 1",
          price: 10,
          stock: 100,
          supplierId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Item 2",
          price: 15,
          stock: 200,
          supplierId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Item 3",
          price: 20,
          stock: 300,
          supplierId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "orders",
      [
        {
          customerId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customerId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          customerId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "sale_order_items",
      [
        {
          quantity: 100,
          orderId: 1,
          itemId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quantity: 200,
          orderId: 2,
          itemId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          quantity: 300,
          orderId: 3,
          itemId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("sale_order_items", null, {});
    await queryInterface.bulkDelete("items", null, {});
    await queryInterface.bulkDelete("orders", null, {});
  },
};
