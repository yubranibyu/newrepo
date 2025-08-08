const pool = require("../database/pool");
const bcrypt = require("bcrypt");

// Obtener cuenta por email
async function getAccountByEmail(email) {
  try {
    const result = await pool.query(
      `SELECT customer_id, first_name, last_name, email, account_type, password 
       FROM customers WHERE email = $1`,
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error en getAccountByEmail:", error);
    return null;
  }
}

// Registrar nuevo cliente
async function registerAccount(customerData) {
  try {
    const sql = `
      INSERT INTO customers (first_name, last_name, email, account_type, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING customer_id
    `;

    const values = [
      customerData.first_name,
      customerData.last_name,
      customerData.email,
      customerData.account_type, // CAMBIO: antes decía customerData.Customer
      customerData.password,     // Ya viene hasheada desde el controller
    ];

    const result = await pool.query(sql, values);
    return result.rows[0]; // Devuelve el cliente registrado
  } catch (error) {
    console.error("Error en registerAccount:", error);
    throw error;
  }
}

module.exports = {
  getAccountByEmail,
  registerAccount,
  bcrypt,
};
