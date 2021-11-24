require("dotenv").config();
const Pool  = require("pg").Pool;

const pool = new Pool({
  user: process.env.dbUSER,
  password: process.env.dbPASSWORD,
  host: process.env.dbHOST,
  port: process.env.dbPORT,
  database: process.env.dbDATABASE,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
