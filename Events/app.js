let v2Btn = document.querySelector("#v2Btn")

v2Btn.onclick = function() {
  console.log("Me clickeaste! Ahora somos enemigos!")
}

function scream(){
  console.log("NO TE ME ACERQUES!!")
}

v2Btn.onmouseenter = scream; // yo no ejecuto la llamada, solo la paso al manejador de eventos para usarla solo si
// se dispara dicho evento.

// addEventListener

let v3Btn = document.querySelector("#v3Btn")

v3Btn.addEventListener("click",function(){
  alert("Deja de clickear botones!")
})

// addEventListener vs onclick(y estas otras propiedades)

let v4Btn = document.querySelector("#v4Btn");

function twist(){
  console.log("TWIST!")
}

function shout(){
  console.log("SHOUT!")
}

/* v4Btn.onclick = twist;
v4Btn.onclick = shout;  */
// Esto no funciona, no agrego ambas funciones a dicho evento, solo queda el segundo

/* v4Btn.addEventListener("click",twist,{once : true});
v4Btn.addEventListener("click",shout,{once : true}); */

// Tmb podemos pasar un objeto con opciones que le dan mas personalizacion a nuestro event handler

v4Btn.addEventListener("click",function(event) {
  console.log(this);
  console.log(event)// Nos muestra los detalles del objeto boton v4Btn
})

// El objeto EVENT

const eventBtn = document.querySelector("#eventBtn")

eventBtn.addEventListener("click",function(event){
  console.log(event);
})

// Eventos de teclado

const input = document.querySelector("input")

input.addEventListener("keydown",function(event){
  console.log("KEYDOWN")
  console.log(event)
  console.log(event.key) // representa el valor en texto de lo apretado
  console.log(event.code) // sirve cuando necesitamos la posicion en el teclado de dicha tecla
  // ejemplo para diferenciar ambas: letra 'ñ'
})

// Escuchar el teclado en toda la pagina

document.addEventListener("keydown", function(event){

  switch (event.code) {
    case "ArrowUp":
      console.log("GO UP")
      break;
    case "ArrowDown":
      console.log("GO DOWN")
      break;
    case "ArrowLeft":
      console.log("GO LEFT")
      break;
    case "ArrowRight":
      console.log("GO RIGHT")
      break;
    default:
      console.log("Use arrow keys to move!")
      break;
  }
})






