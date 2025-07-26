const pool = require("../database/pool")

async function getInventoryByClassificationId(classification_id) {
  return pool.query(`
    SELECT * FROM inventory 
    AS i 
    JOIN classification AS c 
    ON i.classification_id = c.classification_id 
    WHERE i.classification_id = $1`, [classification_id])
}

async function getInventoryById(invId) {
  return pool.query("SELECT * FROM inventory WHERE inv_id = $1", [invId])
}

async function getClassifications() {
  return pool.query("SELECT * FROM classification ORDER BY classification_name")
}
async function addClassification(classification_name) {
  try {
    const sql = "INSERT INTO public.classification (classification_name) VALUES ($1)"
    const result = await pool.query(sql, [classification_name])
    return result.rowCount
  } catch (error) {
    throw new Error(error)
  }
}
async function addInventoryItem(
  classification_id, inv_make, inv_model, inv_year,
  inv_description, inv_image, inv_thumbnail,
  inv_price, inv_miles, inv_color
) {
  const sql = `
    INSERT INTO inventory (
      classification_id, inv_make, inv_model, inv_year, 
      inv_description, inv_image, inv_thumbnail, 
      inv_price, inv_miles, inv_color
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  `
  const data = [
    classification_id, inv_make, inv_model, inv_year,
    inv_description, inv_image, inv_thumbnail,
    inv_price, inv_miles, inv_color
  ]
  const result = await pool.query(sql, data)
  return result.rowCount
}


module.exports = {
  getInventoryByClassificationId,
  getInventoryById,
  getClassifications,
  addClassification,
  addInventoryItem
}
