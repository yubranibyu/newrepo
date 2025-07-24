const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

const invController = {};



invController.buildByClassificationId = async function (req, res) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data.rows);
  const nav = await utilities.getNav();
  const className = data.rows.length > 0 ? data.rows[0].classification_name : "No Vehicles";
  
  res.render("inventory/classification", {
    title: `${className} vehicles`,
    nav,
    grid,
  });
};

invController.buildDetailView = async function (req, res) {
  const invId = req.params.invId;
  const data = await invModel.getInventoryById(invId);
  const vehicle = data.rows[0];
  const nav = await utilities.getNav();
  
  res.render("inventory/detail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicle,
  });
};

module.exports = invController;
