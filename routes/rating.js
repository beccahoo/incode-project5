const express = require('express')
const router = express.Router();

router.get("/", async (req, res) => {
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
        // console.log(movie_id)
        // console.log(req.body)
        res.send({status:true})
    } catch (err) {
        console.log(err)
        res.send({status:false, msg:'something went wrong'})
    }
})


module.exports = router;