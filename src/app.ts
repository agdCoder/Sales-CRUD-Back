import express, { json, urlencoded } from "express";
import morgan from "morgan";
import cors from "cors";
import connectionDB from "./connection/connection";
import itemRoutes from "./routes/item.routes";
import orderRoutes from "./routes/order.routes";
import saleRoutes from "./routes/saleOrderItem.routes";

const app = express();

//config
app.set("port", process.env.PORT || 3001);

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//conexion
connectionDB();

//routes
app.use(itemRoutes);
app.use(orderRoutes);
app.use(saleRoutes);

export default app;
