const invModel = require("../models/inventory-model")

/* ===== Build Navigation Bar ===== */
async function getNav() {
  const data = await invModel.getClassifications()
  let nav = "<ul>"
  nav += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    nav += `<li><a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles">${row.classification_name}</a></li>`
  })
  nav += "</ul>"
  return nav
}

/* ===== Build Classification Grid ===== */
function buildClassificationGrid(data) {
  let grid = "<ul id='inv-display'>"
  data.forEach((vehicle) => {
    grid += `<li>
      <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
        <img src="/images/vehicles/${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
      </a>
      <div class="namePrice">
        <h2>
          <a href="/inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            ${vehicle.inv_make} ${vehicle.inv_model}
          </a>
        </h2>
        <span>$${new Intl.NumberFormat("en-US").format(vehicle.inv_price)}</span>
      </div>
    </li>`
  })
  grid += "</ul>"
  return grid
}

/* ===== Build Classification Drop-down (select) ===== */
async function buildClassificationList(selectedId = null) {
  const data = await invModel.getClassifications()
  let list = `<select id="classification_id" name="classification_id" required>`
  list += `<option value="">-- Select Classification --</option>`
  data.rows.forEach((row) => {
    list += `<option value="${row.classification_id}"${selectedId == row.classification_id ? " selected" : ""}>${row.classification_name}</option>`
  })
  list += `</select>`
  return list
}

/* ===== Error Handler Wrapper ===== */
function handleErrors(fn) {
  return async function (req, res, next) {
    try {
      await fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = {
  getNav,
  buildClassificationGrid,
  buildClassificationList, // ← ✅ Nueva función añadida
  handleErrors,
}
