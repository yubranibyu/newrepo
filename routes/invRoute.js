const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const invValidate = require("../utilities/inventory-validation");
const utilities = require("../utilities/");

// Management view
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

// Add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventory));

// Post classification
router.post(
  "/add-classification",
  invValidate.classificationRules(),
  invValidate.checkData, // ← este es el nombre correcto
  utilities.handleErrors(invController.insertClassification)
);

// Post inventory
router.post(
  "/add-inventory",
  invValidate.inventoryRules(),
  invValidate.checkData, // ← este también
  utilities.handleErrors(invController.insertInventory)
);

// Classification list view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Vehicle detail view
router.get("/detail/:invId", utilities.handleErrors(invController.buildDetailView));

module.exports = router;
