const bodyParser = require("body-parser");
const express = require("express");
const qr = require("qr-image");
const path = require("path");
const fs = require("fs");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const url = req.body.url;
  var qr_svg = qr.image(url);
  qr_svg.pipe(fs.createWriteStream('qr_img.png'));
  res.sendFile(path.join(__dirname, "qr_img.png"));
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});

