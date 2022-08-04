/*const buttons = document.querySelectorAll('button');

// button.onclick = function() {

// };

const buttonClickHandler = event => {
  // event.target.disabled = true;
  console.log(event);
};

const anotherButtonClickHandler = () => {
  console.log('This was clicked!');
};

// button.onclick = buttonClickHandler;
// button.onclick = anotherButtonClickHandler;

const boundFn = buttonClickHandler.bind(this);

// button.addEventListener('click', buttonClickHandler);

// setTimeout(() => {
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000);

buttons.forEach(btn => {
  btn.addEventListener('click', buttonClickHandler);
});*/

// INFINITE SCROLLING

let curElementNumber = 0;

function scrollHandler() {
  const distanceToBottom = document.body.getBoundingClientRect().bottom;
  console.log(distanceToBottom)
  console.log(document.documentElement.clientHeight)
  if (distanceToBottom < document.documentElement.clientHeight + 150) {
    const newDataElement = document.createElement('div');
    curElementNumber++;
    newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
    document.body.append(newDataElement);
  }
}

window.addEventListener('scroll', scrollHandler);

// PREVENT DEFAULT IN FORMS

/*Un metodo que pertenece al objeto Event y nos permite prevenir las acciones por default de ciertas acciones
en el DOM. Por ejemplo: formularios que se envian y links que se clickean
*/

const formEl = document.querySelector("form")
formEl.addEventListener("submit",(evt) => {
  console.log(evt)
  evt.preventDefault()
})

// BUBBLING AND CAPTURING

const button = document.querySelector("button")
const div = document.querySelector("div")

div.addEventListener("click",() => {
  console.log("DIV object clicked!")
})

button.addEventListener("click",(e) => {
  e.stopPropagation()
  console.log("BUTTON object clicked!")
})

/*BUBBLING: Por default, todos los elementos del DOM ejecutan sus funciones debido a eventos en forma de burbuja
Es decir, que en una estructura de elementos donde cada uno está escuchando el mismo evento,
la primera funcion en ejecutarse es la mas anidada y luego se ejecutan las mas exteriores
tal como las burbujas que suben hacia arriba*/

/*CAPTURING: podemos invertir este comportamiento al pasar un tercer parametro a addEventListener
div.addEventListener("click",() => {
  console.log("DIV object clicked!")
},true) --> ahora es parte de la fase de capturing

button.addEventListener("click",() => {
  console.log("BUTTON object clicked!")
}) --> no hace falta ponerlo aca
*/

/*Tanto bubbling como capturing, lo que observamos es EVENT PROPAGATION, los elementos padres
de nuestro elemento tambien escuchan el mismo evento. Y esto se puede detener con:
EVENTOBJECT.stopPropagation()
NOTA: no todos los eventos son propagables, lo chequeamos con:
EVENTOBJECT.bubbles == true o false
*/

// EVENT DELEGATION

const liItems = document.querySelectorAll("li")
/*liItems.forEach(li => {
  li.addEventListener("click",(event) => {
    event.target.classList.toggle("highlight")
  })
})*/

/*En vez de agregar eventListeners a cada elemento, lo cual es malo desde el punto de vista de la performance,
podemos hacer uso de Event Delegation al poner el eventListener en el elemento padre ya que event.target
sigue referenciando el objeto especifico que en este caso es un LI
*/

const list = document.querySelector("ul")
/*list.addEventListener("click",(event) => {
  console.log(event.target)
  console.log(event.currentTarget) // se refiere al elemento donde adherimos el eventListener
  event.target.classList.toggle("highlight")
  // event.target.closest("li").classList.toggle("highlight")  // cuando el objeto anidado es complejo,
  // y tiene mas elementos anidados, nos aseguramos elegir el elemento correcto sin importar donde cliqueamos
})*/

// TRIGGERING DOM ELEMENTS PROGRAMMATICALLY

/* Ademas de escuchar eventos, podemos ejecutar eventos desde JavaScript
 */

list.addEventListener("click",event => {
  event.target.closest("li").classList.toggle("highlight")
  formEl.submit() // Simulamos la ejecucion del evento, en este caso vemos que aunque tengamos un eventListener
  // no se ejecuta la callback function, por lo que no es exactamente lo mismo simular que escuchar el evento
  // para todos los eventos, en el casos de botones si es igual por ej
})


