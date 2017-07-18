

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
// dentro del get lo que se hace es atrapar todos loa accesos a: localhost:8080/articulo/NUMERO
app.get("/articulo/:articuloId([0-9+])",function(req, res){ //como hago para que la ruta sea dinamica?-> expresiones regulares
	//se hace la consulta para buscar el primer renglon
	var articuloId = req.params.articuloId; //req.params da acceso a expresiones dentro de una ruta dinamica
	//modelos.Articulo.findById(1).then(function(articulo){//busca el renglon con id 1
	modelos.Articulo.findById(articuloId).then(function(articulo){//busca el renglon con id pasado en la ruta (req.params)
		//este metodo se ejecuta cuando encuentra algo
		//si no encuentra nada el objeto articulo sera NULL
		//console.log("Se encontro articulo con el titulo:" + articulo.titulo);
		res.render("articulo.html", { // se coloca dentro para que lo haga con el callback con lo que consulta del disco
			//asigno el objeto articulo a la propiedad articulo principal
			articuloPrincipal:articulo

		}) 
	});
	
})

app.get("/blog",function(req, res){
	res.render("blog.html")
})

app.get("/usuario",function(req, res){
	modelos.Usuarios.findById(1).then(function(usuario){
		console.log("Se encontro usuario: " + usuario.nombre);
		res.render("usuario.html", {
			usuarioPrincipal:usuario //el html accede es a la propiedad, en este caso usuarioPrincipal

		})
	});
})

app.get("/informes",function(req, res){
	res.send("informes supervisor2!");
})

//la dependencia supervisor instalada de forma global permite reiniciar el web server cada vez que se hagan cambios sobre este.
//npm bla bla bla --save es para dependencias locales, para las globales -g (disponible en los binarios del OS)
//truco para usar supervisor : ln -s /usr/bin/nodejs /usr/bin/node