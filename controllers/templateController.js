const Template = require("../models/Template");

// CREATE TEMPLATE
// POST /api/templates
exports.createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);

    res.status(201).json({
      message: "Template created successfully",
      data: template
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating template",
      error: error.message
    });
  }
};


// GET ALL TEMPLATES
// GET /api/templates
// Supports query operators, select, sort, and pagination
exports.getAllTemplates = async (req, res) => {
  try {
    const {
      minPrice,
      maxPrice,
      exclude,
      sort,
      page = 1,
      limit = 5
    } = req.query;

    const filter = {};

    // Mongo Query Operators: $gte and $lte
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    // Basic validation
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

    let query = Template.find(filter);

    // SELECT / EXCLUDE FIELDS
    // Example: ?exclude=__v,isPremium
    if (exclude) {
      const excludedFields = exclude
        .split(",")
        .map((field) => `-${field.trim()}`)
        .join(" ");

      query = query.select(excludedFields);
    }

    // SORT
    // Example: ?sort=price
    // Example descending: ?sort=-price
    if (sort) {
      query = query.sort(sort);
    }

    // PAGINATION
    const skipAmount = (pageNumber - 1) * limitNumber;

    query = query
      .skip(skipAmount)
      .limit(limitNumber);

    const templates = await query;

    const total = await Template.countDocuments(filter);

    res.status(200).json({
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
      data: templates
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving templates",
      error: error.message
    });
  }
};


// GET TEMPLATE BY ID
// GET /api/templates/:id
exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: "Template not found"
      });
    }

    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving template",
      error: error.message
    });
  }
};


// UPDATE TEMPLATE
// PUT /api/templates/:id
exports.updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!template) {
      return res.status(404).json({
        message: "Template not found"
      });
    }

    res.status(200).json({
      message: "Template updated successfully",
      data: template
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating template",
      error: error.message
    });
  }
};


// DELETE TEMPLATE
// DELETE /api/templates/:id
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: "Template not found"
      });
    }

    res.status(200).json({
      message: "Template deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting template",
      error: error.message
    });
  }
};