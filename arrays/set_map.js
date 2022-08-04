// OTRAS ESTRUCTURAS DE DATOS: MAPS Y SETS

// SETS: el orden no está garantizado, no se permiten valores duplicados

let ids = new Set([3,6,21,23,5,5,5]);
console.log(ids)
console.log(ids.has(1)) // devolvera true si lo contiene y falso si no

for(let entry of ids.entries()){
    console.log(entry) // cada entry es una dupla con los mismos dos valores
}

ids.add(6)
// Por cada elemento que tratemos de agregar, internamente se usa Object.is() para ir comparando con cada uno de los
// valores del set y chequear que no exista en el
ids.delete(5)

let new_set = new Set([1,2,3,4,5,6,7,7,7,7,7,7,7,7,7,8])
console.log(new_set)
console.log(new_set.size) // igual que Array.length

new_set.clear() // eliminamos todos los valores

// WEAKSETS: sirven para guardar referencias a objetos y nada mas

// MAPS : el orden está garantizado, no se permiten llaves duplicadas. A diferencia de los objetos,
// los maps nos permiten utilizar CUALQUIER valor como llave

const person1 = {name:  "Max"}
const person2 = {name : "Sol"}

const personData = new Map([[person1, [{date: "yesterday",price : 22}]]])
console.log(personData)
console.log(personData.get(person1))

personData.set(person2, [{date: "today",price : 200}])

for(const entry of personData.entries()){ // aca tiene mas sentido usar entries() ya que devuelve la key y el value
    console.log(entry)
}


