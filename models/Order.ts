import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./Product";

interface IOrderProduct {
  productId: IProduct["_id"];
  quantity: number;
}

export interface IOrder extends Document {
  products: IOrderProduct[];
  status: "processing" | "canceled" | "delivered";
  tracking?: {
    company: string;
    trackingNumber: string;
  };
}

const OrderSchema: Schema = new Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["processing", "canceled", "delivered"],
    default: "processing",
  },
  tracking: {
    company: String,
    trackingNumber: String,
  },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
