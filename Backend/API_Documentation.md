# Zafra Perfume Shop API Documentation

## Table of Contents
- [Authentication APIs](#authentication-apis)
- [Customer APIs](#customer-apis)
- [Error Responses](#error-responses)
- [Setup Instructions](#setup-instructions)

---

## Authentication APIs

### 1. User Signup
**Endpoint:** `POST /auth/signup`

**Description:** Register a new customer account

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phone": 1234567890,
  "email": "john.doe@example.com",
  "address": "123 Main Street, City, Country",
  "password": "SecurePassword123"
}
```

**Validation Rules:**
- `fullName`: Required, string
- `phone`: Required, number (9-15 digits)
- `email`: Required, valid email format
- `address`: Required, string
- `password`: Required, string (minimum 6 characters)

**Response:**
```json
{
  "id": "uuid-generated-id",
  "fullName": "John Doe",
  "phone": 1234567890,
  "email": "john.doe@example.com",
  "address": "123 Main Street, City, Country",
  "password": "hashed-password",
  "cart": []
}
```

---

### 2. User Login
**Endpoint:** `POST /auth/login`

**Description:** Authenticate existing customer and get JWT token

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "customer": {
    "id": "uuid-generated-id",
    "fullName": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

---

### 3. Get User Profile
**Endpoint:** `GET /auth/profile`

**Description:** Get authenticated customer profile information

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "id": "uuid-generated-id",
  "email": "john.doe@example.com"
}
```

---

## Customer APIs

### 1. Create Customer
**Endpoint:** `POST /customer/create`

**Description:** Create a new customer account (same as signup)

**Request Body:**
```json
{
  "fullName": "Jane Smith",
  "phone": 9876543210,
  "email": "jane.smith@example.com",
  "address": "456 Oak Avenue, Town, Country",
  "password": "StrongPassword456"
}
```

**Response:**
```json
{
  "id": "uuid-generated-id",
  "fullName": "Jane Smith",
  "phone": 9876543210,
  "email": "jane.smith@example.com",
  "address": "456 Oak Avenue, Town, Country",
  "password": "hashed-password",
  "cart": []
}
```

---

### 2. Update Customer
**Endpoint:** `POST /customer/update-customer`

**Description:** Update existing customer information

**Request Body:**
```json
{
  "customerID": "uuid-of-customer",
  "fullName": "Jane Smith Updated",
  "phone": 9876543211,
  "email": "jane.updated@example.com",
  "address": "789 Pine Street, New City, Country"
}
```

**Notes:**
- All fields are optional
- Only provided fields will be updated
- Email and phone must be unique across all customers
- You can update one field or all fields at once

**Response:**
```json
{
  "id": "uuid-of-customer",
  "fullName": "Jane Smith Updated",
  "phone": 9876543211,
  "email": "jane.updated@example.com",
  "address": "789 Pine Street, New City, Country",
  "password": "hashed-password",
  "cart": []
}
```

---

### 3. Get Customer
**Endpoint:** `POST /customer/get-customer`

**Description:** Retrieve customer information by ID

**Request Body:**
```json
{
  "id": "uuid-of-customer"
}
```

**Response:**
```json
{
  "id": "uuid-of-customer",
  "fullName": "Jane Smith",
  "phone": 9876543210,
  "email": "jane.smith@example.com",
  "address": "456 Oak Avenue, Town, Country",
  "password": "hashed-password",
  "cart": []
}
```

---

### 4. Add to Cart
**Endpoint:** `POST /customer/add-to-cart`

**Description:** Add perfume items to customer's cart

**Request Body:**
```json
{
  "customerId": "uuid-of-customer",
  "perfumeId": "uuid-of-perfume",
  "quantity": 2
}
```

**Response:**
```json
{
  "id": "cart-uuid",
  "customerId": "uuid-of-customer",
  "perfumeId": "uuid-of-perfume",
  "quantity": 2,
  "totalPrice": 199.98,
  "paymentStatus": false,
  "deliveryStatus": false,
  "orderCreatedDate": null,
  "cartProducts": [...]
}
```

---

### 5. Get All Carts
**Endpoint:** `POST /customer/get-all-carts`

**Description:** Retrieve all cart items for a customer

**Request Body:**
```json
{
  "customerId": "uuid-of-customer"
}
```

**Response:**
```json
{
  "cartId": "cart-uuid",
  "cartTotal": 199.98,
  "cartQuantity": 2,
  "cartProducts": [
    {
      "perfumeName": "Rose Perfume",
      "perfumeBrand": "Luxury Brand",
      "perfumeImage": "image-url",
      "perfumePrice": 99.99,
      "perfumeQuantity": 2
    }
  ]
}
```

---

### 6. Create Order
**Endpoint:** `POST /customer/create-order`

**Description:** Convert cart to order and mark as paid

**Request Body:**
```json
{
  "customerId": "uuid-of-customer",
  "cartId": "cart-uuid"
}
```

**Response:**
```json
{
  "orderId": "cart-uuid",
  "orderDate": "2025-08-17T22:00:00.000Z",
  "orderTotal": 199.98,
  "orderProducts": [
    {
      "perfumeName": "Rose Perfume",
      "perfumeBrand": "Luxury Brand",
      "perfumeImage": "image-url",
      "perfumePrice": 99.99,
      "perfumeQuantity": 2
    }
  ],
  "customerName": "Jane Smith",
  "customerEmail": "jane.smith@example.com",
  "customerPhone": 9876543210,
  "customerAddress": "456 Oak Avenue, Town, Country"
}
```

---

### 7. Get Pending Orders
**Endpoint:** `POST /customer/get-all-pending-orders`

**Description:** Retrieve all pending (paid but not delivered) orders

**Request Body:**
```json
{
  "customerId": "uuid-of-customer"
}
```

**Response:**
```json
{
  "orderId": "order-uuid",
  "orderDate": "2025-08-17T22:00:00.000Z",
  "orderTotal": 199.98,
  "paymentStatus": "Paid",
  "orderStatus": "Pending",
  "orderProducts": [...],
  "customerName": "Jane Smith",
  "customerEmail": "jane.smith@example.com",
  "customerPhone": 9876543210,
  "customerAddress": "456 Oak Avenue, Town, Country"
}
```

---

### 8. Get Delivered Orders
**Endpoint:** `POST /customer/get-all-delivered-orders`

**Description:** Retrieve all completed (paid and delivered) orders

**Request Body:**
```json
{
  "customerId": "uuid-of-customer"
}
```

**Response:**
```json
{
  "orderId": "order-uuid",
  "orderDate": "2025-08-17T22:00:00.000Z",
  "orderTotal": 199.98,
  "paymentStatus": "Paid",
  "orderStatus": "Delivered",
  "orderProducts": [...],
  "customerName": "Jane Smith",
  "customerEmail": "jane.smith@example.com",
  "customerPhone": 9876543210,
  "customerAddress": "456 Oak Avenue, Town, Country"
}
```

---

### 9. Delete Cart
**Endpoint:** `DELETE /customer/delete-cart`

**Description:** Remove cart items for a customer

**Request Body:**
```json
{
  "cartId": "cart-uuid"
}
```

**Response:**
```json
{
  "message": "Cart deleted successfully"
}
```

---

## Error Responses

### Common HTTP Status Codes

**400 Bad Request**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

**401 Unauthorized**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**404 Not Found**
```json
{
  "statusCode": 404,
  "message": "Customer not found",
  "error": "Not Found"
}
```

**409 Conflict**
```json
{
  "statusCode": 409,
  "message": "Email already exists for another customer",
  "error": "Conflict"
}
```

**500 Internal Server Error**
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in your project root:

```env
# Gmail SMTP Configuration
Mailer_Id=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=zafra

# JWT Secret
JWT_SECRET=your-jwt-secret-key
```

### 2. Gmail App Password Setup
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate App Password for "Mail"
4. Use the 16-character password in your `.env` file

### 3. Database Setup
1. Install PostgreSQL
2. Create database named `zafra`
3. Update connection details in `.env` file

### 4. Install Dependencies
```bash
npm install
npm install @nestjs/config @nestjs-modules/mailer nodemailer
```

### 5. Run Application
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

---

## Testing Examples

### Using cURL

**Signup:**
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "phone": 1234567890,
    "email": "test@example.com",
    "address": "Test Address",
    "password": "testpass123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

**Update Customer (with token):**
```bash
curl -X POST http://localhost:3000/customer/update-customer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "customerID": "customer-uuid",
    "fullName": "Updated Name"
  }'
```

### Using Postman

1. **Import the collection** (if available)
2. **Set base URL** to `http://localhost:3000`
3. **Use the request examples** above
4. **Save JWT token** from login response
5. **Add Authorization header** for protected routes

---

## Notes

- **Phone numbers** must be unique across all customers
- **Email addresses** must be unique across all customers
- **JWT tokens** expire after 1 day
- **Cart items** are automatically converted to orders when payment is confirmed
- **Email notifications** are sent when customers sign up
- **All timestamps** are in UTC format

---

## Support

For technical support or questions about the API:
- Check the error responses above
- Verify your environment variables
- Ensure database connection is working
- Check Gmail SMTP configuration

---

*Last updated: August 17, 2025*
