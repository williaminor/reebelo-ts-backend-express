# **Reebelo Case Study Backend** (Node.js/Express with TypeScript)

## **Overview**

This project is the backend for the **Reebelo Case Study**. It provides RESTful APIs for managing products and orders, built using **Node.js**, **Express**, **TypeScript**, and **MongoDB** for handling data storage. The project is structured for scalability and maintainability, leveraging modern best practices.

---

## **Technologies Used**

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building APIs.
- **TypeScript**: Static typing for better code reliability.
- **MongoDB**: NoSQL database for storing products and orders.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

---

## **Project Structure**

### **1. `server.ts`**

- **Purpose**: The main entry point for the application.
- **Responsibilities**:
  - Connects to MongoDB using `mongoose`.
  - Sets up middleware such as `cors`, `body-parser`, and `morgan` for logging.
  - Initializes API routes.
- **Usage**:
  ```bash
  npm run start
  ```

### **2. `models/Product.ts`**

- **Purpose**: Defines the Mongoose schema and model for products.
- **Fields**:
  - `name`: Name of the product (String).
  - `price`: Price of the product (Number).
  - `stockQuantity`: Available stock (Number).
- **Usage**: Interacts with product data in MongoDB.

### **3. `models/Order.ts`**

- **Purpose**: Defines the Mongoose schema and model for orders.
- **Fields**:
  - `products`: Array of product objects (IDs + quantity).
  - `status`: Order status (pending, delivered, canceled, etc.).
  - `tracking`: Tracking info object (company name and tracking number).
- **Usage**: Manages order data in MongoDB.

### **4. `routes/productRoutes.ts`**

- **Purpose**: API endpoints for managing products.
- **Endpoints**:
  - **GET** `/api/products`: Fetch all products with pagination support.
  - **POST** `/api/products`: Create a new product.
  - **GET** `/api/products/:id`: Get product by ID.
  - **PUT** `/api/products/:id`: Update a product by ID.

### **5. `routes/orderRoutes.ts`**

- **Purpose**: API endpoints for managing orders.
- **Endpoints**:
  - **POST** `/api/orders`: Create a new order.
  - **PATCH** `/api/orders/:id/status`: Update order status.
  - **PUT** `/api/orders/:id/shipping`: Update shipping information.

### **6. `controllers/`**

- **Purpose**: Controllers that handle the business logic for both products and orders.
- **Files**:
  - `productController.ts`: Handles product-related logic (e.g., fetching, creating, updating products).
  - `orderController.ts`: Handles order-related logic (e.g., creating orders, updating status and shipping).

### **7. `middlewares/errorMiddleware.ts`**

- **Purpose**: Middleware to handle API errors and exceptions gracefully.

### **8. `.env`**

- **Purpose**: Holds environment variables such as database URI and server port.
- **Example**:
  ```env
  MONGO_URI=mongodb://localhost:27017/reebelo
  PORT=5000
  ```

---

## **Setup Instructions**

### **1. Clone the repository**

```bash
git clone <repository-url>
cd backend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Set up environment variables**

Create a `.env` file and define the following:

```bash
MONGO_URI=mongodb://localhost:27017/reebelo
PORT=5000
```

### **4. Run the server**

```bash
npm run start
```

This will start the backend server on `http://localhost:5000`.

---

## **Key Features**

- **Product Management**: API endpoints for creating, reading, updating, and deleting (CRUD) products.
- **Order Management**: API endpoints for creating orders, updating order status, and managing shipping information.
- **Error Handling**: Centralized error handling for clean and consistent API error responses.
- **Pagination Support**: APIs support pagination for product and order listings.
- **Scalability**: Designed to handle millions of users and orders, with efficient querying and indexing strategies.

---

## **Testing**

### **Run tests**

```bash
npm test
```

Uses **Jest** for running unit tests to ensure code quality.

---

## **Architecture & AWS Services (Optional)**

- **AWS Lambda**: Could be used to run serverless functions for specific use cases such as product management.
- **AWS API Gateway**: Used for handling and managing API endpoints.
- **AWS S3**: For storing static assets or order-related documents.
- **AWS DynamoDB**: As a scalable NoSQL database for high traffic loads, although MongoDB is used in this case.
- **AWS EC2 or ECS**: For deploying and scaling the backend services.

### **Architecture Diagram**

_AWS-based architecture example:_

```
[Client/Frontend] -> [API Gateway] -> [AWS Lambda] -> [MongoDB/DynamoDB]
```

### **Why these AWS Services?**

- **Lambda**: Scalable and cost-effective serverless functions.
- **API Gateway**: Simplifies the management of RESTful APIs and scales automatically.
- **S3**: High availability for file storage.
- **DynamoDB**: Ideal for NoSQL solutions where performance at scale is required.

---

## **Known Limitations**

- **Scalability**: The current setup with MongoDB is suitable for large datasets, but for ultra-large-scale systems, you might consider using **AWS DynamoDB** or **sharding** techniques in MongoDB.
- **Caching**: No caching mechanism is currently implemented, but you could integrate **Redis** for caching frequently accessed data.
