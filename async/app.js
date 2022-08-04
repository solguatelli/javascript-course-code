//--ASYNC JAVASCRIPT--

console.log("BEFORE")

setTimeout(() => console.log("HELLO"), 3000); // Esta funcion corre una vez luego de este tiempo

console.log("LATER")

/* setInterval(() => {
  console.log(Math.random()) // Esta funcion se repite en un loop infinito cada tanto tiempo
}, 2000);
 */
// Como paramos esto?

// Necesitamos primero guardar nuestro Interval en una variable para luego identificarlo
// la funcion setInterval devuelve el ID de dicho intervalo

const id = setInterval(() => {
    console.log(Math.random()) // Esta funcion se repite en un loop infinito cada tanto tiempo
}, 2000);

// Ya con el id usamos la funcion clearInterval(id)

clearInterval(id)


//-- JAVASCRIPT TIENE UN UNICO HILO

/*
Un hilo es un proceso que usa un programa para ejecutar una tarea, y una sola tarea a la vez puede ser ejecutada
Es decir que si nosotros clickeamos un boton en la pantalla, y su función tarda cierto tiempo en terminar, no
vamos a poder clickear otro boton y tener respuesta inmediata ya que el proceso anterior no terminó.

Entonces para evitar demoras y UIs bloqueadas aparece async javascript. El navegador que si es multihilo nos
permite entregarle tareas que se demoran o esperan una respuesta para así no bloquear la pagina
*/

//-- SET TIMEOUT Y SET INTERVAL

const button = document.querySelector("button")

const getPosition = (opts) => {
    const promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            resolve(position)
        }, error => {
            reject(error)
        })
    })
    return promise
}

const setTimer = (duration) => {
    // El constructor Promise permite envolver funciones que no tienen soporte para promesas(no permiten usar "then"
    // por ej)
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Done")
        }, duration)
    })

    return promise
}

function trackUserHandler() {
    // 1. Primer metodo, usando las funciones asincronicas clasicas sin soporte para promesas
    /*navigator.geolocation.getCurrentPosition(posData => {
      /!*
      setTimeout(() => {
        console.log(posData)
      },2000)
      *!/

      // 2. Envolvemos la funcion setTimeout dentro de una promesa asi podemos usar los metodos then y cath
      // y evitamos indentacion
      setTimer(2000).then((data) => {console.log(data, posData)})

    }, error => {
      console.log(error)
    })*/

    // 3. Envolvemos tmb getCurrentPosition en una promesa para hacerlo mas corto y encadenamos las promesas

    let positionData

    getPosition().then((posData) => {
        positionData = posData // si no guardamos esta info la perdemos al devolver otra promesa y perder la actual
        return setTimer(2000) // pasamos de tener la promesa de posData resuelta a una de setTimer pendiente
    }).catch(error => {
        console.log(error)
    }).then((data) => {
        console.log(data, positionData)
    })

    /*Para actuar en caso de fracaso con la promesa, usamos el bloque catch o
    lo pasamos como 2do parametro a 'then', no importa que tan larga es la cadena y donde se produzca
    el error, la logica de catch se ejecuta.
    Como los proximos .then() siguen ejecutandose*/

    setTimeout(() => {
        console.log("Timer done!")
    }, 0)
    // setTimer(0).then(() => {console.log("Timer done!")})

    // No importa que el tiempo sea 0, por ser una funcion que se pasa al navegador, queda en el Message Queue
    // hasta que el call stack se vacia y el event loop lo manda a ejecutar. Es decir que siempre toman esa ruta
    console.log("User tracked!")
}

button.addEventListener("click", trackUserHandler)

//-- PROMISES

/*Las promesas aparecen por la necesidad de escribir codigo async mas ordenado y limpio ya que
a veces se llega a varios niveles de indentacion y se ve desorganizado.
Son objetos que representan la eventual terminacion(o fracaso) de una operacion asincronica y su valor retornado
*/

//-- ASYNC AND AWAIT KEYWORD

/*
Otra posibilidad para tratar nuestro código asincrono es la keyword 'async'. Esta se coloca delante de las funciones
(y solo funciona con funciones) y cambiando su comportamiento. Primero hace que la funcion devuelva una promesa
y segundo envuelve atodo el codigo dentro de lo que seria el constructor Promise()

*/

function trackUserHandlerAsync() {

    let positionData

    getPosition().then((posData) => {
        positionData = posData
        return setTimer(2000)
    }).catch(error => {
        console.log(error)
    }).then((data) => {
        console.log(data, positionData)
    })

    setTimeout(() => {
        console.log("Timer done!")
    }, 0)

    console.log("A random message!")
}


