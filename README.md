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
Module 3.4 - API Query Data from MongoD
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
## Module 3.6 – Unit Testing the API

### Overview

For this assignment, I added Jest unit tests to test the query operator functionality of the Templates API. The tests verify filtering and field selection, pagination, and sorting.

The Template model is mocked using Jest so the unit tests can run without depending on the live MongoDB database.

### Unit Tests

The test suite contains **6 tests** organized into three groups.

#### Query Operators and Select

* Tests filtering templates using `minPrice` and `maxPrice`.
* Tests excluding fields using the `exclude` query string.
* Verifies that `__v` and `isPremium` can be excluded from the returned data.

#### Pagination

* Tests the `skip()` and `limit()` functionality.
* Verifies the correct skip amount for page 2 with a limit of 2.
* Verifies the correct skip amount for page 3 with a limit of 5.

#### Sorting

* Tests sorting templates by price in ascending order using `sort=price`.
* Tests sorting templates by price in descending order using `sort=-price`.

### Mocking

The Template model is mocked with Jest:

`jest.mock("../models/Template");`

Mocking allows the controller logic to be tested without making requests to the actual MongoDB database.

### Running the Tests

Run all Jest tests with:

`npm test`

The completed test suite currently produces:

* **Test Suites:** 1 passed, 1 total
* **Tests:** 6 passed, 6 total
* **Snapshots:** 0 total

### Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* Jest
* Supertest

### Assignment Requirements Completed

* Query operator testing
* Select/exclude field testing
* Pagination testing with `skip()` and `limit()`
* Ascending sort testing
* Descending sort testing
* Mocked model testing
* Six passing Jest unit tests

# Module 4 - ReactJS and NodeJS Full-Stack Application

## Template Marketplace

This project is a full-stack Template Marketplace application created using ReactJS, NodeJS, Express, MongoDB, Mongoose, and Axios.

The application builds on the Template and Customer collections created in previous assignments. The React frontend communicates with the NodeJS/Express backend API and allows users to view and modify information stored in MongoDB.

## Technologies Used

### Frontend

* ReactJS
* Vite
* Axios
* JavaScript
* CSS

### Backend

* NodeJS
* Express
* MongoDB
* Mongoose
* CORS
* dotenv

### Development Tools

* Visual Studio Code
* MongoDB
* Postman
* Git
* GitHub

## Application Features

### Templates

The Template Marketplace supports full CRUD functionality.

* Create new templates
* Read and display templates from MongoDB
* Update existing templates
* Delete templates
* Navigate template records using pagination
* Mark templates as premium or non-premium

Each template contains:

* Template name
* Category
* Price
* Premium status

### Customers

The Customer section also supports full CRUD functionality.

* Create new customers
* Read and display customers
* Update existing customers
* Delete customers
* Associate a customer with a template
* Display customer purchase information

Demo customer information uses fictional names and `example.com` email addresses.

## Full-Stack Architecture

The application uses the following structure:

**React Client → Axios → NodeJS/Express API → MongoDB**

React manages the user interface and application state.

Axios sends HTTP requests from the React client to the Express API.

Express handles the API routes and communicates with MongoDB through Mongoose.

MongoDB stores the Template and Customer collections.

## API Endpoints

### Templates

* `GET /api/templates` - Get templates
* `GET /api/templates/:id` - Get a template by ID
* `POST /api/templates` - Create a template
* `PUT /api/templates/:id` - Update a template
* `DELETE /api/templates/:id` - Delete a template

The Templates API also supports query operators, field selection, sorting, and pagination.

### Customers

* `GET /api/customers` - Get customers
* `GET /api/customers/:id` - Get a customer by ID
* `POST /api/customers` - Create a customer
* `PUT /api/customers/:id` - Update a customer
* `DELETE /api/customers/:id` - Delete a customer

The Customers API also supports query operators, field selection, sorting, pagination, and template population.

## React State Management

React's `useState` hook is used to manage:

* Template data
* Customer data
* Form input
* Edit state
* Pagination
* Total pages

The `useEffect` hook is used to retrieve data from the backend when the application loads and when the template page changes.

After Create, Update, or Delete operations, the client retrieves the updated information from the API so the interface reflects the current MongoDB data.

## Project Structure

```text
module-two-api/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   └── package.json
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
├── tests/
├── server.js
├── package.json
└── README.md
```

## Running the Application

### Start the Backend

From the main project directory:

```bash
npm install
npm run dev
```

The NodeJS/Express server runs on:

```text
http://localhost:3000
```

### Start the React Client

Open another terminal and navigate to the client:

```bash
cd client
npm install
npm run dev
```

The React application runs on:

```text
http://localhost:5173
```

Both the backend and frontend must be running for the full-stack application to work.

## Database

MongoDB is used to store the application's Template and Customer collections.

Mongoose is used to define the models and communicate between the Express backend and MongoDB.

The Customer collection references the Template collection using a Mongoose ObjectId relationship.

## Assignment Requirements Demonstrated

This project demonstrates:

* ReactJS client development
* NodeJS and Express server development
* MongoDB database integration
* Axios API integration
* React state management
* Modular project organization
* Full CRUD functionality
* Multiple MongoDB collections
* Mongoose relationships
* Pagination
* Query operators
* Sorting
* Field selection
* Error handling

## Author

Jasmin Luckett

Full Sail University
Module 4 - ReactJS and NodeJS Assignment


# Author

**Jasmin Luckett**

