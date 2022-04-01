const Sequelize = require("sequelize");
const db = require("../config/database");

const Producto = db.define("producto", {
  nombre: {
    type: Sequelize.STRING,
    unique: true,
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: null,
  },
  precioT: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  precioU: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

Producto.sync().then(() => {
  console.log("table created");
});
module.exports = Producto;
