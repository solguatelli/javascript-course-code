// ----NUMEROS----

/*
En JS todos los numeros son de tipo FLOAT, es decir que 5,10,20 se guardan como 5.0 10.0 y así
Se guardan en unidades de 64 bits y por lo tanto hay limitaciones para numeros MUY grandes
*/

// Para obtener los valores maximos y minimos usamos el objeto global Number
console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER)
console.log(Number.MAX_VALUE,Number.MIN_VALUE)

// A estos valores max y min no le podemos sumar o restar porque ya son en si extremos, si bien hacer esto
// no daria error, no veriamos cambios en estos numeros

// -- (IM)PRECISION


// Hay calculos con numeros decimales que retornan valores "raros" para nosotros por ej:
console.log(0.4 + 0.2)

/*
Nos devuelve 0.600000001 y ¿porqué es esto? Es porque por detrás JS convierte todos los numeros
de base decimal a base binaria, realiza los calculos necesarios y luego el resultado lo vuelve a
convertir a base decimal, y hay ciertos numeros decimales que no tienen una representacion exacta en binario
Igual que la representacion de 1/3 = 0,33333333333 por ej.

ENTONCES en caso de necesitarlo podemos arreglarlo así:
*/
let result = 0.4 + 0.2
console.log(result.toFixed(2)) // Numero de decimales a mostrar

// --TIPO DE DATO BIGINT

// Permite manejar enteros mayores al MAX y MIN SAFE_INTEGER, agregando una 'n' al final
console.log(1231212414141242421312n)

// No podemos mezclar valores de tipo BigInt y otro tipo, tira error
//console.log(12n - 4)

// --OBJETOS GLOBALES NUMBER Y MATH

function getRandNumber(min,max){
    return Math.floor(Math.random() * (max-min + 1)+ min)
}

console.log(getRandNumber(10,20))

// --STRINGS--

// TAGGED TEMPLATES
// Otra forma de pasar argumentos a una función

const product = {
    name:  "Bike",
    price: 29.99
}

function myFunction(strings,name,description){
    console.log(strings)
    console.log(name)
    console.log(description)
}

myFunction`This product ${product.name} is worth ${product.price}`

// REGULAR EXPRESSIONS
// Nos permiten matchear patrones de caracteres con strings. Dos formas de crearlas:

const regex = new RegExp("^\\S+@\\S+\\.\\S+$")
const regex2 = /^\S+@\S+\.\S+$/

regex2.test("sol.guatelli@gmail.com") // nos devuelve true si matchea y false si no

regex2.test("sol.guatelli@gmail.com") // devuelve un objeto con informacion sobre el matcheo
                                            // como el indice donde empezó el match y más

"sol.guatelli@gmail.com".match(regex2) // otra manera de matchear