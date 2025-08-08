// middleware/auth.js
const jwt = require("jsonwebtoken")

// Verifica que el usuario tenga un JWT válido
function checkLogin(req, res, next) {
  const token = req.cookies.jwt
  if (!token) {
    return res.redirect("/account/login")
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    res.locals.account = payload
    next()
  } catch (err) {
    return res.redirect("/account/login")
  }
}

// Permite el acceso solo si el tipo de cuenta está autorizado
function checkAccountType(...allowedTypes) {
  return (req, res, next) => {
    const acct = res.locals.account
    if (!acct || !allowedTypes.includes(acct.account_type)) {
      return res.status(403).render("account/login", {
        error: "Acceso denegado",
      })
    }
    next()
  }
}

module.exports = { checkLogin, checkAccountType }
