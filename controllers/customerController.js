const Customer = require("../models/Customer");

// GET all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate("template");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve customers.",
      error: error.message
    });
  }
};

// GET customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate("template");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found."
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve customer.",
      error: error.message
    });
  }
};

// POST create customer
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create customer.",
      error: error.message
    });
  }
};

// PUT update customer
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found."
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({
      message: "Unable to update customer.",
      error: error.message
    });
  }
};

// DELETE customer
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found."
      });
    }

    res.status(200).json({
      message: "Customer deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete customer.",
      error: error.message
    });
  }
};