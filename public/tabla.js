export function crearTabla(productos) {
  const tabla = crear("table");
  tabla.className = "table";
  tabla.id = "tabla";
  let tr = crear("tr");
  let atributos = Object.keys(productos[0]);
  atributos.forEach((atributo) => {
    celdaNombreColumna(tr, document.createTextNode(atributo));
  });
  tabla.appendChild(tr);
  productos.forEach((producto) => {
    let tr = crear("tr");
    let atributos = Object.values(producto);
    celdaClave(tr, document.createTextNode(atributos[0]));
    for (let i = 1; i < atributos.length; i++) {
      celdaValor(tr, document.createTextNode(atributos[i]));
    }
    
    tabla.appendChild(tr);
  });
  console.log(tabla);
  return tabla;
}
function crear(tag) {
  return document.createElement(tag);
}

function celdaNombreColumna(parent, inner) {
  parent.appendChild(crear("th")).appendChild(inner);
}
function celdaClave(parent, inner) {
  parent.appendChild(crear("td")).appendChild(inner);
}
function celdaValor(parent, inner) {
  let td = crear("td");
  td.editable = false;
  td.colorNormal = td.style.backgroundColor;
  parent.appendChild(td).appendChild(inner);
  td.ondblclick = (e) => {
    //td.replaceChild(celdaInput(td.childNodes[0].textContent),td.childNodes[0]);
    td.editable = !td.editable;
    if (td.editable) {
      td.style.backgroundColor = "#7c94ff";
      td.contentEditable = true;
      selectContent(td);
    } else {
      td.style.backgroundColor = td.colorNormal;
      td.contentEditable = false;
    }
  };
}
function cambiarPrecio(e, producto, atributo) {
  if (isNaN(e.data)) e.preventDefault();
  console.log(`[producto: ${producto}, atributo: ${atributo}] ` + e.data);
}

function celdaInput(text) {
  var input = document.createElement("input");
  input.setAttribute("type", "text");
  input.focus();
  input.value = text;
  input.focus();
  input.onkeydown = (e) => console.log(e);
  return input;
}
function selectContent(element) {
  var range = document.createRange();
  range.selectNodeContents(element);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}