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

module.exports = {
  getInventoryByClassificationId,
  getInventoryById,
  getClassifications
}
