const router = require("express").Router()
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation.js")
const utilities = require("../utilities")

// Mostrar formulario de login
router.get("/login", async (req, res) => {
  let nav = await utilities.getNav()
  res.render("account/login", {
    title: "Login",
    nav,
    errors: null
  })
})

// Procesar login
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)
// Mostrar formulario de registro
router.get("/register", async (req, res) => {
  let nav = await utilities.getNav();
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  });
});

// Procesar registro
router.post(
  "/register",
  regValidate.registerRules(),
  regValidate.checkRegisterData,
  utilities.handleErrors(accountController.accountRegister)
);

// Página principal de la cuenta
router.get("/", utilities.checkJWTToken, accountController.accountManagement)

// Logout
router.get("/logout", accountController.logoutAccount)

module.exports = router
