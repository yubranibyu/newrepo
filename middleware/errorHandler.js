function errorHandler(err, req, res, next) {
  console.error(err.stack)
  res.status(500).render("errors/error", {
    title: "Server Error",
    message: "Something went wrong!",
    nav: "", // Opcional: puedes usar getNav() si quieres
  })
}

module.exports = errorHandler
// 