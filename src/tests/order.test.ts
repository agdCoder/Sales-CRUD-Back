import request from "supertest";
import path from "path";
import util from "util";
import { exec as execAsync } from "child_process";

import app from "../app";

const exec = util.promisify(execAsync);
const rootPath = path.resolve(__dirname, "..", "..");

describe("Order Controller", () => {
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

  it("should get all orders", async () => {
    const response = await request(app).get("/order");

    expect(response.status).toBe(200);
    expect(response.body.orders).toBeDefined();
  });

  it("should create a new order", async () => {
    const newOrder = {
      customerId: 1,
    };

    const response = await request(app).post("/order").send(newOrder);

    expect(response.status).toBe(201);
    expect(response.body.order).toHaveProperty("id");
  });

  it("should update an existing order", async () => {
    const updatedOrder = {
      customerId: 2,
    };

    const response = await request(app).put("/order/1").send(updatedOrder);

    expect(response.status).toBe(200);
    expect(response.body.order.customerId).toBe(2);
  });

  it("should delete an existing order", async () => {
    const response = await request(app).delete("/order/1");

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
