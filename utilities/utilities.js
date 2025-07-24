const pool = require("../database/pool");

async function getNav() {
  const data = await pool.query("SELECT * FROM classification ORDER BY classification_name");
  let nav = "<ul>";
  nav += `<li><a href="/" title="Home page">Home</a></li>`;
  data.rows.forEach(row => {
    nav += `<li><a href="/inv/type/${row.classification_id}" title="See our ${row.classification_name} product line">${row.classification_name}</a></li>`;
  });
  nav += "</ul>";
  return nav;
}

function buildClassificationGrid(data) {
  let grid = '<div class="vehicle-grid">';
  data.forEach(vehicle => {
    grid += `
      <div class="vehicle-card">
        <a href="/inv/detail/${vehicle.inv_id}">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
        </a>
        <h2>
          <a href="/inv/detail/${vehicle.inv_id}">
            ${vehicle.inv_make} ${vehicle.inv_model}
          </a>
        </h2>
        <span>$${new Intl.NumberFormat().format(vehicle.inv_price)}</span>
      </div>
    `;
  });
  grid += '</div>';
  return grid;
}

function handleErrors(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { getNav, buildClassificationGrid, handleErrors };
