'use strict'

import { api_key, fetchDataFromServer } from "./api.js"
import { createMovieCard } from "./movie-card.js"
import { sidebar } from "./sidebar.js"
import { search } from "./search.js"

const genre = window.localStorage.getItem("genre")
const urlParam = window.localStorage.getItem("urlParam")
const pageContent = document.getElementById("page-content")

sidebar()

let currentPage = 1
let totalPages = 0

fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=a5e6eb43e57de6279ab1313d2e104850&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`, 
function( { results: movieList, total_pages }){
    totalPages = total_pages

    document.title = `${genre} Movies - MyFlix`

    const movieListElem = document.createElement("section")
    movieListElem.classList.add("movie-list", "genre-list")
    movieListElem.ariaLabel = `${genre} Movies`

    movieListElem.innerHTML = `
    <div class="title-wrapper">
        <h1 class="heading">All ${genre} Movies</h1>
    </div>

    <div class="grid-list"></div>

    <button class="btn load-more" load-more>Load More</button>
    `

    for (const movie of movieList){
        const movieCard = createMovieCard(movie)

        movieListElem.querySelector(".grid-list").appendChild(movieCard)
    }
    
    pageContent.appendChild(movieListElem)

    document.querySelector("[load-more]").addEventListener("click", function() {

        if (currentPage >= totalPages){
            this.style.display = "none" //this == loadin-btn
            return
        }

        currentPage++
        this.classList.add("loading") //this == loadin-btn

        fetchDataFromServer(`https://api.themoviedb.org/3/discover/movie?api_key=a5e6eb43e57de6279ab1313d2e104850&sort_by=popularity.desc&include_adult=false&page=${currentPage}&${urlParam}`,
        ({results: movieList}) => {
            this.classList.remove("loading") //this == loadin-btn

            for (const movie of movieList) {
                const movieCard = createMovieCard(movie)

                movieListElem.querySelector(".grid-list").appendChild(movieCard)
            }
        })

    })
    
})

search()