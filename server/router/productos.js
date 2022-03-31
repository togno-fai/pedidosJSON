var db = require("../db/db.js");
var productos = require("../crud/productos.js");
var express = require("express");
var router = express.Router();
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Home page route.
router.get("/", async function (req, res) {
  //res.send("obtener productos");
  const data = await productos.obtenerTodos();
  if (data instanceof Error) res.send(data.code);
  else res.send(data);
});

router.post("/", async function (req, res) {
  const data = await productos.agregar(req.body);
  if(data instanceof Error) res.send(data.code)
  else res.send(data);
});

module.exports = router;
