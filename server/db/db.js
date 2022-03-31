const mariadb = require("mariadb");
const fs = require("fs");
function leerConfig() {
  fs.readFile("db/config.json", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      return JSON.parse(data);
    }
  });
}

const pool = mariadb.createPool({
  host: "toctocgestion.com",
  database: "guille72_pruebaGestion",
  user: "guille72_lucas",
  password: "lucasPrueba",
  connectionLimit: 5,
});

async function query(query) {
  var res;
  let conn;
  try {
    conn = await pool.getConnection();
    res = await conn.query(query);
  } catch (err) {
    res = err;
  } finally {
    if (conn) conn.end();
  }
  return res;
}

module.exports = {
  query,
  pool
};
