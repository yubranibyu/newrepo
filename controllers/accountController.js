const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accountModel = require("../models/accountModel");
const utilities = require("../utilities");

/* Login */
/* Login */
async function accountLogin(req, res) {
  let nav = await utilities.getNav();
  const { account_email, account_password } = req.body; // 🔹 ahora coincide con la vista

  const user = await accountModel.getAccountByEmail(account_email);
  if (!user) {
    req.flash("notice", "Email not found.");
    return res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      email: account_email,
    });
  }

  try {
    const match = await bcrypt.compare(account_password, user.password);
    if (match) {
      delete user.password;

      const accessToken = jwt.sign(
        {
          customer_id: user.customer_id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          account_type: user.account_type,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600000,
      });

      return res.redirect("/account/");
    } else {
      req.flash("notice", "Incorrect password.");
      return res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        email: account_email,
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send("Internal Server Error");
  }
}


/* Vista principal */
async function accountManagement(req, res) {
  const nav = await utilities.getNav();
  res.render("account/index", {
    title: "Account Management",
    nav,
  });
}

/* Registro */
async function accountRegister(req, res) {
  let nav = await utilities.getNav();
  const {
    account_firstname,
    account_lastname,
    account_email,
    account_password,
  } = req.body;

  console.log("Datos del formulario:", req.body); // Ayuda para debug

  try {
    const hashedPassword = await bcrypt.hash(account_password, 10);

    const regResult = await accountModel.registerAccount({
      first_name: account_firstname,
      last_name: account_lastname,
      email: account_email,
      password: hashedPassword,
      account_type: "Customer", 
    });

    if (regResult) {
      req.flash("message", "Registration successful! Please login.");
      return res.redirect("/account/login");
    } else {
      req.flash("message", "Registration failed. Please try again.");
      return res.status(500).render("account/register", {
        title: "Register",
        nav,
        errors: null,
        account_firstname,
        account_lastname,
        account_email,
      });
    }
  } catch (error) {
    console.error("Registration error: ", error);
    return res.status(500).render("account/register", {
      title: "Register",
      nav,
      errors: [{ msg: "Server error, please try again later." }],
      account_firstname,
      account_lastname,
      account_email,
    });
  }
}

/* Logout */
function logoutAccount(req, res) {
  res.clearCookie("jwt");
  req.flash("notice", "You have been logged out.");
  res.redirect("/");
}

module.exports = {
  accountLogin,
  accountManagement,
  logoutAccount,
  accountRegister,
};
