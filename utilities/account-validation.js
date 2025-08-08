// utilities/account-validation.js

const { body, validationResult } = require("express-validator")

/**
 * Reglas de validación para login
 */
function loginRules() {
  return [
    body("account_email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("account_password")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty."),
  ]
}

/**
 * Reglas de validación para registro
 */
function registerRules() {
  return [
    body("account_firstname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters."),
    body("account_lastname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters."),
    body("account_email")
      .trim()
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("account_password")
      .trim()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol."
      ),
  ]
}

/**
 * Middleware para verificar errores de validación
 */
function checkLoginData(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    // Puedes ajustar para que muestre errores en la vista login
    return res.status(400).render("account/login", {
      title: "Login",
      nav: req.nav, // o como estés pasando la navegación
      errors: errors.array(),
      account_email: req.body.account_email,
    })
  }
  next()
}

/**
 * Middleware para verificar errores en registro
 */
function checkRegisterData(req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).render("account/register", {
      title: "Register",
      nav: req.nav,
      errors: errors.array(),
      account_firstname: req.body.account_firstname,
      account_lastname: req.body.account_lastname,
      account_email: req.body.account_email,
    })
  }
  next()
}

module.exports = {
  loginRules,
  checkLoginData,
  registerRules,
  checkRegisterData,
}
