const key = 'af5197d8'

const input = document.getElementById('title-input')

const searchList = document.getElementById('results')

const movieImg = document.getElementById('movie-img')

const movieInfo = document.getElementById('movie-info')

async function getMovies (movie) {//pribavljanje podataka
    const url = `http://www.omdbapi.com/?s=${movie}&page=1&apikey=${key}`
    const results = await fetch (url)
    const data = await results.json()
    console.log(data.Search)
    displayMovies(data.Search)
}

function findMovie () {//prikaivanje rezultata
    let item = (input.value).trim()//trim()-izbacuje nepotrebne razmake na pocetku i na kraju
    if (item.length > 0) {
        searchList.style.display = 'block'
        getMovies(item)//pozivanje glavne funkcije
    } else {
        searchList.style.display = 'none'
    }
}

input.addEventListener('keyup', findMovie)
//input.addEventListener('input', filteredResults)

function displayMovies(movies) {
    
    searchList.innerHTML = ''

    for (let i = 0; i < movies.length; i++) {

        const movie = document.createElement('div')
        movie.classList.add('search')
        searchList.appendChild(movie)

        const img = document.createElement('img')
        img.classList.add('search-img')
        img.src = movies[i].Poster
        img.alt = 'Poster not found'
        movie.appendChild(img)
        
        const title = document.createElement('h4')
        title.classList.add('title', 'ms-auto')
        title.innerHTML = movies[i].Title
        movie.appendChild(title)

        const id = movies[i].imdbID

        movie.addEventListener('click', showMovie)

        async function showMovie () {

            const result = await fetch (`https://www.omdbapi.com/?i=${id}&apikey=${key}`)
            const details = await result.json()
            console.log(details)

            movieImg.innerHTML = ''
            movieInfo.innerHTML = ''

            const image = document.createElement('img')
            image.classList.add('poster')
            image.src = details.Poster
            image.alt = 'Poster not found'
            movieImg.appendChild(image)

            const year = document.createElement('p')
            year.innerHTML = `Year: ${details.Year}`
            movieInfo.appendChild(year)

            const genre = document.createElement('p')
            genre.innerHTML = `Genre: ${details.Genre}`
            movieInfo.appendChild(genre)

            const director = document.createElement('p')
            director.innerHTML = `Director: ${details.Director}`
            movieInfo.appendChild(director)

            const writer = document.createElement('p')
            writer.innerHTML = `Writers: ${details.Writer}`
            movieInfo.appendChild(writer)

            const actors = document.createElement('p')
            actors.innerHTML = `Actors: ${details.Actors}`
            movieInfo.appendChild(actors)

            const plot = document.createElement('p')
            plot.innerHTML = `Plot: ${details.Plot}`
            movieInfo.appendChild(plot)

            const awards = document.createElement('p')
            awards.innerHTML = `Awards: ${details.Awards}`
            movieInfo.appendChild(awards)

            const rating = document.createElement('p')
            rating.innerHTML = `IMDB Rating: ${details.imdbRating}`
            movieInfo.appendChild(rating)

            movieInfo.querySelectorAll('p').forEach(item => item.classList.add('fw-bolder'))
        }
    }
}

window.addEventListener('click' , function () {
    searchList.style.display = 'none'
})
