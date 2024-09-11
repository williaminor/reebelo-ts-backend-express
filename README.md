# Reebelo Case Study Backend (Node.js/Express with TypeScript)

## Overview

This is the backend for the Reebelo Case Study. It provides APIs for managing products and orders, built with **Node.js**, **Express**, and **MongoDB**.

## File Structure

### 1. `server.ts`

- **Purpose**: Main entry point for the Express server. Initializes middleware, connects to MongoDB, and sets up API routes.
- **Usage**: Run `npm run start` to start the server.

### 2. `models/Product.ts`

- **Purpose**: Defines the schema for products using Mongoose.
- **Fields**: `name`, `price`, `stockQuantity`.
- **Usage**: Imported into routes to interact with product data in MongoDB.

### 3. `models/Order.ts`

- **Purpose**: Defines the schema for orders using Mongoose.
- **Fields**: Array of product IDs, order status, and tracking info.
- **Usage**: Imported into routes to manage order data.

### 4. `routes/productRoutes.ts`

- **Purpose**: Handles product-related routes (`/api/products`).
- **Routes**:
  - **GET** `/api/products`: Fetch all products.
  - **POST** `/api/products`: Create a new product.

### 5. `routes/orderRoutes.ts`

- **Purpose**: Handles order-related routes (`/api/orders`).
- **Routes**:
  - **POST** `/api/orders`: Create a new order.
  - **PUT** `/api/orders/:id/shipping`: Update order shipping info.
  - **PATCH** `/api/orders/:id/status`: Update order status.

### 6. `.env`

- **Purpose**: Stores environment variables such as `MONGO_URI` and `PORT`.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a .env file and configure MongoDB:

   ```
   MONGO_URI=mongodb://localhost:27017/reebelo
   PORT=5000
   ```

3. Start the server:
   ```
   npm run start
   ```
