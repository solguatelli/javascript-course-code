function makeMisteryFunction(){
  let randNum = Math.random();
  if(randNum > 0.5){
    return function() {
      console.log("CONGRATS IM AM A GOOD FUNCTION!");
      console.log("YOU WIN A MILLION DOLLARS!");
      } 
    }
    else {
      return function(){
        console.log("OH NO IM A BAD FUNCTION!");
        console.log("I WILL INSERT A VIRUS IN YOUR COMPUTER!")
      }
  }
}

function makeBetweenFunc(min,max){
  return function(num){
    if(num >= min && num <= max){
      return true
    } else {
      return false
    }
  }
}

const isChild = makeBetweenFunc(0,18);

//------OBJETOS--------//

// Metodos 

const myCalculator = {
    myPI : 3.14159,
    add : function(a,b){
      return a + b;
    },
    subtract : function(a,b){
      return a - b;
    }
}

myCalculator.add(3,4);
myCalculator["add"](3,4); // --> no usamos casi nunca esta sintaxis para llamar metodos

// Agregar y eliminar propiedades

myCalculator.multiply = function(a,b) {
  return a * b
}

delete myCalculator.myPI;

// Beneficios de los corchetes para agregado dinamico de propiedades

let userKeyName = "email"

const person = {
  name: "Max",
  age : 22,
  [userKeyName] : "...",
  hobbies : ["sports","gaming"]
}

// Abreviacion para definir los metodos

const myCalculator2 = {
  myPI : 3.14159,
  add(a,b){
    return a + b;
  },
  subtract(a,b){
    return a - b;
  }
}

//--- "THIS" KEYWORD

// 'this' en un contexto dentro del objeto

const person = {
  fName : "Robert",
  lName : "Johnson",
  greet(){
    console.log(this);
    return `Hello! My name is ${this.fName} ${this.lName}`

  },
}

/* const person2 = {
  fName : "Robert",
  lName : "Johnson",
  greet(){
    return `Hello! My name is ${fName} ${lName}`  ERRORR, no existe tal variable para el interprete
  },
} */

// 'this' en un contexto fuera del objeto

let greetings = person.greet; // --> no lo ejecutamos al método, lo guardamos en una variable

greetings() // --> lo impreso por el console.log(this) de esta funcion ahora imprime algo distinto


//------ PROGRAMACION ORIENTADA A OBJETOS --------//

class Person {
  // firstName = "None"  // Podemos poner un valor por default tmb
  /* firstName;
  lastName;
  age;
  hobbies; */

  constructor(fName,lName,age,hobbies){
    this.firstName = fName
    this.lastName = lName
    this.age = age
    this.hobbies = hobbies
  }

  greet(name){
    console.log("Hello" + name + "! My name is " + this.firstName + " " + this.lastName)
  }

  // Si establecemos las propiedades de la clase en el constructor no hace falta definirlas antes
  // En cualquier lugar de la clase podemos definir nuevas propiedades
}

const person1 = new Person("Max","Peterson",22,["Sports","Cooking"]) // Usamos la key 'new' para instanciar un nuevo objeto a partir de la clase
person1.greet()

//--- CLASES ESTATICAS

// Una clase estatica es la cual ofrecen propiedades y metodos que se acceden desde la clase en si
// y no a traves de un objeto instanciado 

class Helper {
  static iniciar(){
    console.log("Iniciando aplicación")
    // Cierta logica
  }

  static metodo1() {
    console.log(".... Metodo 1")
  }
}

Helper.iniciar() // ¡Lo llamamos desde la clase en si!

//--- HERENCIA

class Employee extends Person {
  constructor(fName,lName,age,hobbies,salary){
    super(fName,lName,age,hobbies) // Llama al constructor de la clase padre, luego podemos agregar lo especifico de la clase hijo
    this.salary = salary
  }
}

const employee1 = new Employee("Ana","Gomez",35,["Sports","Cooking"],20000)

//--- INSTANCE OF

employee1 instanceof Employee // Esto nos da como resultado TRUE

//--- CONSTRUCTOR FUNCTIONS
/* Mas antiguo que 'class' para crear clases pero con mayor soporte en los navegadores
y es basicamente lo que hace una clase en segundo plano al ser creada */

function Human(){
  this.name = "Max"
  this.age = 22
  this.greet = function(){
    console.log(`Hi my name is ${this.name} and I'm ${this.age} years old`)
  }
}

const human1 = new Human() // para crear una instancia el codigo es el mismo!
human1.greet()

/* Lo importante es entonces la palabra reservada 'new'
   lo que hace esta es crear un obj this, asignarle todos las propiedades y metodos
   y luego retornar dicho obj 

   function Human(){
    this = {}
    this.name = "Max"
    this.age = 22
    this.greet = function(){
      console.log(`Hi my name is ${this.name} and I'm ${this.age} years old`)
    }
    return this
  }
*/

//------- PROTOTYPES

/* Todo objeto en JavaScript tiene un prototipo, y los prototipos son en si objetos conectados que sirven 
como objetos alternativos o como bases para otros objetos

Cuando tratamos de usar un método de un objeto y este no es encontrado, JS no tira un error si no que pasa
a buscar dicho metodo/propiedad al prototipo, luego al prototipo del prototipo, etc. 

IMPORTANTE: El ultimo prototipo en esta cadena es el del objeto global OBJECT
            Object.prototype.__proto__  no existe
*/

// Por ejemplo
human1.toString() 
// human1.toStr() esto si daría error pues no existe
/* La función toString no la definimos en nuestra clase Human pero JS no tira error porque fue a buscarlo 
a ese objeto base o alternativo y lo encontró. Es decir que JavaScript se basa en una herencia prototipal
 */


// DOS COSAS DIFERENTES: prototype y __proto__

/* __proto__ esta presente a TODO objeto(arrays,maps,sets,string,objetos literales,etc) creado en JS 
  prototype existe solo en objetos de tipo FUNCION, y su contenido se asigna a la propiedad __proto__ de 
  todo objeto instanciado en base a dicha funcion constructora/clase

  ES DECIR QUE:  human1.__proto__ === Human.prototype

  Y por default, a menos que lo cambiemos nosotros, el prototype de toda funcion custom se compone de:

  prototype = {
    constructor: f ()
    __proto__ : Object
  }

  ENTONCES, cuando nosotros usamos explicitamente herencia con la key 'extends' estamos diciendo que 
  los objetos instanciados van a tener un prototipo distinto que incluye el prototype de la clase padre

*/

const h = new Human()
console.dir(h.__proto__)
console.log(h.__proto__ === Human.prototype)

Human.prototype = {
  sayGoodBye(){
    console.log("Bye bye world!")
  }
}
const h2 = new Human()
console.dir(h2.__proto__)


//-- DIFERENCIAS AL USAR 'class' para definir objetos 

/* 
Cuando creamos objetos a partir de una clase definida con 'class' tenemos una pequeña diferencia
en el __proto__ de dichos objetos.
Sabemos que en un objeto las propiedades pueden tener propiedades con valor que pueden cambiar de manera
dinamica, pero los metodos en general suelen ser siempre iguales. 

ENTONCES, JS guarda los metodos establecidos en clases en el prototipo de los objetos instanciados, de 
esa manera optimizamos al no crear los metodos una y otra vez, si no tener un solo prototipo donde se guarden.
EXCEPTO SI el metodo se define dentro de una variable 


Entonces el __proto__ comun sería algo así:

__proto__ = {
  constructor() : f
  metodo1
  metodo2
  ...
  __proto__ : Object
}

person = {
  age: ...
  name : ..
  // sin el metodo greet
}

person.__proto__ = {
  constructor : Person()
  greet()
  __proto__ : Object
}

Si queremos el mismo resultado para una clase con funcion constructora entonces tendriamos que definir los 
metodos sobre el prototype de la clase, por ej:

function Person(){
  name = "Max"
  age = 30
}

Person.prototype.greet = function(){
    console.log("Hello" + name + "! My name is " + this.firstName + " " + this.lastName)
}

*/


//-- PROTOTIPOS INCLUIDOS EN JS

/* 
Cuando usamos metodos sobre un array, una string, etc esos metodos provienen del prototype del objeto general
Es decir Array.prototype, String.prototype.

let str = "Hello"

str.toLowerCase() === str.__proto__.toLowerCase() y eso se hereda del objeto global al ser instanciado
String.prototype.toLowerCase()
 */


 //-- MODIFICAR PROTOTIPOS

 const course = {
   name : "JavaScript Guide 2020",
   rating: 4
 }

 Object.getPrototypeOf(course) // Manera oficial de obtener el prototipo de un objeto

 Object.setPrototypeOf(course,{ // Como cambiarlo
  ...Object.getPrototypeOf(course),
   printRating(){
     console.log(this.rating + "/5")
   }
 })

 course.printRating()

 // Otra manera de crear objetos, ademas de {} y 'new'

 let student = Object.create({}) // Le pasamos el prototipo que va a tener

