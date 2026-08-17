const Template = require("../models/Template");

// GET all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve templates.",
      error: error.message
    });
  }
};

// GET template by ID
exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: "Template not found."
      });
    }

    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({
      message: "Unable to retrieve template.",
      error: error.message
    });
  }
};

// POST create template
exports.createTemplate = async (req, res) => {
  try {
    const template = await Template.create(req.body);
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({
      message: "Unable to create template.",
      error: error.message
    });
  }
};

// PUT update template
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
        message: "Template not found."
      });
    }

    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({
      message: "Unable to update template.",
      error: error.message
    });
  }
};

// DELETE template
exports.deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);

    if (!template) {
      return res.status(404).json({
        message: "Template not found."
      });
    }

    res.status(200).json({
      message: "Template deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to delete template.",
      error: error.message
    });
  }
};