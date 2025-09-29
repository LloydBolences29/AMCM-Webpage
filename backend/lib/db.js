const mysql = require ('mysql2/promise');

require("dotenv").config(); // <- ADD THIS LINE

let connection;

const connectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return connection;
};

module.exports = { connectToDatabase };