# Template Marketplace API

## Overview

This project is a RESTful API built with Node.js, Express, MongoDB, and Mongoose.

The API manages two collections:

- Templates
- Customers

Templates represent digital products available in the marketplace. Customers can be connected to templates through a MongoDB ObjectId reference.

For Module 3.4, the API was expanded to support MongoDB query operators, field exclusion using `select()`, sorting, and pagination on both GET ALL endpoints.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript
- dotenv
- CORS
- Nodemon
- Postman
- MongoDB Compass

---

# Project Structure

```text
module-two-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── templateController.js
│   └── customerController.js
│
├── models/
│   ├── Template.js
│   └── Customer.js
│
├── routes/
│   ├── templateRoutes.js
│   └── customerRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# Installation

## 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

## 2. Navigate Into the Project

```bash
cd module-two-api
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Create the Environment File

Create a `.env` file in the root of the project.

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/templateMarketplace
```

The `.env` file should not be uploaded to GitHub.

## 5. Start MongoDB

Make sure MongoDB is running before starting the API.

## 6. Start the Application

Development mode:

```bash
npm run dev
```

The application runs on port `3000`.

A successful startup should display:

```text
Server running on port 3000
MongoDB Connected
```

---

# Template Routes

## Create Template

**POST**

```text
/api/templates
```

Creates a new template in MongoDB.

---

## Get All Templates

**GET**

```text
/api/templates
```

Retrieves templates stored in MongoDB.

The endpoint supports MongoDB query operators, field exclusion, sorting, and pagination.

---

## Get Template by ID

**GET**

```text
/api/templates/:id
```

Retrieves one template using its MongoDB `_id`.

---

## Update Template

**PUT**

```text
/api/templates/:id
```

Updates an existing template.

---

## Delete Template

**DELETE**

```text
/api/templates/:id
```

Deletes a template.

---

# Customer Routes

## Create Customer

**POST**

```text
/api/customers
```

Creates a new customer.

---

## Get All Customers

**GET**

```text
/api/customers
```

Retrieves customers stored in MongoDB.

The endpoint supports MongoDB query operators, field exclusion, sorting, and pagination.

---

## Get Customer by ID

**GET**

```text
/api/customers/:id
```

Retrieves one customer using its MongoDB `_id`.

---

## Update Customer

**PUT**

```text
/api/customers/:id
```

Updates an existing customer.

---

## Delete Customer

**DELETE**

```text
/api/customers/:id
```

Deletes a customer.

---

# Module 3.4 - MongoDB Query Features

Module 3.4 adds filtering mechanics to both GET ALL endpoints using query strings.

## 1. MongoDB Query Operators - Templates

Templates can be filtered by a minimum and maximum price.

Example:

```text
GET /api/templates?minPrice=10&maxPrice=50
```

The controller uses the MongoDB comparison operators:

```javascript
$gte
$lte
```

`$gte` means greater than or equal to.

`$lte` means less than or equal to.

This request returns templates with prices between $10 and $50.

---

## 2. MongoDB Query Operators - Customers

Customers can be filtered using a purchase date range.

Example:

```text
GET /api/customers?startDate=2026-01-01&endDate=2026-12-31
```

This also uses:

```javascript
$gte
$lte
```

The request returns customers whose purchase dates fall within the specified date range.

---

# Select / Exclude Fields

Both GET ALL endpoints support field exclusion using Mongoose `select()`.

## Templates

Example:

```text
GET /api/templates?exclude=__v,isPremium
```

This removes the `__v` and `isPremium` fields from the response.

## Customers

Example:

```text
GET /api/customers?exclude=__v,email
```

This removes the `__v` and `email` fields from the response.

---

# Sorting

The API supports sorting through a query string.

## Sort Templates by Price

Lowest to highest:

```text
GET /api/templates?sort=price
```

Highest to lowest:

```text
GET /api/templates?sort=-price
```

## Sort Customers by Purchase Date

Oldest to newest:

```text
GET /api/customers?sort=purchaseDate
```

Newest to oldest:

```text
GET /api/customers?sort=-purchaseDate
```

---

# Pagination

Pagination is implemented on both GET ALL endpoints.

The API accepts:

- `page` - page number
- `limit` - number of documents returned per page

## Template Pagination

Example:

```text
GET /api/templates?page=1&limit=3
```

## Customer Pagination

Example:

```text
GET /api/customers?page=1&limit=3
```

The response includes pagination information:

```json
{
  "page": 1,
  "limit": 3,
  "total": 20,
  "totalPages": 7,
  "data": []
}
```

The `data` array contains the records for the requested page.

---

# Combining Query Parameters

Query parameters can also be combined.

Example:

```text
GET /api/templates?minPrice=10&maxPrice=50&sort=price&page=1&limit=5
```

This request:

1. Filters templates between $10 and $50.
2. Sorts the templates by price.
3. Returns page 1.
4. Limits the response to 5 records.

---

# MongoDB Relationships

The Customer model contains a reference to a Template:

```javascript
template: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Template"
}
```

Mongoose `populate()` is used to retrieve information about the associated template when customer records are requested.

---

# Error Handling

The API includes error handling for:

- Invalid requests
- Missing required fields
- Invalid MongoDB IDs
- Records that cannot be found
- MongoDB/database errors
- Invalid pagination values

HTTP status codes include:

- `200` - Successful request
- `201` - Resource successfully created
- `400` - Invalid request
- `404` - Resource not found
- `500` - Server/database error

---

# Postman Testing

Module 3.4 functionality was tested using Postman.

The following requests were tested successfully:

### Templates

1. Templates - Query Operators
2. Templates - Select Exclude
3. Templates - Sort
4. Templates - Pagination

### Customers

5. Customers - Query Operators
6. Customers - Select Exclude
7. Customers - Sort
8. Customers - Pagination

All requests returned successful `200 OK` responses.

---

# Module 3.4 Requirements Completed

- Two MongoDB query operators used on Templates GET ALL
- Two MongoDB query operators used on Customers GET ALL
- `select()` field exclusion on Templates
- `select()` field exclusion on Customers
- Sorting implemented
- Pagination implemented on Templates
- Pagination implemented on Customers
- Mongoose integration
- Error handling
- RESTful API endpoints
- Postman testing

---

# Author

**Jasmin Luckett**

Module 3.4 - API Query Data from MongoDB