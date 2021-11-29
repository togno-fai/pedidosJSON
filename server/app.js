import express from "express";
import fs from "fs";
import cors from "cors";
const app = express();
let coins;
const DIEZ_MINUTOS = 1000 * 60 * 10;
app.use(cors());
app.use(express.static("public"));
app.use("/static", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, async () => {
  var date = new Date();
  date.setTime(Date.now());

  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();
  console.log("iniciado a las " + hour+":"+minutes+":"+seconds);
});

//api alternativa

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

app.post("/api/mycoins/", async (req, res) => {
  let listaCoins = req.body;
  fs.readFile("../server/data/coins.json", (err, data) => {
    if (err) {
      res.send("error");
    } else {
      let postedCoin = JSON.parse(data);
      listaCoins.push(postedCoin);
      console.log(listaCoins);
      fs.writeFile(
        "../server/data/coins.json",
        JSON.stringify(listaCoins, null, 2),
        (err) => {
          if (err) throw err;
          console.log("Data written to file");
        }
      );
      res.send(req.body);
    }
  });
});
