const express = require('express');

const loginRouter = require('./routes/login');
const session = require('express-session')
// import axios from "axios";
// import express from "express"
//import fetch from 'node-fetch';
const axios = require('axios');
const expressLayouts = require('express-ejs-layouts')


const app = express();

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


//var for session
const Time = 1000 * 60 * 60 * 1;
//cookie session
app.use(session({
    name : 'mr_csid',
    resave : false,
    saveUninitialized : false,
    secret : `${process.env.SECRET_SESS_KEY}` || 'lejncjksencc',
    cookie :{
        maxAge : Time,
        sameSite : true,
    }
}))



//api details
const url = "https://api.themoviedb.org/3";
imageBaseUrl = 'https://image.tmdb.org/t/p/original';
const popular_movies = "/movie/popular?";
const api_key = "api_key=3523b8b1a53ce015b3b81c8ebec8708c";
var popular_movies_route = url + popular_movies + api_key;
// console.log(popular_movies_route)


app.get('/', async(req, res) => {
    const data = await axios.get(popular_movies_route)
    // console.log(data.data.results)
    res.render('./pages/home', {
        results: data.data.results,
        imageBaseUrl
    })
    
})

app.get('/movieinfo/:id', async(req, res) => {
    const movieIdRoute = `/movie/${req.params.id}?`
    const individualMovie = url+movieIdRoute+api_key
    const data = await axios.get(individualMovie)
    console.log(individualMovie)
    res.render('./pages/movieinfo',{
        result: data.data,
        imageBaseUrl 
    })
})

app.use('/login', loginRouter);


app.get('/login', (req, res) => {
    res.render('./pages/login')
})



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
