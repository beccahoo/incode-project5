const express = require('express');

const loginRouter = require('./routes/login');
const ratingRouter = require('./routes/rating');
const forgotpasswordRouter = require('./routes/forgotpassword');
const session = require('express-session')
// import axios from "axios";
// import express from "express"
//import fetch from 'node-fetch';
const axios = require('axios');
const expressLayouts = require('express-ejs-layouts')
const loginRouter = require('./routes/login')
const app = express();
const genres =  [
    {"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}
]

const tagsE1 = document.getElementById("tags");



//setting view enginne and layouts
app.set('view engine', 'ejs')
app.set('views', 'views');
app.use(express.static('public'));

app.use(expressLayouts)
app.set("layout", "./layouts/main")

//body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//route middleware
app.use('/login', loginRouter)

//api details
const url = "https://api.themoviedb.org/3";
imageBaseUrl = 'https://image.tmdb.org/t/p/original';
const popular_movies = "/movie/popular?";
const api_key = "api_key=3523b8b1a53ce015b3b81c8ebec8708c";
var popular_movies_route = url + popular_movies + api_key;
// console.log(popular_movies_route)

// Filtering Genres -> getting the results from API
varselectedGenre=[]
setGenre();
function setGenre() {
    tagsE1.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            } else {
                if(selectedGenre.includes(genre.id)){
                     selectedGenre.forEach((id, idx) => {
                         if(id == genre.id){
                        selectedGenre.splice(idx, 1); 
                    }
                })
             }else{
                 selectedGenre.push(genre.id);
             }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsE1.append(t);
    })

}

function highlightSelection()  {
    document.querySelectorAll('.tag')
    tags.forEach(tag => {
        tag.classlist.remove('highlight')
    })
    if(selectedGenre.length !=0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            hightlightedTag.classlist.add('highlight');
        })
    }
}


app.get('/', async(req, res) => {
    res.render('./pages/home')
    
})

app.get('/movieinfo/:id', async (req, res) => {
    const { id } = req.params
    app.locals.movie_id = id
    res.render('./pages/movieinfo',{
       id
    })
})

app.use('/login', loginRouter);

app.use('/forgotpassword', forgotpasswordRouter);

//rating
 app.use('/rating', ratingRouter)


// const url = "https://api.themoviedb.org/3";
// const popular_movies = "/movie/popular?";
// const api_key = "api_key=3523b8b1a53ce015b3b81c8ebec8708c";
// var popular_movies_route = url + popular_movies + api_key





// app.get('/', (req, res) => {
    
//     console.log(popular_movies_route.results)

//     axios.get(popular_movies_route)
//         .then(data => {
//             console.log(data.data.results)
//             res.send(data.data)
//             // console.log(data.results.length)
//             // res.send(data.results)
//         }).catch(err => console.log(err))

//     })


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})
