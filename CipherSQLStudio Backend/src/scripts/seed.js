const mongoose = require("mongoose");
const { Pool } = require("pg");
const Table = require("../models/tableModel");


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cipher_sql_studio",
  password: "vijay@2004",
  port: 5432,
});

mongoose.connect("mongodb://localhost:27017/CipherSQLStudio")

const getAllTables = async () => {
  const result = await pool.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
  `);

  return result.rows.map(row => row.table_name);
};

const getColumns = async (tableName) => {
  const result = await pool.query(`
    SELECT column_name, data_type
    FROM information_schema.columns
    WHERE table_name = $1
  `, [tableName]);

  return result.rows;
};

const seedTables = async () => {
  try {
    const tables = await getAllTables();

    for (let tableName of tables) {

      const columns = await getColumns(tableName);

      await Table.create({
        table_name: tableName,
        columns: columns
      });

      console.log(`Inserted: ${tableName}`);
    }

    console.log("Seeding completed.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTables();