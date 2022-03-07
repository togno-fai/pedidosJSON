const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const { Sequelize, DataTypes, Model } = require('sequelize');


const app = express();
//app.use(morgan('dev'));
app.use(cors({
  origin: '*'
}));
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize('ejemplo', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb'
});

const productos = sequelize.define('productos', {
  // Model attributes are defined here
  nombre: { type: DataTypes.STRING(50) },
  categoria: { type: DataTypes.STRING(50) },
  precioT: { type: DataTypes.INTEGER },
  precioU: { type: DataTypes.INTEGER },
});

app.listen(5000, async () => {
  var date = new Date();
  date.setTime(Date.now());
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();
  console.log("iniciado a las " + hour + ":" + minutes + ":" + seconds);
});
// CONECTOR MARIA DB

const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  database: 'ejemplo',
  user: 'root',
  password: 'root',
  connectionLimit: 5
});


app.get("/productos", async (req, res) => {
  fs.readFile("server/productos.json", (err, data) => {
    if (err) {
      console.error(err);
      res.send("hubo un error");
    } else {
      let productos = JSON.parse(data);
      res.send(productos);
    }
  });
});


app.get("/productosdb", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  sequelize.close();
  res.status(200).send({
    message: 'Welcome to the beginning.',
  })
});
app.get("/productosconn", async(req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * FROM productos")
        .then(rows => res.send(rows))
        .catch(err => console.log(err));
      
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.end();
    }
});