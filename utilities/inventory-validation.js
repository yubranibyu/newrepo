const { body, validationResult } = require("express-validator");
const utilities = require("./");

const validate = {};

// Reglas para clasificación
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("El nombre de la clasificación es obligatorio.")
      .isAlpha()
      .withMessage("El nombre de la clasificación debe contener solo letras."),
  ];
};

// Reglas para inventario
validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .isLength({ min: 1 })
      .withMessage("La marca es obligatoria."),
    body("inv_model")
      .trim()
      .isLength({ min: 1 })
      .withMessage("El modelo es obligatorio."),
    body("inv_year")
      .trim()
      .isInt({ min: 1900, max: 2100 })
      .withMessage("El año debe ser un número válido entre 1900 y 2100."),
    body("inv_description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("La descripción es obligatoria."),
    body("inv_image")
      .trim()
      .isLength({ min: 1 })
      .withMessage("La ruta de la imagen es obligatoria."),
    body("inv_thumbnail")
      .trim()
      .isLength({ min: 1 })
      .withMessage("La ruta del thumbnail es obligatoria."),
    body("inv_price")
      .trim()
      .isFloat({ min: 0 })
      .withMessage("El precio debe ser un número positivo."),
    body("inv_miles")
      .trim()
      .isInt({ min: 0 })
      .withMessage("El kilometraje debe ser un número válido."),
    body("inv_color")
      .trim()
      .isLength({ min: 1 })
      .withMessage("El color es obligatorio."),
    body("classification_id")
      .trim()
      .isInt()
      .withMessage("La clasificación es obligatoria.")
  ];
};

// Función para validar resultados
validate.checkData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const nav = await utilities.getNav();

    // Sticky inputs
    const classificationList = await utilities.buildClassificationDropdown(req.body.classification_id);
    
    const itemData = req.body;
    res.render("inventory/add-inventory", {
      title: "Agregar Vehículo",
      nav,
      errors: errors.array(),
      classificationList,
      ...itemData,
    });
    return;
  }
  next();
};

module.exports = validate;
