const express = require("express");
var router = express.Router();
const db = require("../config/database");
const Producto = require("../models/Producto.js");

router.get("/", (req, res) =>
  Producto.findAll()
    .then((producto) => res.status(200).send(producto))
    .catch((err) => res.status(500).send(err))
);
router.get("/:nombre", (req, res) =>
  Producto.findOne({ where: { nombre: req.params.nombre } })
    .then((producto) => res.status(200).send(producto))
    .catch((err) => res.status(500).send(err))
);
router.post("/", (req, res) => {
  try {
    if (!req.body.nombre)
      res.status(400).send("el nombre del producto on puede ser nulo");
    Producto.upsert(req.body, { returning: true })
      .then(([instance, created]) => res.status(200).send(instance))
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.send(err);
  }
});
router.put("/:nombre", (req, res) => {
  Producto.update(
    req.body,
    { where: { nombre: req.params.nombre } },
    { multi: true }
  )
    .then((prod) => res.send(prod))
    .catch((err) => res.send(err));
});
module.exports = router;
