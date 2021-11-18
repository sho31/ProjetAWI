const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.dbUSER,
  host: process.env.dbHOST,
  database: process.env.dbDATABASE,
  password: process.env.dbPASSWORD,
  port: process.env.dbPORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
