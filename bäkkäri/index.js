const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 42070;
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "spot_price",
  password: "postgres",
  port: 5432,
});

fetchspot_pricedata();

async function fetchspot_pricedata() {
  const response = await fetch("https://api.spot-hinta.fi/Today?region=FI");

  const jsonData = await response.json();

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
          pool.query("Drop table hours", (error, results) => {
            pool.query(
              "CREATE TABLE hours (ID SERIAL PRIMARY KEY,Rank INTEGER,DateTime VARCHAR(100),PriceNoTax decimal,PriceWithTax decimal);"
            );
            pool.query(
              "INSERT into hours(ID,Rank,datetime,pricenotax,pricewithtax) values($1,$2,$3,$4,$5)",
              [
                i,
                jsonData[i].Rank,
                jsonData[i].DateTime,
                jsonData[i].PriceNoTax,
                jsonData[i].PriceWithTax,
              ]
            );
          });
        }
      }
    );
  }
}

app.get("/prices", (request, response) => {
  pool.query("SELECT * FROM hours ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});
