'use strict'

const api_key= 'a5e6eb43e57de6279ab1313d2e104850'
const imageBaseURL = 'https://image.tmdb.org/t/p/'


const fetchDataFromServer = function(url, callback, optionalParam){
    fetch(url).then(response => response.json()).then(data => callback(data, optionalParam))
}

export{ imageBaseURL, api_key, fetchDataFromServer }