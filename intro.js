console.log("hola mundo node.js!"); //output en consola

var curso = "node.js"; //declaracion de variables, no tienen tipo cuando se asigna adquiere el tipo
var duracion = 15.5;

// OBJETOS DE JAVASCRIPT
// objeto de javascript => JSON
var persona = {	// los corchetes indican que es un objeto
	nombre:"bart simpson", // las propiedades son las de la izquierda y el valor el de la derecha
	edad:7
};

persona.trabajo = "estudiante"; //con . se puede pegar una propiedad a un objeto

//forma 2 de declarar objetos de javascript
var persona2 = new Object(); //el objeto empieza sin propiedades
persona2.nombre = "homero simpson";	//al darle el . se declara la propiedad
persona2.edad = 40;

console.log("edad homer:" + persona2.edad); // el + me deja concatenar la cadena


//----------- DECLARACION DE FUNCIONES DE JAVASCRIPT ------

//DECLARACION TRADICIONAL
function sumar(a,b){
	
	return a+b;	//el return no es obligatorio
} // para invocar: sumar(1,2)

//SEGUNDA FORMA: FUNCIONES ANONIMAS
var multiplar = function(a,b){ // en una variable se puede guardar una funcion
	//multiplicamos los valores que nos pasan
	return a*b;
};//para invocar multiplar(3,4)

function operacion(miFuncion,a,b){ //paso las funciones que declare como variables como parametros de esta
	//operacion espera que miFuncion sea una funcion de javascript
	
	return miFuncion(a,b);
}

//SOLUCION EJERCICIO BREVE
//LAS FUNCIONES ANONIMAS = LAMBDAS
var dividir = function(a,b){
	return a/b;
};

//PARADIGMA FUNCIONAL: TRATAR A LAS FUNCIONES COMO CIUDADANOS DE PRIMERA CLASE
//                     (significa que una funcion se puede guardar en una variable
//	                     que pueden pasar como argumento una funcion a otra funcion
//	                   )


console.log("1+2=" + sumar(1,2));
console.log("2*3=" + multiplar(2,3));

var resultado = operacion(dividir,1,2);
console.log("resultado:" + resultado);












