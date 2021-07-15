import mysql from "mysql2/promise";

// This is a simple database connection test to prove you can connect to a persistent store for your application.
export default async (req, res) => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  const [rows] = await connection.query("SELECT 1 as value");
  connection.end();

  res.json({
    value: rows[0]["value"],
  });
};