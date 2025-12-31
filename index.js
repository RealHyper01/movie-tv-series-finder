const form = document.getElementById("search-form")
const userInput = document.getElementById("search-input")
const error = document.getElementById("error-message")
const img = document.getElementById("poster")
const title = document.getElementById("title")
const year = document.getElementById("year")
const rated = document.getElementById("rated")
const runtime = document.getElementById("runtime")
const genre = document.getElementById("genre")
const director = document.getElementById("director")
const writer = document.getElementById("writer")
const actors = document.getElementById("actors")
const plot = document.getElementById("plot")
const language = document.getElementById("language")
const country = document.getElementById("country")
const totalSeasons = document.getElementById("total-seasons")
const seasonsContainer = document.getElementById("seasons-container")
const imdbRating = document.getElementById("imdb-rating")
const imdbVotes = document.getElementById("imdb-votes")
const metascore = document.getElementById("metascore")
const boxOffice = document.getElementById("box-office")
const type = document.getElementById("type")
const imdbID = document.getElementById("imdb-id")
const cardDiv = document.getElementById("result")

form.addEventListener("submit", (e) =>{
    e.preventDefault()
    search()
})

async function search(){
    try{
        error.innerHTML = ""
        let query = userInput.value.trim()
        if(!query) return

        let finalInput = encodeURIComponent(query)
        let api = `https://www.omdbapi.com/?apikey=e5b6558a&t=${finalInput}`

        let response = await fetch(api)
        let data = await response.json()

        if(data.Response === "False") {
            error.innerHTML = "Invalid search! No movies/tv series found!"
            cardDiv.classList.add("hidden")
            return
        }

        cardDiv.classList.remove("hidden")
        img.src = data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/150x225?text=No+Image"
        img.alt = data.Title

        title.innerHTML = data.Title
        type.innerHTML = data.Type
        year.innerHTML = data.Year
        rated.innerHTML = data.Rated
        runtime.innerHTML = data.Runtime
        genre.innerHTML = data.Genre
        director.innerHTML = data.Director
        writer.innerHTML = data.Writer
        actors.innerHTML = data.Actors
        plot.innerHTML = data.Plot
        language.innerHTML = data.Language
        country.innerHTML = data.Country

        if(data.Type === "series") {
            seasonsContainer.style.display = "block"
            totalSeasons.innerHTML = data.totalSeasons || "N/A"
        } else {
            seasonsContainer.style.display = "none"
        }

        imdbRating.innerHTML = data.imdbRating
        imdbVotes.innerHTML = data.imdbVotes
        metascore.innerHTML = data.Metascore
        boxOffice.innerHTML = data.BoxOffice || "N/A"
        imdbID.innerHTML = data.imdbID

    } catch(err) {
        console.error(err)
        error.innerHTML = "Something went wrong. Try again!"
        cardDiv.classList.add("hidden")
    }
}
