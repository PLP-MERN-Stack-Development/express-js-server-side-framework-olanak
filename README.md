# 🛍️ Express.js Products API

A simple RESTful API built using **Express.js** that demonstrates middleware, authentication, validation, error handling, and advanced features such as filtering, pagination, and search.

---

## 🚀 Getting Started

### **1. Clone the repository**
```bash
git clone https://github.com/PLP-MERN-Stack-Development/express-js-server-side-framework-olanak
cd express-js-server-side-framework-olanak
````

### **2. Install dependencies**

```bash
npm install
```

### **3. Setup environment variables**

Create a `.env` file in the root directory based on `.env.example`.

Example:

```
PORT=5000
API_KEY=my-secret-key
```

### **4. Run the server**

```bash
npm run dev
```

By default, the server runs on:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## ⚙️ Project Structure

```
src/
 ├── Controllers/
 │    └── productController.js
 ├── Routes/
 │    └── productsRoute.js
 ├── middleware/
 │    ├── auth.js
 │    ├── logger.js
 │    ├── validateProduct.js
 │    ├── errorMiddleware.js
 │    └── catchAsync.js
 ├── utils/
 │    └── error.js
 ├── db/
 │    └── db.js
 ├── server.js
.env
.env.example
README.md
```

---

## 🧩 API Documentation

### **Base URL**

```
http://localhost:5000/api/products
```

---

### **1️⃣ Get All Products**

**GET** `/api/products`

**Query Parameters:**

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| category  | string | Filter by category          |
| page      | number | Pagination - page number    |
| limit     | number | Pagination - items per page |

**Response Example:**

```json
{
  "total": 8,
  "page": 1,
  "totalPages": 2,
  "data": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### **2️⃣ Get Product by ID**

**GET** `/api/products/:id`

**Response Example:**

```json
{
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```

---

### **3️⃣ Create Product**

**POST** `/api/products`

🔒 **Protected Route** — requires an API key in headers.

**Header:**

```
x-api-key: my-secret-key
```

**Request Body:**

```json
{
  "name": "Smartphone",
  "description": "Android phone with 8GB RAM",
  "price": 500,
  "category": "electronics",
  "inStock": true
}
```

**Response Example:**

```json
{
  "message": "Product added successfully",
  "product": {
    "id": "b3c9e5a2-1c6d-48a0-befa-5f7a541b1234",
    "name": "Smartphone",
    "description": "Android phone with 8GB RAM",
    "price": 500,
    "category": "electronics",
    "inStock": true
  }
}
```

---

### **4️⃣ Update Product**

**PUT** `/api/products/:id`

**Header:**

```
x-api-key: my-secret-key
```

**Request Example:**

```json
{
  "price": 550,
  "inStock": false
}
```

**Response Example:**

```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "b3c9e5a2-1c6d-48a0-befa-5f7a541b1234",
    "name": "Smartphone",
    "price": 550,
    "inStock": false
  }
}
```

---

### **5️⃣ Delete Product**

**DELETE** `/api/products/:id`

**Header:**

```
x-api-key: my-secret-key
```

**Response Example:**

```json
{
  "message": "Product deleted successfully"
}
```

---

### **6️⃣ Search Products**

**GET** `/api/products/search?name=laptop`

**Response Example:**

```json
{
  "count": 1,
  "results": [
    {
      "id": "1",
      "name": "Laptop",
      "price": 1200,
      "category": "electronics"
    }
  ]
}
```

---

### **7️⃣ Product Statistics**

**GET** `/api/products/stats`

**Response Example:**

```json
{
  "totalProducts": 10,
  "countByCategory": {
    "electronics": 6,
    "fashion": 2,
    "home": 2
  }
}
```

---

## ⚠️ Error Responses

| Status | Type            | Message Example                 |
| ------ | --------------- | ------------------------------- |
| 400    | ValidationError | "Name and price are required"   |
| 401    | Unauthorized    | "Unauthorized: Invalid API Key" |
| 404    | NotFoundError   | "Product not found"             |
| 500    | ServerError     | "Something went wrong"          |

---

## 🧠 Author

**Olana Kenea**
📍 Istanbul, Turkiye
💼 System Administrator | Backend Developer
📧 [[olanakenea6@gmail.com](mailto:olanakenea6@gmail.com)]
🌐 [LinkedIn](https://linkedin.com/in/olana-kenea)

---

## 🪪 License

This project is licensed under the MIT License.

````
