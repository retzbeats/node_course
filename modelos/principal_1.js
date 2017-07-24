var Sequelize = require ("sequelize");

//Configuracion de la base de datos con sequelize
var sequelize = new Sequelize("NOMBRE_BASE", "USUARIO", "PASSWORD_USUARIO", {
	dialect:"sqlite",// aca se coloca el tipo de base al que se va a conectar
	storage:__dirname + "/database.db",//esta propiedad solo sirve para SQLITE
	define:{
		timestamps:false,
		freezeTableName:true//timestamps false significa que no tiene la columna de timestamps, el freezeTableName deshabilita
							//la convencion del nombre de las columnas
	}

}); // creacion de un objeto sequelize

//las operaciones en disco duro en node se hacen de manera asincrona 
//(no espera a que los archivos q accede esten listos, sigue de largo)
sequelize.authenticate().then(function(){ //success(function(){ se cambia en la nueva version de Sequelize (2.xx) por then
// la manera de saber que algo ya se termino una operacion asincrona es con los CALLBACK (en este caso success)
console.log("base lista!!!");	
});



module.exports.PRUEBA = "hola"; //module.exports es un obejto que permite hacer visibles los datos de este archivo

// Aca se va a hacer el mapeo de las tablas---------------------------------------------------
// Mapeo de articulos
 var Articulo = sequelize.define("Articulo",{ //este objeto representa la tabla
 	id:{
 		primaryKey:true, //indica a sequelize que esta es la columna con llave primaria
 		type:Sequelize.INTEGER
 	},
 	titulo:Sequelize.TEXT,//le dice a squelize que la columna titulo es una cadena
 	contenido:Sequelize.TEXT,
 	fecha_creacion:Sequelize.DATE //DATE es para fechas.

 },{tableName:"articulos"}); //le dice cual es la tabla de la base de datos asociada a este objeto

 // Mapeo de usuarios
var Usuarios = sequelize.define("Usuarios",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	nombre:Sequelize.TEXT,
	email:Sequelize.TEXT,
	password:Sequelize.TEXT
},{tableName:"usuarios"}); //le dice cual es la tabla de la base de datos asociada a este objeto

// Mapeo de categorias
var Categorias = sequelize.define("Categorias",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	nombre:Sequelize.TEXT
},{tableName:"categorias"});

//Mapeo de comentarios
var Comentario = sequelize.define("Comentarios",{
	id:{
		primaryKey:true,
		type:Sequelize.INTEGER
	},
	comentario:Sequelize.TEXT
},{tableName:"comentarios"});

//-------------Mapeo 1-N-----------------con una sola consulta trae todos los elementos asociados a este item
Usuarios.hasMany(Articulo,{
	foreignKey:"usuario_id", //es la llave que conecta con la tabla de usuarios (relacion 1-N)
	as:"articulos" // agrega los articulos como otra propiedad de usuario --> usuario.articulos
});

Articulo.hasMany(Comentario,{
	foreignKey:"articulo_id",
	as:"comentarios"
});

//-------------Mapeo N-N--------------------multiples items en ambas direcciones. se necesita tabla intermedia, 
//en estos caso el hasMany se reemplaza por belongsToMany
Articulo.belongsToMany(Categorias,{
	foreignKey:"articulo_id",
	as:"categorias",
	through:"categorias_articulos" //esto referencia la tabla intermedia donde se hace el cruce
});

Categorias.belongsToMany(Articulo,{
	foreignKey:"categoria_id",
	as:"articulos",
	through:"categorias_articulos"
});

 module.exports.Articulo = Articulo; //se exporta la tabla
 module.exports.Usuarios = Usuarios;
 module.exports.Categorias = Categorias;
 module.exports.Comentario = Comentario