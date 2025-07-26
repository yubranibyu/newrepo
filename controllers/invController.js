const invModel = require("../models/inventory-model");
const utilities = require("../utilities");
const { validationResult } = require("express-validator")

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

// Nueva vista: Management
invController.buildManagementView = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
    message: req.flash("message")
  })
}

// Formulario agregar clasificación
invController.buildAddClassification = async function (req, res) {
  const nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  })
}

// Formulario agregar inventario
invController.buildAddInventory = async function (req, res) {
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList()
  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav,
    classificationList,
    errors: null,
    data: {}
  })
}

// Insertar nueva clasificación
invController.insertClassification = async function (req, res) {
  const { classification_name } = req.body
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const nav = await utilities.getNav()
    return res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: errors.array(),
    })
  }

  const result = await invModel.addClassification(classification_name)
  if (result) {
    req.flash("message", "Classification added successfully.")
    return res.redirect("/inv")
  } else {
    const nav = await utilities.getNav()
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav,
      errors: [{ msg: "Failed to add classification." }],
    })
  }
}

// Insertar nuevo vehículo
invController.insertInventory = async function (req, res) {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body

  const errors = validationResult(req)
  const nav = await utilities.getNav()
  const classificationList = await utilities.buildClassificationList(classification_id)

  if (!errors.isEmpty()) {
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: errors.array(),
      data: req.body,
    })
  }

  const result = await invModel.addInventoryItem(
    classification_id, inv_make, inv_model, inv_year,
    inv_description, inv_image, inv_thumbnail,
    inv_price, inv_miles, inv_color
  )

  if (result) {
    req.flash("message", "Inventory item added successfully.")
    return res.redirect("/inv")
  } else {
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav,
      classificationList,
      errors: [{ msg: "Failed to add inventory item." }],
      data: req.body,
    })
  }
}

module.exports = invController;
