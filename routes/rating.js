const express = require('express')
const router = express.Router();
const db = require('../database');
const routetoLogin = require('../middleware/routetoLogin')
const routetoDetailsPage = require('../middleware/routetoDetailsPage')


router.get("/", routetoLogin,routetoDetailsPage, async (req, res) => {
    try {
        // console.log(req.app.locals.movie_id)
        res.render("./pages/rating", {
            movie_id: req.app.locals.movie_id
        })
    } catch (err) {
        console.log(err)
    }
})


router.post("/", async (req, res) => {
    try {
        let { rating, movie_id } = req.body
        user_id = req.session.userId;
        // console.log(user_id)
        // console.log(movie_id)
        // console.log(req.body)
        await db.none('INSERT INTO ratings (user_id,movie_id,rating) VALUES ($1,$2,$3)',
            [user_id, movie_id, rating])
            res.send({status:true})
        
    } catch (err) {
        console.log(err)
        res.send({status:false,msg:"something went wrong"})
    }
})


module.exports = router;