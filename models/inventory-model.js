const pool = require("../database")

/* ***************************
 *  Get all classifications
 * ************************** */
async function getClassifications() {
  try {
    return await pool.query(
      `SELECT * FROM classification ORDER BY classification_name`
    )
  } catch (error) {
    console.error("getClassifications error: ", error)
    throw error
  }
}

/* ***************************
 *  Get inventory by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    return await pool.query(
      `SELECT * FROM inventory 
       WHERE classification_id = $1`,
      [classification_id]
    )
  } catch (error) {
    console.error("getInventoryByClassificationId error: ", error)
    throw error
  }
}

/* ***************************
 *  Get inventory item by inv_id
 * ************************** */
async function getInventoryById(inv_id) {
  try {
    const data = await pool.query(
      `SELECT i.*, c.classification_name
       FROM inventory AS i
       JOIN classification AS c
         ON i.classification_id = c.classification_id
       WHERE inv_id = $1`,
      [inv_id]
    )
    return data
  } catch (error) {
    console.error("getInventoryById error: ", error)
    throw error
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getInventoryById
}
