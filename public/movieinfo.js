const url = "https://api.themoviedb.org/3";
const imageBaseUrl = 'https://image.tmdb.org/t/p/original';
const api_key = "?api_key=3523b8b1a53ce015b3b81c8ebec8708c";

$.ajax(`${url}/movie/${movie_id}${api_key}`)
    .then(data => {
        let posterImg = $(`<div class="image">`)
        posterImg.append(`<img src="${imageBaseUrl + data.poster_path}" alt="image">`)
        let genre = $(`<div class="genre">`)
        posterImg.append(genre)
        $(".movieinfo").append(posterImg)
        let contents = $(`<div class="contents">`)
        let title = $(`<div class="title">`)
        title.append(`<h2>Title: ${data.title}`)
        title.append(`<small class="tagline">${data.tagline}`)
        contents.append(title)
        let contentsBody = $(`<div class="contents-body">`)
        contentsBody.append(`<p><strong>Description:</strong> ${data.overview}`)
        contentsBody.append(`<p><strong>Country:</strong>${data.production_countries.map(each => each.name).join(', ')}`)
        contentsBody.append(`<p><strong>Date:</strong>  ${data.release_date}`)
        contentsBody.append(`<p><strong>Runtime:</strong> ${data.runtime} mins</p>`)
        contentsBody.append(`<p><strong>Rating:</strong> ${data.vote_average} <br><button class="individualRatingButton"><a href = "/rating" class ="individualRatingButtonA">Rate This Movie`)
        contentsBody.append(`<p><strong>Count:</strong> ${data.vote_count}`)
        contents.append(contentsBody)
        $(".movieinfo").append(contents)
    })
