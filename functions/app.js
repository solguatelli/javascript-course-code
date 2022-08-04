// -- Recursion
/*
Una funcion recursiva es la cual se llama a si misma durante su ejecucion. Se compone minimo de dos partes:
un caso base donde se para totalmente la ejecucion y otra donde se llama a si misma. El caso base es clave
ya que de lo contrario tendriamos llamadas infinitas y eso produciria un stack overflow
*/

function powerOf(x,n){
    if(n === 1)
        return x
    return x * powerOf(x,n-1)
}

function powerOf2(x,n){
    return n === 1 ? x : x * powerOf2(x,n-1)
}

// Beneficio 1: reducimos codigo

// Beneficio 2: podemos trabajar de manera segura con datos externos(que vienen de una BD por ej)

const myself = {
    name : "Max",
    friends : [
        {
            name : "Sara",
            friends : [
                {
                   name: "Gus"
                }
            ]
        },
        {
            name: "Math"
        },
        {
            name: "Anna"
        }

    ]
}

function getFriendNames(person){
    let collectedNames = []
    if(!person.friends){
        return []
    }

    for(const friend of person.friends){
        collectedNames.push(friend.name)
        collectedNames.push(...getFriendNames(friend))
    }

    return collectedNames
}

console.log(getFriendNames(myself))
