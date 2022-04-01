const PORT = 5000;

const express = require("express");
const app = express();
const cors = require("cors");
const producto = require("./routes/producto.js");
const bodyParser = require('body-parser');


app.use(cors({ origin: "*" }));
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/producto", producto);

app.listen(PORT, async () => {
  console.clear();
  var date = new Date();
  date.setTime(Date.now());
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hour = date.getHours();
  console.log("iniciado a las " + hour + ":" + minutes + ":" + seconds);
});