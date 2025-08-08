// Required modules
const express = require("express")
const path = require("path")
const session = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()

const cookieParser = require("cookie-parser")
const utilities = require("./utilities")

// Importar rutas
const accountRoute = require("./routes/accountRoute") // <-- Aquí la importación que faltaba

// Declare app BEFORE using it
const app = express()

// Middleware to parse cookies (must be before routes)
app.use(cookieParser())

// Middleware to check JWT token validity for every request
app.use(utilities.checkJWTToken)

// View engine setup using ejs-mate
const engine = require("ejs-mate")
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Serve static assets
app.use(express.static(path.join(__dirname, "public")))

// Middleware to parse incoming form data
app.use(express.urlencoded({ extended: true }))

// Session configuration
app.use(
  session({
    secret: "superSecret", // Cambia a un secreto seguro en producción
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Cambia a true si usas HTTPS en producción
  })
)

// Flash messages middleware
app.use(flash())

// Global middleware to provide flash messages and nav to views
app.use(async (req, res, next) => {
  res.locals.message = req.flash("message")
  res.locals.nav = await utilities.getNav()
  next()
})

// Controllers and routes
const baseController = require("./controllers/baseController")
const invRoute = require("./routes/invRoute")

// Routes
app.get("/", baseController.buildHome)
app.use("/inv", invRoute)
app.use("/account", accountRoute) // <-- Aquí ya puedes usar la ruta /account

// 404 Not Found handler
app.use(async (req, res) => {
  res.status(404).render("errors/error", {
    title: "404 Not Found",
    message: "The page you are looking for does not exist.",
    nav: res.locals.nav,
  })
})

// 500 Server Error handler
app.use(async (err, req, res, next) => {
  console.error("🔥 ERROR:", err)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: err.message || "Oops! Something went wrong.",
    nav: res.locals.nav,
  })
})

// Start the server
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`🚀 App listening on http://localhost:${PORT}`)
})

