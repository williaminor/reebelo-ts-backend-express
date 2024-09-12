import { Router, Request, Response } from "express";
import Order, { IOrder } from "../models/Order";

const router: Router = Router();

// get all orders
router.get("/", async (req: Request, res: Response) => {
  try {
    const page = (req.query.page as string) || "1";
    const limit = (req.query.limit as string) || "10";

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const orders = await Order.find()
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const totalItems = await Order.countDocuments();

    res.json({ orders, totalItems });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// get a order by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ data: order });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
});

// create a order
router.post("/", async (req: Request, res: Response) => {
  const { products }: IOrder = req.body;
  const order = new Order({ products });

  try {
    await order.save();
    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// update order shipping information (tracking company, tracking number)
router.put("/:id/shipping", async (req: Request, res: Response) => {
  const { tracking } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { tracking },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// update order status
router.patch("/:id/status", async (req: Request, res: Response) => {
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
