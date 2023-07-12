import request from "supertest";
import path from "path";
import util from "util";
import { exec as execAsync } from "child_process";

import app from "../app";

const exec = util.promisify(execAsync);
const rootPath = path.resolve(__dirname, "..", "..");

describe("Sale Order Items Controller", () => {
  beforeAll(async () => {
    try {
      const { stdout, stderr } = await exec("npx sequelize-cli db:migrate", {
        cwd: rootPath,
      });
    } catch (e) {
      console.error(e);
    }
    try {
      const { stdout, stderr } = await exec("npx sequelize-cli db:seed:all", {
        cwd: rootPath,
      });
    } catch (e) {
      console.error(e);
    }
  });

  it("should get all sale order items", async () => {
    const response = await request(app).get("/sale");

    expect(response.status).toBe(200);
    expect(response.body.saleOrderItems).toBeDefined();
  });

  it("should create a new sale order item", async () => {
    const newSaleOrderItem = {
      quantity: 2,
      orderId: 1,
      itemId: 1,
    };

    const response = await request(app).post("/sale").send(newSaleOrderItem);

    expect(response.status).toBe(201);
    expect(response.body.saleOrderItem).toHaveProperty("id");
  });

  it("should update an existing sale order item", async () => {
    const updatedSaleOrderItem = {
      quantity: 3,
      orderId: 1,
      itemId: 1,
    };

    const response = await request(app)
      .put("/sale/1")
      .send(updatedSaleOrderItem);

    expect(response.status).toBe(200);
    expect(response.body.saleOrderItem.quantity).toBe(3);
  });

  it("should delete an existing sale order item", async () => {
    const response = await request(app).delete("/sale/1");

    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    try {
      const { stdout, stderr } = await exec(
        "npx sequelize-cli db:migrate:undo:all",
        {
          cwd: rootPath,
        }
      );
    } catch (e) {
      console.error(e);
    }
  });
});
