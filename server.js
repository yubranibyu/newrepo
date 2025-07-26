// Required modules
const express = require("express")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()

const app = express()

// View engine setup using ejs-mate
const engine = require("ejs-mate")
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Static assets
app.use(express.static(path.join(__dirname, "public")))

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }))

// Session configuration
app.use(
  session({
    secret: "superSecret", // Usa un secreto seguro en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // true si usas HTTPS
  })
)

// Flash messages
app.use(flash())

// Middleware global para flash y navegación
app.use(async (req, res, next) => {
  res.locals.message = req.flash("message")
  const utilities = require("./utilities")
  res.locals.nav = await utilities.getNav()
  next()
})

// Routes
const baseController = require("./controllers/baseController")
const invRoute = require("./routes/invRoute")

app.get("/", baseController.buildHome)
app.use("/inv", invRoute)

// 404 Not Found
app.use(async (req, res) => {
  res.status(404).render("errors/error", {
    title: "404 Not Found",
    message: "The page you are looking for does not exist.",
    nav: res.locals.nav,
  })
})

// 500 Server Error
app.use(async (err, req, res, next) => {
  console.error("🔥 ERROR:", err)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: err.message || "Oops! Something went wrong.",
    nav: res.locals.nav,
  })
})

// Start server
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`🚀 App listening on http://localhost:${PORT}`)
})
