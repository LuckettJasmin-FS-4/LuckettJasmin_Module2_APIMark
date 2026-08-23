const express = require("express");
const router = express.Router();

const {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate
} = require("../controllers/templateController");

router.post("/", createTemplate);

router.get("/", getAllTemplates);

router.get("/:id", getTemplateById);

router.put("/:id", updateTemplate);

router.delete("/:id", deleteTemplate);

module.exports = router;