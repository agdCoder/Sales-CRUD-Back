import request from "supertest";
import path from "path";
import util from "util";
import { exec as execAsync } from "child_process";

import app from "../app";

const exec = util.promisify(execAsync);
const rootPath = path.resolve(__dirname, "..", "..");

describe("Item Controller", () => {
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
  it("should get all items", async () => {
    const response = await request(app).get("/item");

    expect(response.status).toBe(200);
    expect(response.body.items).toBeDefined();
  });

  it("should create a new item", async () => {
    const newItem = {
      name: "Item Test",
      price: 10,
      stock: 100,
      supplierId: 5,
    };

    const response = await request(app).post("/item").send(newItem);

    expect(response.status).toBe(201);
    expect(response.body.item).toHaveProperty("id");
  });

  it("should update an existing item", async () => {
    const updatedItem = {
      name: "Updated Item",
      price: 15,
      stock: 200,
      supplierId: 8,
    };

    const response = await request(app).put("/item/1").send(updatedItem);

    expect(response.status).toBe(200);
    expect(response.body.item.name).toBe("Updated Item");
  });

  it("should delete an existing item", async () => {
    const response = await request(app).delete("/item/1");

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
