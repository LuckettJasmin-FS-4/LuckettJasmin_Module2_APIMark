const Customer = require("../models/Customer");

// CREATE CUSTOMER
// POST /api/customers
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json({
      message: "Customer created successfully",
      data: customer
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating customer",
      error: error.message
    });
  }
};


// GET ALL CUSTOMERS
// GET /api/customers
// Supports query operators, select, sort, pagination, and populate
exports.getAllCustomers = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      exclude,
      sort,
      page = 1,
      limit = 5
    } = req.query;

    const filter = {};

    // Mongo Query Operators: $gte and $lte
    if (startDate !== undefined || endDate !== undefined) {
      filter.purchaseDate = {};

      if (startDate !== undefined) {
        filter.purchaseDate.$gte = new Date(startDate);
      }

      if (endDate !== undefined) {
        filter.purchaseDate.$lte = new Date(endDate);
      }
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      pageNumber < 1 ||
      limitNumber < 1 ||
      Number.isNaN(pageNumber) ||
      Number.isNaN(limitNumber)
    ) {
      return res.status(400).json({
        message: "Page and limit must be positive numbers."
      });
    }

    let query = Customer.find(filter).populate("template");

    // SELECT / EXCLUDE
    // Example: ?exclude=__v,purchaseDate
    if (exclude) {
      const excludedFields = exclude
        .split(",")
        .map((field) => `-${field.trim()}`)
        .join(" ");

      query = query.select(excludedFields);
    }

    // SORT
    // Example: ?sort=purchaseDate
    // Descending: ?sort=-purchaseDate
    if (sort) {
      query = query.sort(sort);
    }

    // PAGINATION
    const skipAmount = (pageNumber - 1) * limitNumber;

    query = query
      .skip(skipAmount)
      .limit(limitNumber);

    const customers = await query;

    const total = await Customer.countDocuments(filter);

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      data: customers
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving customers",
      error: error.message
    });
  }
};


// GET CUSTOMER BY ID
// GET /api/customers/:id
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate("template");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving customer",
      error: error.message
    });
  }
};


// UPDATE CUSTOMER
// PUT /api/customers/:id
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    ).populate("template");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      data: customer
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating customer",
      error: error.message
    });
  }
};


// DELETE CUSTOMER
// DELETE /api/customers/:id
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting customer",
      error: error.message
    });
  }
};