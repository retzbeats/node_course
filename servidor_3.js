

var express = require ("express");
var nunjucks = require ("nunjucks");
//requiriendo los modulos
var modelos = require("./modelos/principal_1.js"); // eñ require se trae todas las propiedades del objeto en principal_1
console.log ("Prueba: " + modelos.PRUEBA)

var app = express();
//configuracion de nunjucks (sistema de templates)
nunjucks.configure(__dirname + "/vistas",{
	express:app //se asigna servidor de express (app) a la propiedad express
})//primer argumento son los html 
//(__dirname es una variable que tiene la ruta donde esta ESTE codigo)

app.listen(8080);
app.get("/articulo",function(req, res){
	//se hace la consulta para buscar el primer renglon
	modelos.Articulo.findById(1).then(function(articulo){//busca el renglon con id 1
		//este metodo se ejecuta cuando encuentra algo
		console.log("Se encontro articulo con el titulo:" + articulo.titulo);
		res.render("articulo.html", { // se coloca dentro para que lo haga con el callback
			//asigno el objeto articulo a la propiedad articulo principal
			articuloPrincipal:articulo

		}) 
	});
	
})

app.get("/blog",function(req, res){
	res.render("blog.html")
})

app.get("/usuario",function(req, res){
	res.render("usuario.html")
})

app.get("/informes",function(req, res){
	res.send("informes supervisor2!");
})

//la dependencia supervisor instalada de forma global permite reiniciar el web server cada vez que se hagan cambios sobre este.
//npm bla bla bla --save es para dependencias locales, para las globales -g (disponible en los binarios del OS)
//truco para usar supervisor : ln -s /usr/bin/nodejs /usr/bin/node