# Order Module API Documentation

## Overview
The Order module handles order creation, management, and cart-to-order conversion for the Zafra Perfume Shop backend.

## Entities

### Order Entity
- `id`: UUID (Primary Key)
- `customerId`: UUID (Foreign Key to Customer)
- `totalQuantity`: Number
- `totalPrice`: Decimal (10,2)
- `shippingAddress`: String
- `customerPhone`: String
- `customerEmail`: String
- `customerName`: String
- `orderStatus`: Enum ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']
- `paymentStatus`: Enum ['pending', 'paid', 'failed', 'refunded']
- `deliveryStatus`: Boolean
- `orderDate`: Timestamp (Auto-generated)
- `deliveryDate`: Timestamp (Nullable)

### OrderProduct Entity
- `id`: UUID (Primary Key)
- `orderId`: UUID (Foreign Key to Order)
- `perfumeId`: UUID (Foreign Key to Perfume)
- `quantity`: Number
- `unitPrice`: Decimal (10,2)
- `totalPrice`: Decimal (10,2)

## API Endpoints

### POST /orders
Create a new order directly.

**Request Body:**
```json
{
  "customerId": "uuid",
  "shippingAddress": "string",
  "customerPhone": "string",
  "customerEmail": "string",
  "customerName": "string",
  "orderStatus": "pending" (optional),
  "paymentStatus": "pending" (optional)
}
```

### POST /orders/from-cart
Create an order from an existing cart and delete the cart.

**Request Body:**
```json
{
  "cartId": "uuid",
  "shippingAddress": "string",
  "customerPhone": "string",
  "customerEmail": "string",
  "customerName": "string",
  "orderStatus": "pending" (optional),
  "paymentStatus": "pending" (optional)
}
```

### GET /orders
Get all orders (with relations).

### GET /orders/customer/:customerId
Get all orders for a specific customer.

### GET /orders/:id
Get a specific order by ID.

### PUT /orders/:id/status
Update order status.

**Request Body:**
```json
{
  "orderStatus": "confirmed" (optional),
  "paymentStatus": "paid" (optional),
  "deliveryStatus": true (optional)
}
```

### DELETE /orders/:id
Delete an order.

## Key Features

1. **Cart to Order Conversion**: The `createOrderFromCart` endpoint automatically:
   - Retrieves the cart with all its products
   - Creates an order with the cart's data
   - Creates order products from cart products
   - Deletes the original cart
   - Returns the created order with all relations

2. **Order Status Management**: Orders can be tracked through different statuses:
   - Order Status: pending → confirmed → shipped → delivered (or cancelled)
   - Payment Status: pending → paid (or failed/refunded)
   - Delivery Status: Boolean flag with automatic delivery date setting

3. **Relationships**: Orders are properly linked to:
   - Customer (Many-to-One)
   - OrderProducts (One-to-Many)
   - Perfumes (through OrderProducts)

## Usage Example

```javascript
// Create order from cart
const response = await fetch('/orders/from-cart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cartId: 'cart-uuid-here',
    shippingAddress: '123 Main St, City, Country',
    customerPhone: '+1234567890',
    customerEmail: 'customer@example.com',
    customerName: 'John Doe'
  })
});
```
