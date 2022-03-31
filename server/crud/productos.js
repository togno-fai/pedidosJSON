var db = require("../db/db.js");

async function obtenerTodos() {
  const data = await db.query("SELECT * FROM productos");
  return data;
}
async function obtenerUno(nombre) {}
async function agregar(producto) {
  const query =
    "INSERT INTO `guille72_pruebaGestion`.`productos` (`nombre`, `categoria`, `precioT`, `precioU`) VALUES " +
    `(\'${producto.nombre}\', \'${producto.categoria}\', \'${producto.precioT}\', \'${producto.precioU}\');`;
  const data = await db.query(query);
  return data;
}
async function modificar(producto) {}
async function eliminar(producto) {}
module.exports = {
  obtenerTodos,
  obtenerUno,
  agregar,
  modificar,
  eliminar,
};
