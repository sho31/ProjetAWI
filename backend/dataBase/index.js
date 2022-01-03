require("dotenv").config();
const Pool  = require("pg").Pool;

// const pool = new Pool({
//   user: process.env.dbUSER,
//   password: process.env.dbPASSWORD,
//   host: process.env.dbHOST,
//   port: process.env.dbPORT,
//   database: process.env.dbDATABASE,
// });

const devConfig = `postgresql://${process.env.dbUSER}:${process.env.dbPASSWORD}@${process.env.dbHOST}:${process.env.dbPORT}/${process.env.dbDATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons
console.log(process.env.NODE_ENV)
console.log("db", proConfig )
console.log(process.env.NODE_ENV === "production" ? proConfig : devConfig)
const pool = new Pool({
  connectionString:
      process.env.NODE_ENV === "production" ? proConfig : devConfig,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
};