const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "todoapp_todoapp-database",
  port: 5432,
  database: "todoapp",
  password: "todoapp",
});

module.exports = pool;
