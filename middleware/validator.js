// middleware/validator.js
const { body, validationResult } = require("express-validator")

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.render("account/update", {
      title: "Update Account",
      account: req.body,
      errors: errors.array(),
      message: null,
    })
  }
  next()
}

const updateRules = [
  body("firstname").trim().notEmpty().withMessage("First name is required."),
  body("lastname").trim().notEmpty().withMessage("Last name is required."),
  body("email").isEmail().withMessage("A valid email is required."),
]

const passwordRules = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character."),
]

module.exports = { validate, updateRules, passwordRules }
