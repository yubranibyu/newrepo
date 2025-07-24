// Required modules
const express = require("express")
const app = express()
const path = require("path")
require("dotenv").config()

// View engine setup using ejs-mate
const engine = require("ejs-mate")
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"));

// Middleware
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

// Routes
const staticRoutes = require("./routes/static")
const invRoutes = require("./routes/invRoute")

app.use("/", staticRoutes)
app.use("/inv", invRoutes)

// Base controller
const baseController = require("./controllers/baseController")
app.get("/", baseController.buildHome)

// Error handling middleware
app.use(async (err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack)

  const nav = await require("./utilities/").getNav()
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: err.message,
    nav,
  })
})

const PORT = process.env.PORT || 10000
const HOST = "0.0.0.0"

app.listen(PORT, HOST, () => {
  console.log(`🚗:) CSE Motors app listening on http://${HOST}:${PORT}`)
})
