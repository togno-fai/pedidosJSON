import { Tabla } from "./tabla.js"
const url = "http://localhost:5000/productosconn";
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
      console.log('aber') // borrar
      let cuerpo = document.getElementById("cuerpo");
      let tabla = Tabla(data.productos)
      cuerpo.appendChild(tabla);
    })
    .catch((err) => console.log(err));
}
