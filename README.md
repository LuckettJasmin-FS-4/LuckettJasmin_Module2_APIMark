# Module Two API – Template Marketplace

## Student

**Jasmin Luckett**

---

# Project Overview

This project is a RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

The API simulates a digital **Template Marketplace** where customers can purchase downloadable templates.

The project demonstrates complete CRUD (Create, Read, Update, Delete) functionality using MongoDB and Mongoose.

---

# Technologies Used

- Node.js
- Express.js
- MongoDB
- MongoDB Compass
- Mongoose
- Postman
- Nodemon
- dotenv

---

# Project Structure

```
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
├── server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
└── Module2_Template_Integration_Tests.postman_collection.json
```

---

# Database Collections

## Templates

Stores information about digital templates.

Properties:

- name (String)
- category (String)
- price (Number)
- isPremium (Boolean)

---

## Customers

Stores customer information.

Properties:

- customerName (String)
- email (String)
- purchaseDate (Date)
- template (ObjectId reference)

The Customer model has a relationship with the Template model through a MongoDB ObjectId reference.

---

# API Endpoints

## Templates

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/templates | Get all templates |
| GET | /api/templates/:id | Get template by ID |
| POST | /api/templates | Create template |
| PUT | /api/templates/:id | Update template |
| DELETE | /api/templates/:id | Delete template |

---

## Customers

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /api/customers | Get all customers |
| GET | /api/customers/:id | Get customer by ID |
| POST | /api/customers | Create customer |
| PUT | /api/customers/:id | Update customer |
| DELETE | /api/customers/:id | Delete customer |

---

# Testing

All API endpoints were tested using **Postman**.

Integration tests include:

- POST
- GET All
- GET by ID
- PUT by ID
- DELETE by ID

Each endpoint contains three meaningful tests that verify:

- HTTP Status Codes
- Returned JSON data
- Response payload values

**15 Integration Tests Passed**

---

# MongoDB

MongoDB is connected using Mongoose.

The application stores all data inside the **templateMarketplace** database.

Collections:

- templates
- customers

---

# Running the Project

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run dev
```

Server:

```
http://localhost:3000
```

---

# Author

Jasmin Luckett

Full Sail University

Node.js Module Two Assignment