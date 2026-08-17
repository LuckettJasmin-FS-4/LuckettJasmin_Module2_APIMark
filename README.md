# Module Two API - Template Marketplace

## Student

Jasmin Luckett

---

## Project Overview

This project is a REST API built with Node.js, Express, MongoDB, and Mongoose. It manages a Template Marketplace using two related collections:

- Templates
- Customers

Customers have a relationship with Templates through a MongoDB ObjectId reference.

---

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman
- Nodemon
- dotenv

---

## Database Models

### Template

Properties:

- name (String)
- category (String)
- price (Number)
- isPremium (Boolean)

### Customer

Properties:

- customerName (String)
- email (String)
- purchaseDate (Date)
- template (ObjectId reference to Template)

---

## Relationship

A Customer purchases one Template.

The relationship is created using:

```javascript
template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template"
}
```

Mongoose's `populate()` method is used to return the full Template information when retrieving Customers.

---

## API Endpoints

### Templates

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/templates | Create Template |
| GET | /api/templates | Get All Templates |
| GET | /api/templates/:id | Get Template by ID |
| PUT | /api/templates/:id | Update Template |
| DELETE | /api/templates/:id | Delete Template |

---

### Customers

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/customers | Create Customer |
| GET | /api/customers | Get All Customers |
| GET | /api/customers/:id | Get Customer by ID |
| PUT | /api/customers/:id | Update Customer |
| DELETE | /api/customers/:id | Delete Customer |

---

## Features

- Full CRUD operations for both collections
- MongoDB Atlas database
- Mongoose schemas and validation
- Relationship using ObjectId
- populate() to display Template information inside Customer documents
- select() used to remove the __v field from responses
- Centralized messages module for reusable response messages
- Error handling with proper HTTP status codes
- Object existence validation before updating or deleting

---

## Testing

All endpoints were tested using Postman.

Completed testing includes:

### Templates

- Create
- Get All
- Get by ID
- Update
- Delete

### Customers

- Create
- Get All
- Get by ID
- Update
- Delete

Integration tests were created in Postman for all CRUD operations.

---

## MongoDB

The API connects successfully to MongoDB using Mongoose.

Customers reference Templates using MongoDB ObjectIds.

MongoDB Compass was used to verify stored documents and relationships.

---

## Running the Project

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

## Author

Jasmin Luckett

Full Sail University

Web Development Program