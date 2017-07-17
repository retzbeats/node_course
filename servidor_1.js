var express = require ("express");
var app = express();
app.listen(8080);
app.get("/inicio",function(req, res){
	res.send("hola!");
})

app.get("/informes",function(req, res){
	res.send("informes!");
})