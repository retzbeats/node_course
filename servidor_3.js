

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
	//modelos.Articulo.findById(articuloId).then(function(articulo){//busca el renglon con id pasado en la ruta (req.params)
	modelos.Articulo.find({
		where:{id:articuloId},
		include:[{	//con el include se incluyen los campos que corresponden a mapeos 1-N o N-N
		model:modelos.Comentario,
		as:"comentarios"
		},{
			model:modelos.Categorias,
			as:"categorias"
		}]
	}).then(function(articulos){
		//este metodo se ejecuta cuando encuentra algo
		//si no encuentra nada el objeto articulo sera NULL
		//console.log("Se encontro articulo con el titulo:" + articulo.titulo);
		res.render("articulo.html", { // se coloca dentro para que lo haga con el callback con lo que consulta del disco
		//asigno el objeto articulo a la propiedad articulo principal
		articuloPrincipal:articulos
		}) 
	})
});

	


app.get("/blog",function(req, res){
	//req.query == LES DA ACCESO A TODOS LOS PARAMETROS
	//QUE VIENEN EN EL QUERY STRING
	//si no se pone el query string de offset
	//toma el valor de 0
	var offset = req.query.offset;
	modelos.Articulo.findAll({
		limit:3, //sirve para que haga la consulta en la tabla en bloques de 3 (util para visulización)
		offset:offset // offset sirve para hacer paginación mostrar de a bloques, para hacerlo de forma dinamica con la ruta:querystring
		//localhost:8080/blog?offset=3
	}).then(function(articulos){
		//find all trae todos los renglones de la tabla
		//articulos es un arreglo de objetos, para recorrerlo se puede usar metodo foreach de javascript
		//res.render("blog.html",{
		//articulos:articulos // los articulos encontrados se pasan a la vista con la propiedad articulos
		//});
		modelos.Categorias.findAll().then(function(categorias){ // Hay que hacer la otra busqueda anidada por el tema del asincronismo
			res.render("blog.html",{
			articulos:articulos,
			categorias:categorias
		})

	});
	});
})
		

app.get("/usuario",function(req, res){
	modelos.Usuarios.find({ //la funcion findById no me permite pasar objetos, para eso tengo que usar find
		where:{id:2},
		include:[{
			model:modelos.Articulo,
			as:"articulos" //igual al usado en principal.js
		}]
	}).then(function(usuario){
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