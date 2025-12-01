const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      // your DB user
  host: 'localhost',     // DB host
  database: 'make_up_shop_db', // DB name
  password: '199009',    // DB password
  port: 1990,            // DB port
});

module.exports = pool;
