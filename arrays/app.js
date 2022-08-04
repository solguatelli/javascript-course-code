//-------- METODOS DE ARREGLOS -------//

// MÉTODO FOREACH

const nums = [1,2,3,4,5,6,7,8,9,10];

/* function print(element){
  console.log(element)
}

nums.forEach(print);

nums.forEach(function(element){
  console.log(element);
})

// es lo mismo que un for..of --> este suele ser mas utilizado actualmente

for (const el of nums) {
  console.log(el)
} */

// MÉTODO MAP
 
const text = ["hello","world","i'm","a","developer"];
const movies = [
  {
    title : "Titanic",
    rating : 98
  },
  {
    title: "Casablanca",
    rating : 90,
  },
  {
    title : "Avatar",
    rating : 87,
  },
  {
    title : "Amadeus",
    rating : 99,
  },
  {
    title : "E.T.",
    rating : 84
  }
]
 
let upperText = text.map(function(element){
  return element.toUpperCase();
})
 
let moviesTitles = movies.map(function(element){
  return element.title;
})

// USANDO FUNCIONES FLECHA

nums.forEach((element) => console.log(element));

let upperText2 = text.map((elem) => elem.toUpperCase())

let moviesText = movies.map((elem) => `${elem.title} - ${elem.rating}` )

// METODO FILTER

let smallNums = nums.filter( n => {
  return n < 5;
})

let topMovies = movies.filter( movie => {
  return movie.rating > 90;
})

// METODOS SOME Y EVERY --> devuelven un booleano 

// SOME : alguno de los elementos del arreglo cumplen cierta condicion?

const words = ["jello","dog","hello","war","mermaid"]

words.some((word) => word.length > 4);

// EVERY : todos los elementos del arreglo cumplen cierta condicion? 

const exams = [90,70,89,50,95,77,73,85,89]

exams.every((exam) => exam >= 60); // devuelve false

// METODO REDUCE

// A diferencia de los otros metodos, la funcion utilizada tiene 2 argumentos
// el valor del item actual y un acumulador

// Como podemos sumar todos los elementos de un arreglo?

//CLASICO 

let prices = [19.99,3.56,5.66,11.34,6.78]
let total = 0;

for(let price of prices){
  total += price;
}

// CON REDUCE

let total2 = prices.reduce((total,price) => {
  return total + price;
})

// Podemos utilizar el metodo reduce para otras cosas como buscar el max o minimo valor del arreglo

let maxPrice = prices.reduce((highest,current) => {
  if(current > highest){ 
    return current  
    // Recordemos que lo que nosotros retornemos es el valor del acumulador en la siguiente iteracion
  } else {return highest}
})
 
// LO VEMOS EN EL DEBUGGER DE CHROME

let minPrice = prices.reduce((min,current) => {
  if(current < min){ 
    return current  
    // Recordemos que lo que nosotros retornemos es el valor del acumulador en la siguiente iteracion
  } else {return min}
})


// Veamos un ejemplo con objetos
// Buscaremos la pelicula con el mejor rating de todos

let theBestMovie = movies.reduce((bestMovie,currentMovie) => {
  if(currentMovie.rating > bestMovie.rating){
    return currentMovie
  } else {
    return bestMovie
  }
})

// Con un valor inicial para el acumulador

const evenNums = [2,4,6,8];

let sum = evenNums.reduce((total,num) => total + num,100) // sin este segundo argumento obtendriamos 20 

// METODOS FIND Y FINDINDEX

const personalData = [{name : "Sol",age : 22},{name: "Frida", age : 20}]
personalData.find((el) => {return el.age === 20})

personalData.findIndex(el => el.name === "Sol")


// SPREAD OPERATOR 
// Llamados a funciones

let randNums = [1,2,3,7,12,56,1234,666,234,8955]

Math.max(...randNums); // esta funcion no espera como argumento un arreglo, si no elementos separados 
                        // entonces con el operador spread expandimos los elementos 


console.log(nums)
console.log(...nums) // dos cosas distintas 

console.log("hello");
console.log(..."hello");

// Con arreglos literales

// Si queremos unir dos arreglos podemos usar concat()

let dogs = ["bulldog","golden retriever","pug"];
let cats = ["bengal","burmese","korat"]

let animals = dogs.concat(cats);

// O usamos 'spread'

let animals2 = [...dogs,...cats,"parrot"]; // Muy distinto a hacer [dogs,cats]

let characters = [..."hello"];

// Con objetos
// Igual que en arreglos, podemos expandir las propiedades de un objeto en otro

const person = {
  fName : "John",
  lName : "Doe",
}

const employee = {
  ...person,
  salary : 3000,
  workHours : 8
}

// REST OPERATOR 

/* function sum(){
  console.log(arguments);
  return arguments.reduce((total,n) => total + n); // ESTO NO FUNCIONA
}
 */


function sum2(...nums){
  console.log(nums)
  return nums.reduce((total,num) => {
    return total + num
  })
}


sum2(1,2,3,4,5,6);

function raceResults(gold,silver,bronce,...everyoneElse){
  console.log("GOLD MEDAL GOES TO: " + gold);
  console.log("SILVER MEDAL GOES TO: " + silver);
  console.log("BRONCE MEDAL GOES TO: " + bronce);
  console.log("AND THANKS  TO EVERYONE ELSE FOR PARTICIPATING: " + everyoneElse);
}

raceResults("Nicky","Sol","Dani"," Tomi"," Facu"," Tati")


// DESTRUCTURING (desestructurar)

// Arreglos 
// Primero veamos la manera clasica de sacar valores de un arreglo y guardar en variables

const scores = [99888,87981,67771,12333,10023]

/* let firstPlace = scores[0];
let secondPlace = scores[1];
... */

// Desestructurando

let [firstPlace, secondPlace, thirdPlace] = scores;

const racers = ["Thomas","Jefferson","Louis","Nadia","Ezra"]

let [gold,silver,bronze,...losers] = racers; // OTRA SITUACION PARA UTILIZAR OPERADOR REST

// Objetos

const user = {
  email : "harvey@gmail.com",
  password : "34fsff()212:/",
  fName : "Harvey",
  lName : "Willis",
  born: 1998,
  died : null,
  city : "San Francisco",
  state : "California"
}

// Manera clasica

/* const fName = user.fName;
const lName = user.lName;
const email = user.email; */

// Desestructurando

const {email, city, state} = user; // la primera diferencia con arreglos es que no podemos renombrar la variable
                                  // debe tener el mismo nombre que la propiedad para poder ser buscada en el objeto

// Como renombramos entonces? 

const {fName : firstName, lName : lastName} = user;

// Y si busco una propiedad que no existe? 

const {fName, lName, bio } = user;

console.log(bio) // undefined

// Puedo entonces dar valores por defecto para evitar esto

const {fName, lName, bio = "A random user" } = user;

// Con parametros 

// Manera clasica

function fullName(user){
  console.log(`I'm ${user.fName} ${user.lName}`);
}

fullName(user);

// Desestructurando

function fullName2({fName,lName}){
  console.log(`I'm ${fName} ${lName}`);
}

fullName2(user)

movies.filter(({rating}) => rating >= 90);

