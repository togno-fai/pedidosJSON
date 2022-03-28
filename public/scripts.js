import { Tabla } from "./tabla.js"
// const url = "http://nodejs.toctocgestion.com/productosconn";
const url = "http://localhost:5000/productos";
const productos = fetchProductos(url);
const tablaActual = [];

async function fetchProductos(url) {
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  }).then((res) => res.json())
    .then((data) => {
      let cuerpo = document.getElementById("cuerpo");
      let tabla = Tabla(data)
      cuerpo.appendChild(tabla);
    })
    .catch((err) => console.log(err));
}
function test2() {
  alert(`The function 'test2' is executed`);
}