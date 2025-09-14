# Zafra Perfume Shop - Updated API Documentation

## Overview
This document provides the complete and updated API documentation for the Zafra Perfume Shop backend after the order module refactoring. All order-related functionality has been consolidated into the customer module.

## Base URL
```
http://localhost:3000
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 1. Authentication APIs

### 1.1 Customer Login
**POST** `/auth/login`
```json
{
  "email": "customer@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "access_token": "jwt_token_here",
  "customer": {
    "id": "customer_id",
    "email": "customer@example.com",
    "fullName": "Customer Name"
  }
}
```

### 1.2 Customer Signup
**POST** `/auth/signup`
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": 1234567890,
  "address": "123 Main St"
}
```

### 1.3 Get Profile
**GET** `/auth/profile`
- **Auth Required:** ✅
- Returns current customer profile information

---

## 2. Customer APIs

### 2.1 Create Customer
**POST** `/customer/create`
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": 1234567890,
  "address": "123 Main St"
}
```

### 2.2 Update Customer
**POST** `/customer/update-customer`
- **Auth Required:** ✅
```json
{
  "customerID": "customer_id",
  "fullName": "Updated Name",
  "phone": 9876543210,
  "email": "updated@example.com",
  "address": "456 New Address"
}
```

### 2.3 Get Customer Details
**POST** `/customer/get-customer`
- **Auth Required:** ✅
```json
{
  "customerId": "customer_id"
}
```

---

## 3. Cart Management APIs

### 3.1 Add to Cart (Customer Module)
**POST** `/customer/add-to-cart`
- **Auth Required:** ✅
```json
{
  "customerId": "customer_id",
  "productId": "product_id",
  "quantity": 2,
  "totalPrice": 59.98
}
```

### 3.2 Get All Customer Carts (Customer Module)
**POST** `/customer/get-all-carts`
- **Auth Required:** ✅
```json
{
  "customerId": "customer_id"
}
```

### 3.3 Delete Cart (Customer Module)
**DELETE** `/customer/delete-cart`
- **Auth Required:** ✅
```json
{
  "cartId": "cart_id"
}
```

### 3.4 Enhanced Cart APIs (Cart Module)

#### Add to Cart
**POST** `/cart/add`
- **Auth Required:** ✅
```json
{
  "customerId": "customer_id",
  "productId": "product_id",
  "quantity": 2,
  "totalPrice": 59.98
}
```

#### Get Customer Carts
**GET** `/cart/customer/:customerId`
- **Auth Required:** ✅

#### Get Cart by ID
**GET** `/cart/:id`
- **Auth Required:** ✅

#### Update Cart
**PUT** `/cart/:id`
- **Auth Required:** ✅
```json
{
  "quantity": 3,
  "totalPrice": 89.97,
  "paymentStatus": "paid",
  "deliveryStatus": true
}
```

#### Delete Cart
**DELETE** `/cart/:id`
- **Auth Required:** ✅

#### Get Active Cart
**GET** `/cart/active/:customerId`
- **Auth Required:** ✅

#### Clear Cart
**PUT** `/cart/clear/:id`
- **Auth Required:** ✅

#### Remove Product from Cart
**DELETE** `/cart/product/:cartId/:productId`
- **Auth Required:** ✅

---

## 4. Order Management APIs (Consolidated in Customer Module)

### 4.1 Create Order from Cart
**POST** `/customer/create-order`
- **Auth Required:** ✅
```json
{
  "customerId": "customer_id",
  "cartId": "cart_id",
  "shippingAddress": "123 Delivery Address" // Optional
}
```

### 4.2 Order History APIs (Deprecated but Available)

#### Get Pending Orders
**POST** `/customer/get-all-pending-orders`
- **Auth Required:** ✅
- **Status:** ⚠️ DEPRECATED
```json
{
  "customerId": "customer_id"
}
```

#### Get Delivered Orders
**POST** `/customer/get-all-delivered-orders`
- **Auth Required:** ✅
- **Status:** ⚠️ DEPRECATED
```json
{
  "customerId": "customer_id"
}
```

#### Get All Orders
**POST** `/customer/get-all-orders`
- **Auth Required:** ✅
- **Status:** ⚠️ DEPRECATED
```json
{
  "customerId": "customer_id"
}
```

---

## 5. Product/Perfume APIs

### 5.1 Get All Perfumes
**GET** `/perfumes`

### 5.2 Create Perfume
**POST** `/perfumes`
```json
{
  "name": "Perfume Name",
  "brand": "Brand Name",
  "description": "Perfume description",
  "price": 29.99,
  "stock": 100,
  "category": "Men",
  "image": "image_url",
  "discountPercentage": 10
}
```

### 5.3 Get Perfume by ID
**GET** `/perfumes/:id`

### 5.4 Update Perfume
**PUT** `/perfumes/:id`
```json
{
  "name": "Updated Name",
  "price": 35.99,
  "stock": 50
}
```

### 5.5 Delete Perfume
**DELETE** `/perfumes/:id`

---

## 6. Admin APIs

### 6.1 Product Management
**POST** `/admin/product` - Create product (Admin only)
**PUT** `/admin/product/:id` - Update product (Admin only)
**DELETE** `/admin/product/:id` - Delete product (Admin only)
**GET** `/admin/products` - Get all products (Admin only)

### 6.2 User Management
**GET** `/admin/users` - List all users (Admin only)
**PATCH** `/admin/user/:id/role` - Change user role (Admin only)
```json
{
  "role": "admin" | "manager" | "customer"
}
```
**DELETE** `/admin/user/:id` - Delete user (Admin only)

### 6.3 Order Management
**GET** `/admin/orders` - View all orders (Admin only)

### 6.4 Review Management
**GET** `/admin/reviews` - Get all reviews (Admin only)
**GET** `/admin/review/:id` - Get single review (Admin only)
**DELETE** `/admin/review/:id` - Delete review (Admin only)

---

## 7. Data Models

### 7.1 Order Entity
```typescript
{
  id: string (UUID),
  customerId: string,
  totalQuantity: number,
  totalPrice: number,
  shippingAddress: string,
  customerPhone: string,
  customerEmail: string,
  customerName: string,
  orderStatus: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
  deliveryStatus: boolean,
  orderDate: Date,
  deliveryDate: Date | null,
  customer: Customer,
  orderProducts: OrderProduct[]
}
```

### 7.2 Order DTOs
```typescript
// Create Order DTO
{
  customerId: string,
  shippingAddress: string,
  customerPhone: string,
  customerEmail: string,
  customerName: string,
  orderStatus?: string, // default: 'pending'
  paymentStatus?: string // default: 'pending'
}

// Create Order from Cart DTO
{
  cartId: string,
  shippingAddress?: string,
  customerPhone?: string,
  customerEmail?: string,
  customerName?: string,
  orderStatus?: string, // default: 'pending'
  paymentStatus?: string // default: 'pending'
}

// Update Order Status DTO
{
  orderStatus?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
  paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded',
  deliveryStatus?: boolean
}
```

### 7.3 Cart Entity
```typescript
{
  id: string (UUID),
  customerId: string,
  productId: string,
  quantity: number,
  totalPrice: number,
  paymentStatus: boolean,
  deliveryStatus: boolean,
  createdAt: Date,
  updatedAt: Date,
  customer: Customer,
  product: Perfume
}
```

---

## 8. Response Formats

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

---

## 9. Important Changes After Refactoring

### ✅ **Completed Changes:**
1. **Order Module Removed**: All order functionality consolidated into customer module
2. **Order Entity Moved**: Now located at `/src/customer/order.entity.ts`
3. **Order DTOs Moved**: Now located at `/src/customer/dto/order.dto.ts`
4. **Unified Order Management**: All order operations handled through customer service
5. **Import Paths Updated**: All references to order entity updated throughout the codebase

### ⚠️ **Deprecated Endpoints:**
- `/customer/get-all-pending-orders` (still works but deprecated)
- `/customer/get-all-delivered-orders` (still works but deprecated)
- `/customer/get-all-orders` (still works but deprecated)

### 🔄 **Recommended Usage:**
- Use `/customer/create-order` for creating orders from cart
- Use admin APIs for order management and status updates
- Use customer APIs for personal order history

---

## 10. Environment Variables Required

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=zafra_perfume_shop

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION=1d

# Mailer
Mailer_Id=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

---

## 11. Testing Endpoints

You can test these APIs using tools like Postman, Thunder Client, or curl. Make sure to:

1. Start with authentication to get JWT token
2. Include the token in subsequent requests
3. Use the correct request methods and body formats
4. Check response status codes and messages

## Note
This documentation reflects the current state after the order module refactoring. All order functionality is now centralized within the customer module, providing a cleaner and more maintainable architecture.