'use strict'

import{ api_key, fetchDataFromServer } from "./api.js"

export function sidebar (){

    
    const genreList = {}

    fetchDataFromServer('https://api.themoviedb.org/3/genre/movie/list?api_key=a5e6eb43e57de6279ab1313d2e104850', 
    function({genres}){

        for(const{id, name} of genres){
            genreList[id] = name
        }

        genreLink()
    })

    const sidebarInner = document.createElement("div")
    sidebarInner.classList.add("sidebar-inner")

    sidebarInner.innerHTML = `
    <div class="sidebar-list">
        <p class="title">Genre</p>
    </div>

    <div class="sidebar-list">
        <p class="title">Language</p>

        <a href="movie-list.html" menu-close class="sidebar-link" 
        onclick='getMovieList("with_original_language=en", "English")'>English</a>

        <a href="movie-list.html" menu-close class="sidebar-link"
        onclick='getMovieList("with_original_language=pt", "Portuguese")'>Portuguese</a>

    </div>

    <div class="sidebar-footer">
        <p class="copyright">
        Copyright 2023 <a href="https://github.com/JoaoDev1601" target="_blank">JoaoDev</a>
        </p>

        <img src="img/tmdb-logo.svg" width="130" height="17" alt="movie database logo">
    </div>
    `

    const genreLink = function(){

        for(const [genreId, genreName] of Object.entries (genreList)){

            const link = document.createElement("a")
            link.classList.add("sidebar-link")
            link.setAttribute("href", "./movie-list.html")
            link.setAttribute("menu-close", "")
            link.setAttribute("onclick", `getMovieList("with_genres=${genreId}", "${genreName}")`)
            link.textContent = genreName

            sidebarInner.querySelectorAll(".sidebar-list")[0].appendChild(link)

        }

        const sidebar = document.querySelector("[sidebar]")
        sidebar.appendChild(sidebarInner)
        toggleSidebar(sidebar)

    }

    const toggleSidebar = function(sidebar){
        const sidebarBtn = document.querySelectorAll("[menu-btn]")
        const sidebarToggler = document.querySelectorAll("[menu-toggler]")
        const sidebarClose = document.querySelectorAll("[menu-close]")
        const overlay = document.querySelectorAll("[overlay]")

        addEventOnElements(sidebarToggler, "click", function(){
            sidebar.classList.toggle("active")
            sidebarBtn.classList.toggle("active")
            overlay.classList.toggle("active")
        })

        addEventOnElements(sidebarClose, "click", function(){
            sidebar.classList.remove("active")
            sidebarBtn.classList.remove("active")
            overlay.classList.remove("active")
        })
    }
}
