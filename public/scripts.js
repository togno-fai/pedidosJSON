import { Tabla } from "./tabla.js";
const url = "http://localhost:5000/producto";

window.onload = cargarTabla(url);
document.getElementById("postear").onclick = post;
document.getElementById("eliminar").onclick = eliminar;

async function cargarTabla(url) {
  await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const cuerpo = document.getElementById("cuerpo");
      const oldtabla = document.getElementById("tabla");
      if (oldtabla) cuerpo.removeChild(oldtabla);
      const tabla = Tabla(data);
      cuerpo.appendChild(tabla);
    })
    .catch((err) => console.log("error en cargar tabla"));
}

function eliminar() {
  const nombre = document.getElementById("nombre").value;
  if (nombre == "") {
    window.alert('el campo "nombre" no puede estar vacio');
  } else {
    if (window.confirm("seguro que desea eliminar: " + nombre)) {
      const direccion = url + "/" + nombre;
      console.log(direccion);
      fetch(direccion, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("eliminando: ");
          console.log(JSON.stringify(res));
        })
        .then(cargarTabla(url))
        .catch((err) => console.log(err));
    }
  }
}
function post() {
  const inputs = form.querySelectorAll("input");
  if (inputs[0].value == "") {
    alert('el campo "nombre" no puede estar vacio');
  } else {
    const postBody = Object.fromEntries(
      [...inputs].map((i) => [
        i.id,
        i.type != "number" ? i.value : i.value == "" ? 0 : i.value,
      ])
    );
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("posteando: ");
        console.log(res);
      })
      .then(cargarTabla(url))
      .catch((err) => console.log(err));
  }
}
export { post, eliminar };
