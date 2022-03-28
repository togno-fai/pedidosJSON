export function Tabla(listaItems) {
  // crear cuerpo de la tabla
  let tabla = crearTabla();
  // agregar columnas
  tabla.appendChild(crearColumnas(listaItems));
  // agregar items
  listaItems.forEach((listaItems) => {
    let tr = crear("tr");
    let atributos = Object.values(listaItems);
    celdaClave(tr, document.createTextNode(atributos[0]));
    for (let i = 1; i < atributos.length; i++) {
      let txt = document.createElement("p");
      txt.innerHTML = atributos[i];
      celdaValor(tr, txt);
    }
    
    tabla.appendChild(tr);
  });
  return tabla;
}
function crearTabla(){
  const tabla = crear("table");
  tabla.className = "table";
  tabla.id = "tabla";
  return tabla;
}
function crearColumnas(listaItems){
  let tr = crear("tr");
  let nombresColumnas = Object.keys(listaItems[0]);
  nombresColumnas.forEach((nombreColumna) => {
    celdaNombreColumna(tr, document.createTextNode(nombreColumna));
  });
  return tr;
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
function selectContent(element) {
  var range = document.createRange();
  range.selectNodeContents(element);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}