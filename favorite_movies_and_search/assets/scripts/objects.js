const addMovieBtn = document.querySelector("#add-movie-btn");
const searchBtn = document.querySelector("#search-btn");


const movies = []
let idCount = 0

const renderMovies = (filter = "") => {
    const moviesList = document.querySelector("#movie-list")
    if(movies.length !== 0){
        moviesList.classList.add("visible")
    } else {
        moviesList.classList.remove("visible")
        return
    }
    moviesList.innerHTML = ""

    const filteredMovies = !filter ? movies : movies.filter((movie) => {
        return movie.info.title === filter
    })

    for(const movie of filteredMovies){
        const {info} = movie
       const movieLI = document.createElement("li")
       let text = info.title + " - "
       for(let key in info){
           if(key !== "title"){
            text += `${key} : ${info[key]}`
           }
       }
       movieLI.textContent = text
       moviesList.append(movieLI)
    }
}

const addMovieHandler = () => {
    const title = document.querySelector("#title").value;
    const extraName = document.querySelector("#extra-name").value;
    const extraValue = document.querySelector("#extra-value").value;

    if (title.trim() === "" || extraName.trim() === "" || extraValue === "") {
        alert("Please complete all fields");
        return;
    }

    const newMovie = {
        id : idCount,
        info : {
          title, // if key name and value name are the same you can use this shorthand syntax
          [extraName] : extraValue
        }, 
    }
    idCount++
    movies.push(newMovie)
    console.log(movies)
    renderMovies()
};

const searchHandler = function() {
    console.log(this)
    const filterTerm = document.querySelector("#filter-title").value
    renderMovies(filterTerm)
}

addMovieBtn.addEventListener("click",addMovieHandler)
searchBtn.addEventListener("click",searchHandler)

/* const dummyBtn = document.querySelector("#dummy-btn")
dummyBtn.addEventListener("click",function (evt) {
    console.log(this)
    console.log(evt)
}) */