console.log('hola');
const url = "http://localhost:5000/productos";
const productos = fetchProductos(url);

async function fetchProductos(url
) {
    await fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/JSON",
        }
    })
        .then(res => res.json())
        .then(data => {
            crearTabla(data.productos);

        })
        .catch(err => console.log(err));
}

function crearTabla(productos) {
    const tabla = document.getElementById("tabla");
    tabla.innerHTML = "<tr>"+
    "<th>producto</th><th>precioT</th><th>precioU</th>";
    for (let i = 0; i < productos.length; i++) {
        tabla.innerHTML = tabla.innerHTML +
            "<td>" + productos[i].nombre + "</td>" +
            "<td>" + productos[i].precioT + "</td>" +
            "<td>" + productos[i].precioU + "</td>";
        const element = productos[i];
    }
    tabla.innerHTML = tabla.innerHTML + "</tr>";

}