let btn = document.querySelector("#btn");
let body = document.querySelector("body");
let h3 = document.querySelector("h3");

const randNum = () => Math.floor(Math.random() * 255 + 1);

const randColor = () => {
  let r = randNum()
  let g = randNum()
  let b = randNum()
  return `rgb(${r},${g},${b})`;
}

btn.addEventListener("click", () => {
  
  let rgb = randColor();
  h3.innerText = rgb;
  body.style.backgroundColor = rgb;
})