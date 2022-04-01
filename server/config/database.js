const Sequelize = require("sequelize");
// const dotenv = require('dotenv'); dotenv.config();

module.exports = new Sequelize(
  "guille72_pruebaGestion",
  "guille72_lucas",
  "lucasPrueba",
  {
    host: "nodejs.toctocgestion.com",
    dialect: "mariadb",
    define: {
      timestamps: false,
    },
    // operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
