
const url = "https://api.themoviedb.org/3";
const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
const popular_movies = "/movie/popular";
const api_key = "?api_key=3523b8b1a53ce015b3b81c8ebec8708c";
var popular_movies_route = url + popular_movies + api_key;
var searchUrl = url + '/search/movie' + api_key;

let genreUrl = url + '/genre/movie/list' + api_key

getGenre(genreUrl);
getMovies(popular_movies_route);

$(".search-bar").on('submit', (e) => {
    e.preventDefault();
    string = $(".search-box").val();
    if (string) {
        let searchMovieUrl = searchUrl + '&query=' + string
    //console.log(searchMovieUrl)
        getMovies(searchMovieUrl)
    } else {
        getMovies(popular_movies_route)
    }
    
})

$(".genre").on("change", (e) => {
    e.preventDefault();
    //console.log(1)
    //console.log($("#genre").val())
    let genre_name = $("#genre").val();
    // console.log(genre_name.length)
    if (genre_name.length > 0) {
        discoverMoviesUrl = 'https://api.themoviedb.org/3/discover/movie' + api_key + `&with_genres=${genre_name}`;
        //console.log(discoverMoviesUrl)
        getMovies(discoverMoviesUrl);
    } else {
        getMovies(popular_movies_route)
    }
    
})







function getMovies(url) {
    $.ajax(url)
        .then(data => {
             console.log(data.results)
        showMovies(data)
        })
        .catch(err => {
        console.log(err)
    })
}


function showMovies(data) {
    $(".container").append($(".result-body").empty())
    // $('.container').append($(".result-body").html(''))
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
        $(".result-body").append(unorderedList)
        $('.container').append($(".result-body"))
}


function getGenre(url) {
    $.ajax(url)
        .then(genre => {
            // $(".genre").empty()
            // console.log(genre)
            let select = $("<select id='genre'>")
            select.append(`<option class='option-genre' value="">Select the Genre`)
            for (let gen of genre.genres) {
                // console.log(gen)
                select.append(`<option class='option-genre' value="${gen.id}">${gen.name}`)
            }
            $(".genre").append(select)
            $('.container').append($(".genre"))

            

            
        })
        .catch(err => {
        console.log(err)
    })
}




// $.ajax(popular_movies_route)
//     .then(data => {
//     // console.log(data.results)

//         let unorderedList = $("<ul class='results'>")
//         for(let film of data.results) {
//             // console.log(film)
//             // console.log(1)
//             let lists = $("<li class = 'result-item'>")
//             let movieLink = $(`<a href='/movieinfo/${film.id}'>`)
//             movieLink.append(`<img class="result-item-image" src="${imageBaseUrl + film.poster_path}" alt="image">`)
//             movieLink.append(`<h3>Title: ${film.title}`)
//             let movieDetails = $(`<div class = "movie-details">`)
//             movieDetails.append(`<p>Rating: ${film.vote_average}`)
//             movieDetails.append(`<p>Count: ${film.vote_count}`)
//             movieLink.append(movieDetails)
//             let overview = $(`<div class="overview">`)
//             overview.append(`<h4>Overview:</h4><p>${film.overview}</p>`)
//             movieLink.append(overview)
//             lists.append(movieLink)
//             unorderedList.append(lists)
//         }
//         // console.log(unorderedList)
//         $('.container').append(unorderedList)
//     })

