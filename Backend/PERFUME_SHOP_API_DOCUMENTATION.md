# Zafra Perfume Shop - Complete API Documentation
**Updated:** September 14, 2025  
**Base URL:** `http://localhost:3000`

## 🔐 Authentication

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "customer@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": {
    "id": "uuid",
    "email": "customer@example.com",
    "fullName": "John Doe"
  }
}
```

### Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "fullName": "New User",
  "phone": 1234567890,
  "address": "123 Main St"
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

---

## 🧴 Perfume Management

### Get All Perfumes (Public)
```http
GET /perfumes
```

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Chanel No. 5",
    "description": "Classic perfume",
    "price": 120.00,
    "stock": 50,
    "category": "Women",
    "brand": "Chanel",
    "image": "image_url",
    "discount": 10.00,
    "cartProducts": [],
    "orderProducts": [],
    "reviews": []
  }
]
```

### Get Perfume by ID
```http
GET /perfumes/{id}
```

### Create Perfume (Public)
```http
POST /perfumes
Content-Type: application/json

{
  "name": "New Perfume",
  "description": "Amazing fragrance",
  "price": 99.99,
  "stock": 100,
  "category": "Unisex",
  "brand": "Luxury Brand",
  "image": "image_url.jpg",
  "discount": 5.00
}
```

### Update Perfume (Public)
```http
PUT /perfumes/{id}
Content-Type: application/json

{
  "name": "Updated Perfume Name",
  "price": 89.99,
  "stock": 75
}
```

### Delete Perfume (Public)
```http
DELETE /perfumes/{id}
```

---

## 👨‍💼 Admin Management
**All admin routes require Admin role authentication**

### Perfume Management

#### Create Perfume (Admin)
```http
POST /admin/product
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Luxury Perfume",
  "description": "Premium fragrance",
  "price": 199.99,
  "stock": 25,
  "category": "Men",
  "brand": "Premium Brand",
  "image": "luxury_perfume.jpg",
  "discount": 15.00
}
```

#### Update Perfume (Admin)
```http
PUT /admin/product/{id}
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "price": 179.99,
  "stock": 30,
  "discount": 20.00
}
```

#### Delete Perfume (Admin)
```http
DELETE /admin/product/{id}
Authorization: Bearer <admin_token>
```

#### Get All Perfumes (Admin)
```http
GET /admin/products
Authorization: Bearer <admin_token>
```

### User Management

#### Get All Users
```http
GET /admin/users
Authorization: Bearer <admin_token>
```

#### Update User Role
```http
PATCH /admin/user/{userId}/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "Manager"
}
```

#### Delete User
```http
DELETE /admin/user/{userId}
Authorization: Bearer <admin_token>
```

### Order Management

#### Get All Orders
```http
GET /admin/orders
Authorization: Bearer <admin_token>
```

### Review Management

#### Get All Reviews
```http
GET /admin/reviews
Authorization: Bearer <admin_token>
```

#### Get Review by ID
```http
GET /admin/review/{id}
Authorization: Bearer <admin_token>
```

#### Delete Review
```http
DELETE /admin/review/{id}
Authorization: Bearer <admin_token>
```

---

## 👨‍💼 Manager Management
**All manager routes require authentication**

### Get All Perfumes
```http
GET /manager/perfumes
Authorization: Bearer <token>
```

### Get Perfume by ID
```http
GET /manager/perfume/{id}
Authorization: Bearer <token>
```

### Update Perfume (Limited Fields)
```http
PUT /manager/perfume/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 149.99,
  "stock": 40,
  "discount": 12.00
}
```

**Note:** Managers can only update `price`, `stock`, and `discount` fields.

---

## 👥 Customer Management

### Create Customer
```http
POST /customer/create
Content-Type: application/json

{
  "fullName": "John Doe",
  "phone": 1234567890,
  "email": "john@example.com",
  "address": "123 Main Street",
  "password": "securepassword"
}
```

### Update Customer
```http
POST /customer/update-customer
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerID": "uuid",
  "fullName": "Updated Name",
  "phone": 9876543210,
  "email": "updated@example.com",
  "address": "456 New Street"
}
```

### Get Customer
```http
POST /customer/get-customer
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": "uuid"
}
```

---

## 🛒 Cart Management

### Add to Cart
```http
POST /customer/add-to-cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": "uuid",
  "perfumeId": "uuid",
  "quantity": 2
}
```

### Get All Carts by Customer
```http
POST /customer/get-all-carts
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": "uuid"
}
```

### Delete Cart Item
```http
DELETE /customer/delete-cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "cartId": "uuid"
}
```

---

## 📦 Order Management

### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": "uuid",
  "perfumeId": "uuid",
  "quantity": 1,
  "shippingAddress": "123 Shipping Address",
  "customerPhone": "1234567890",
  "customerEmail": "customer@example.com",
  "customerName": "John Doe"
}
```

### Create Order from Cart (Recommended)
```http
POST /orders/from-cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": "uuid",
  "cartId": "uuid",
  "shippingAddress": "123 Shipping Address",
  "customerPhone": "1234567890",
  "customerEmail": "customer@example.com",
  "customerName": "John Doe"
}
```

### Get All Orders
```http
GET /orders
Authorization: Bearer <token>
```

### Get Orders by Customer ID
```http
GET /orders/customer/{customerId}
Authorization: Bearer <token>
```

### Get Pending Orders by Customer
```http
GET /orders/customer/{customerId}/pending
Authorization: Bearer <token>
```

### Get Delivered Orders by Customer
```http
GET /orders/customer/{customerId}/delivered
Authorization: Bearer <token>
```

### Get Order by ID
```http
GET /orders/{orderId}
Authorization: Bearer <token>
```

### Update Order Status
```http
PUT /orders/{orderId}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderStatus": "shipped",
  "paymentStatus": "paid",
  "deliveryStatus": false
}
```

### Delete Order
```http
DELETE /orders/{orderId}
Authorization: Bearer <token>
```

---

## ⭐ Review Management

### Get All Reviews
```http
GET /reviews
```

### Get Review by ID
```http
GET /reviews/{id}
```

### Delete Review
```http
DELETE /reviews/{id}
```

---

## 📝 Data Transfer Objects (DTOs)

### CreatePerfumeDto
```typescript
{
  name: string;           // Required
  description: string;    // Required
  price: number;          // Required, min: 0
  stock: number;          // Required, min: 0
  category: string;       // Required
  brand: string;          // Required
  image?: string;         // Optional
  discount?: number;      // Optional, min: 0
}
```

### UpdatePerfumeDto
```typescript
{
  name?: string;          // Optional
  description?: string;   // Optional
  price?: number;         // Optional, min: 0
  stock?: number;         // Optional, min: 0
  category?: string;      // Optional
  brand?: string;         // Optional
  image?: string;         // Optional
  discount?: number;      // Optional, min: 0
}
```

### LoginDto
```typescript
{
  email: string;
  password: string;
}
```

### SignupDto
```typescript
{
  email: string;
  password: string;
  fullName: string;
  phone: number;
  address: string;
}
```

### CartDto
```typescript
{
  customerId: string;
  perfumeId: string;
  quantity: number;
}
```

### CreateOrderDto
```typescript
{
  customerId: string;
  perfumeId: string;
  quantity: number;
  shippingAddress: string;
  customerPhone: string;
  customerEmail: string;
  customerName: string;
}
```

### CreateOrderFromCartDto
```typescript
{
  customerId: string;
  cartId: string;
  shippingAddress: string;
  customerPhone: string;
  customerEmail: string;
  customerName: string;
}
```

### UpdateOrderStatusDto
```typescript
{
  orderStatus?: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  deliveryStatus?: boolean;
}
```

---

## 🚨 Error Responses

All endpoints may return these error formats:

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Forbidden resource"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Resource not found"
}
```

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": [
    "property should not be empty",
    "property must be a positive number"
  ],
  "error": "Bad Request"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## 📝 Notes

1. **Authentication**: Most endpoints require a valid JWT token in the Authorization header
2. **Roles**: Admin routes require Admin role, Manager routes allow both Admin and Manager roles
3. **DEPRECATED**: Some customer endpoints are marked as deprecated, use the newer `/orders/` endpoints instead
4. **Manager Restrictions**: Managers can only update `price`, `stock`, and `discount` fields for perfumes
5. **UUIDs**: All entity IDs are UUIDs except for admin user IDs which are integers
6. **Cart to Order**: Use `/orders/from-cart` for converting cart items to orders (recommended approach)

---

## 🔧 Environment Setup

Make sure your backend is running on:
```
http://localhost:3000
```

And configure your frontend HTTP client with the base URL and proper error handling for the response formats above.