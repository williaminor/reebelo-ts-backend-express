import { Router, Request, Response } from "express";
import Order, { IOrder } from "../models/Order";

const router: Router = Router();

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
