const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkJWT(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    req.flash("notice", "Please log in.");
    return res.redirect("/account/login");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.loggedin = true;
    res.locals.accountId = payload.account_id;
    res.locals.accountType = payload.account_type;
    res.locals.firstname = payload.firstname;
    next();
  } catch (err) {
    req.flash("notice", "Session expired. Please log in again.");
    res.clearCookie("jwt");
    return res.redirect("/account/login");
  }
}

module.exports = checkJWT;
