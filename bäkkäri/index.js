const express = require("express");
const app = express();
const port = 42070;
const cors = require("cors");
const { Pool } = require("pg");

app.use(cors());

app.get("/prices", (request, response) => {
  pool.query("SELECT * FROM hours", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

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
  user: "postgres",
  host: "localhost",
  database: "spot_price",
  password: "postgres",
  port: 5432,
});

async function fetchspot_pricedata() {
  const response = await fetch("https://api.spot-hinta.fi/TodayAndDayForward?region=FI");
  const jsonData = await response.json();

  await createTable();

  for (const item of jsonData) {
    const query = "INSERT into hours(Rank,DateTime,PriceNoTax,PriceWithTax) values($1,$2,$3,$4)" ;
    const values = [item.Rank, item.DateTime, item.PriceNoTax, item.PriceWithTax];

    await pool.query(query, values);
    //console.log('Inserted item:', item);
    
  }
} 

async function dropTable() {
  await pool.query(`DROP table hours`);
  console.log(`Table dropped.`);
}

async function createTable() {
  await pool.query("CREATE TABLE IF NOT EXISTS hours(ID SERIAL PRIMARY KEY,Rank INTEGER,DateTime TIMESTAMP,PriceNoTax decimal,PriceWithTax decimal);");
  console.log(`Table Created.`);
}


// On shutdown
/*
process.on("SIGINT", async () => {
  await dropTable();
  console.log(`Shutting server on port ${port}.`);
  process.exit(0);
});

*/
