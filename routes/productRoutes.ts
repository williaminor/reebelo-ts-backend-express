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

// update a product
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, stockQuantity } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, stockQuantity },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

// get products by page
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = (req.query.page as string) || "1";
    const limit = (req.query.limit as string) || "10";

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const products = await Product.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalItems = await Product.countDocuments();

    res.json({ products, totalItems });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// get all products
router.get("/all", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// get product by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

export default router;
