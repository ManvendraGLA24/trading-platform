# API Documentation for Trading Platform

## Overview
This document provides comprehensive details regarding the API for the Trading Platform. It includes all available endpoints, request/response examples, and authentication details.

## Authentication
To access the Trading Platform API, you must provide a valid API key in the request header:

```plaintext
Authorization: Bearer YOUR_API_KEY
```

## Base URL
```
https://api.tradingplatform.com/v1
```

## Endpoints

### 1. Get All Products
- **Endpoint:** `/products`
- **Method:** `GET`
- **Authentication:** Required
- **Request Example:**  
  ```plaintext
  GET /products HTTP/1.1
  Host: api.tradingplatform.com
  Authorization: Bearer YOUR_API_KEY
  ```
- **Response Example:**
  ```json
  {
    "products": [
      {
        "id": "1",
        "name": "Product A",
        "price": 100.0
      },
      {
        "id": "2",
        "name": "Product B",
        "price": 150.0
      }
    ]
  }
  ```

### 2. Create a New Order
- **Endpoint:** `/orders`
- **Method:** `POST`
- **Authentication:** Required
- **Request Example:**  
  ```json
  {
    "product_id": "1",
    "quantity": 2,
    "side": "buy"
  }
  ```
- **Response Example:**
  ```json
  {
    "order_id": "abc123",
    "status": "created"
  }
  ```

### 3. Get Order Status
- **Endpoint:** `/orders/{id}`
- **Method:** `GET`
- **Authentication:** Required
- **Request Example:**  
  ```plaintext
  GET /orders/abc123 HTTP/1.1
  Host: api.tradingplatform.com
  Authorization: Bearer YOUR_API_KEY
  ```
- **Response Example:**
  ```json
  {
    "order_id": "abc123",
    "status": "completed",
    "filled_quantity": 2
  }
  ```

### 4. Cancel an Order
- **Endpoint:** `/orders/{id}`
- **Method:** `DELETE`
- **Authentication:** Required
- **Request Example:**  
  ```plaintext
  DELETE /orders/abc123 HTTP/1.1
  Host: api.tradingplatform.com
  Authorization: Bearer YOUR_API_KEY
  ```
- **Response Example:**
  ```json
  {
    "cancelled": true
  }
  ```

## Conclusion
This documentation should help you to effectively interact with the Trading Platform API. For any further questions, please refer to the support team.
