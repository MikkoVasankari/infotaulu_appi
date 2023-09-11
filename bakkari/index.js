const express = require("express");
const app = express();
const port = 42070;
const cors = require("cors");
const { Pool } = require("pg");
require('dotenv').config();

app.use(cors());

app.listen(port, async () => {
  fetchspot_pricedata();
  console.log(`App running on port ${port}.`);

  process.on("SIGINT", async () => {
    await dropTable();
    console.log(`Shutting server on port ${port}.`);
    process.exit(0);
  });
});

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

async function fetchspot_pricedata() {
  const response = await fetch("https://api.spot-hinta.fi/TodayAndDayForward?region=FI");
  const jsonData = await response.json();

  await createTable();

  for (const item of jsonData) {
    const query = "INSERT into hours(Rank,DateTime,PriceNoTax,PriceWithTax) values($1,$2,$3,$4)";
    const values = [item.Rank, item.DateTime, item.PriceNoTax, item.PriceWithTax];

    await pool.query(query, values);
    
  }
} 

async function dropTable() {
  await pool.query(`DROP table hours`);
  console.log(`Table dropped.`);
}

async function createTable() {
  await pool.query("CREATE TABLE IF NOT EXISTS hours(ID SERIAL PRIMARY KEY,Rank INTEGER,DateTime varchar(50),PriceNoTax decimal,PriceWithTax decimal);");
  console.log(`Table Created.`);
}

app.get("/prices", (request, response) => {
  pool.query("select * from hours;", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});


// On shutdown
/*
process.on("SIGINT", async () => {
  await dropTable();
  console.log(`Shutting server on port ${port}.`);
  process.exit(0);
});

*/
