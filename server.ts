import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error("MongoDB URI is not defined in .env");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
