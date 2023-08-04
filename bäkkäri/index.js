const express = require("express");
const app = express();
const port = 42070;
var cors = require("cors");
const Pool = require("pg").Pool;

app.use(cors());

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  fetchspot_pricedata();
  console.log(`App running on port ${port}.`);
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "spot_price",
  password: "postgres",
  port: 5432,
});

async function fetchspot_pricedata() {
  const response = await fetch("https://api.spot-hinta.fi/Today?region=FI");
  const jsonData = await response.json();

  pool.query(
    "CREATE TABLE IF NOT EXISTS hours(ID SERIAL PRIMARY KEY,Rank INTEGER,DateTime VARCHAR(100),PriceNoTax decimal,PriceWithTax decimal);"
  );

  for (let i = 0; i < jsonData.length; i++) {
    pool.query(
      "INSERT into hours(ID,Rank,datetime,pricenotax,pricewithtax) values($1,$2,$3,$4,$5)",
      [
        i,
        jsonData[i].Rank,
        jsonData[i].DateTime,
        jsonData[i].PriceNoTax,
        jsonData[i].PriceWithTax,
      ],
      (error, results) => {
        if (error) {
        }
      }
    );
  }
}

app.get("/prices", (request, response) => {
  pool.query("SELECT * FROM hours", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
