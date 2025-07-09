/// ******************************************
// This is the application server
// ******************************************

const express = require("express")
const engine = require("ejs-mate")
const path = require("path")

const app = express()

// Configure EJS-Mate as the view engine
app.engine("ejs", engine)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// OPTIONAL: define your main layout
app.set("layout", "./layouts/layout")

// ******************************************
// Static files middleware
// ******************************************

// ✅ The simplest way (directly here)
app.use(express.static(path.join(__dirname, "public")))

// Or you could use your separate static routes file
// const staticRoutes = require('./routes/static')
// app.use(staticRoutes)

// ******************************************
// Routes
// ******************************************

app.get("/", (req, res) => {
  res.render("index", { title: "Home" })
})

// ******************************************
// Server host name and port
// ******************************************
const HOST = "localhost"
const PORT = 5500

app.listen(PORT, () => {
  console.log(`trial app listening on http://${HOST}:${PORT}`)
})
