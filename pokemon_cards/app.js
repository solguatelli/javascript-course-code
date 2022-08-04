console.log("Hello world!")

// Link para las pokem sprites 


let spriteLink = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
let gallery = document.querySelector("#gallery")

for(let i = 1; i < 151 ; i++){
  let newSprite = document.createElement("img");
  newSprite.src = spriteLink + i + ".png"

  let newSpan = document.createElement("span")
  newSpan.innerText = "#" + i;
  
  let newDiv = document.createElement("div")
  newDiv.classList.add("sprite-container")
  newDiv.appendChild(newSprite);
  newDiv.appendChild(newSpan);

  gallery.appendChild(newDiv)
}