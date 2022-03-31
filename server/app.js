const PORT = 5000;

const express = require("express");
const app = express();
const cors = require("cors");
const productos = require("./router/productos.js");

app.use("/productos", productos);
app.use(cors({ origin: "*" }));
app.use(express.static("./public"));
app.listen(PORT, async () => {
  console.clear();
  var date = new Date();
  date.setTime(Date.now());
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();
  console.log("iniciado a las " + hour + ":" + minutes + ":" + seconds);
});