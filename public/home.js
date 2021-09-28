

const url = "https://api.themoviedb.org/3";
const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
const popular_movies = "/movie/popular";
const api_key = "?api_key=3523b8b1a53ce015b3b81c8ebec8708c";
var popular_movies_route = url + popular_movies + api_key;

$.ajax(popular_movies_route)
    .then(data => {
    // console.log(data.results)
        let unorderedList = $("<ul class='results'>")
        for(let film of data.results) {
            // console.log(film)
            // console.log(1)
            let lists = $("<li class = 'result-item'>")
            let movieLink = $(`<a href='/movieinfo/${film.id}'>`)
            movieLink.append(`<img class="result-item-image" src="${imageBaseUrl + film.poster_path}" alt="image">`)
            movieLink.append(`<h3>Title: ${film.title}`)
            let movieDetails = $(`<div class = "movie-details">`)
            movieDetails.append(`<p>Rating: ${film.vote_average}`)
            movieDetails.append(`<p>Count: ${film.vote_count}`)
            movieLink.append(movieDetails)
            let overview = $(`<div class="overview">`)
            overview.append(`<h4>Overview:</h4><p>${film.overview}</p>`)
            movieLink.append(overview)
            lists.append(movieLink)
            unorderedList.append(lists)
        }
        // console.log(unorderedList)
        $('.container').append(unorderedList)
    })

