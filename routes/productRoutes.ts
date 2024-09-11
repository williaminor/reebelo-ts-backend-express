import { Router, Request, Response } from "express";
import Product, { IProduct } from "../models/Product";

const router: Router = Router();

// create a product
router.post("/", async (req: Request, res: Response) => {
  const { name, price, stockQuantity }: IProduct = req.body;
  const product = new Product({ name, price, stockQuantity });

  try {
    await product.save();
    res.status(201).json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
