# Module Two API - Template Marketplace

## Student

**Jasmin Luckett**

## Project Overview

This project is a RESTful API built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**. The API manages a digital template marketplace using two related collections:

* **Templates**
* **Customers**

The project demonstrates full CRUD (Create, Read, Update, Delete) functionality while using MongoDB as the database.

---

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Postman
* Nodemon
* Dotenv
* CORS

---

## Database Collections

### Template

The Template collection stores information about digital templates available for purchase.

Properties:

* name (String)
* category (String)
* price (Number)
* isPremium (Boolean)

---

### Customer

The Customer collection stores customer information.

Properties:

* customerName (String)
* email (String)
* purchaseDate (Date)
* template (ObjectId Reference)

Each customer references a template using a MongoDB ObjectId, creating a **"has a" relationship**.

---

# API Endpoints

## Templates

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /api/templates     | Get all templates      |
| GET    | /api/templates/:id | Get one template by ID |
| POST   | /api/templates     | Create a template      |
| PUT    | /api/templates/:id | Update a template      |
| DELETE | /api/templates/:id | Delete a template      |

---

## Customers

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| GET    | /api/customers     | Get all customers      |
| GET    | /api/customers/:id | Get one customer by ID |
| POST   | /api/customers     | Create a customer      |
| PUT    | /api/customers/:id | Update a customer      |
| DELETE | /api/customers/:id | Delete a customer      |

---

# Installation

Install project dependencies:

```bash
npm install
```

Install Nodemon:

```bash
npm install --save-dev nodemon
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```text
MONGO_URI=mongodb://127.0.0.1:27017/templateMarketplace
PORT=3000
```

---

# Running the Project

Start the application:

```bash
npm run dev
```

The terminal should display:

```text
Server running on port 3000
MongoDB Connected
```

---

# Testing

All endpoints were tested using **Postman**.

CRUD operations completed for:

* Templates
* Customers

Operations tested:

* Create (POST)
* Read All (GET)
* Read by ID (GET)
* Update (PUT)
* Delete (DELETE)

---

# Project Structure

```text
module-two-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── customerController.js
│   └── templateController.js
│
├── models/
│   ├── Customer.js
│   └── Template.js
│
├── routes/
│   ├── customerRoutes.js
│   └── templateRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

# Author

**Jasmin Luckett**

Full Sail University

Web Development Program
