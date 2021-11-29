import { crearTabla } from "./tabla.js";

const url = "http://localhost:5000/productos";
const productos = fetchProductos(url);
const tablaActual = [];
async function fetchProductos(url) {
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let cuerpo = document.getElementById("cuerpo");
      let tabla = crearTabla(data.productos)
      cuerpo.appendChild(tabla);
    })
    .catch((err) => console.log(err));
}
