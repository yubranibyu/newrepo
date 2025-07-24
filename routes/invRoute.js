const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities");

router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:invId", utilities.handleErrors(invController.buildDetailView));

module.exports = router;
