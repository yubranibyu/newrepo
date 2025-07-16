// ******************************************
// This is the application server
// ******************************************

const express = require("express")
const engine = require("ejs-mate")
const path = require("path")

const baseController = require("./controllers/baseController") // 
const invRoute = require("./routes/invRoute")

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

app.use(express.static(path.join(__dirname, "public")))
app.use("/inv", invRoute)

// ******************************************
// Routes
// ******************************************

app.get("/", baseController.buildHome) // 

// ******************************************
// Server host name and port
// ******************************************
const HOST = "localhost"
const PORT = 5500

app.listen(PORT, () => {
  console.log(`trial app listening on http://${HOST}:${PORT}`)
})
