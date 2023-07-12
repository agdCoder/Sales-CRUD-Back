import { Sequelize } from "sequelize-typescript";
import Item from "../models/item.model";
import Order from "../models/order.model";
import SaleOrderItem from "../models/saleOrderItem.model";
import path from "path";
import { config as configEnv } from "dotenv";

configEnv();
const rootPath = path.resolve(__dirname, "..", "..");
const env = process.env.NODE_ENV || "development";
const config = require(`${rootPath}/config/config.json`)[env];
const hostDB = process.env.DB_HOST || config.host;
console.log(`Running in ${env}...`);
const configBD = {
  ...config,
  models: [Item, Order, SaleOrderItem],
  host: hostDB,
};
const connection = new Sequelize(configBD);

async function connectionDB() {
  try {
    await connection.sync({ force: false });
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

export default connectionDB;
