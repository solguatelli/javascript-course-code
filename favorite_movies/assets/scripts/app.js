const addMovieBtn = document.querySelector("header button")
const moviesList = document.querySelector("#movie-list")
const entrySection = document.querySelector("#entry-text")
/* Add Movie Pop Up */
const backdrop = document.querySelector("#backdrop")
const addModal = document.querySelector("#add-modal")
const successBtn = document.querySelector("#add-modal .btn--success")
const cancelBtn = document.querySelector("#add-modal .btn--passive")

const titleInput = document.querySelector("#title")
const imgUrlInput = document.querySelector("#image-url")
const ratingInput = document.querySelector("#rating")
/* Delete Movie Pop Up */
const deleteModal = document.querySelector("#delete-modal")
const deleteSuccessBtn = document.querySelector("#delete-modal .btn--danger")
const deleteCancelBtn = document.querySelector("#delete-modal .btn--passive")

const movies = []

function cleanInputs(){
  titleInput.value = ""
  imgUrlInput.value = ""
  ratingInput.value = ""
}

function updateUI(){
  if(movies.length === 0){
    entrySection.style.display = "block"
  } else {
    entrySection.style.display = "none"
  }
}

function closeDeleteModal(){
  deleteModal.classList.remove("visible")
}

function deleteMovie(title,element){
  /* Deleting the movie object from the array */
  let movieIndex;
  for(let i = 0; i < movies.length; i++){
    if(movies[i].title === title){
      movieIndex = i;
    }
  }
  movies.splice(movieIndex,1)
  /* Deleting the movie Element from HTML */  
  console.log(element)
  element.remove()
  deleteModal.classList.remove("visible")
  updateUI()
}

function deleteMovieHandler(title,element){
  deleteModal.classList.add("visible")
  deleteCancelBtn.addEventListener("click",closeDeleteModal)
  deleteSuccessBtn.addEventListener("click",deleteMovie.bind(null,title,element))
}

function createMovieElement(movie){
  let li = document.createElement("li")
  li.classList.add("movie-element")
  li.innerHTML= `
  <div class="movie-element__image">
    <img src="${movie.image}" alt="${movie.title}"/>
  </div>
  <div class="movie-element__info">
    <h2>${movie.title}</h2>
    <p>${movie.rating}/5 stars</p>
    <button class="btn btn--danger">Delete</button>
  </div>
  `
  li.querySelector("button").addEventListener("click",deleteMovieHandler.bind(null,movie.title,li))
  moviesList.appendChild(li);
}

addMovieBtn.addEventListener("click",() => {
  backdrop.classList.toggle("visible")
  addModal.classList.toggle("visible")
})

successBtn.addEventListener("click",() => {
  addModal.classList.remove("visible")
  backdrop.classList.toggle("visible")

  /* We gather the users input */
  let movieTitle = titleInput.value
  let movieUrl = imgUrlInput.value
  let movieRating = ratingInput.value

  let newMovie = {
    title: movieTitle,
    image: movieUrl,
    rating: movieRating
  }

  movies.push(newMovie)
  updateUI()
  createMovieElement(newMovie);
  cleanInputs()
})

cancelBtn.addEventListener("click",() => {
  addModal.classList.remove("visible")
  backdrop.classList.remove("visible")
})

