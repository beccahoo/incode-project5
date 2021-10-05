const db = require('../database')

function routetoDetailsPage(req, res, next) {
    user_id = req.session.userId
    movie_id = req.app.locals.movie_id
    db.any('SELECT rating FROM ratings WHERE user_id=$1 AND movie_id=$2',
        [user_id, movie_id])
        .then(data => {
            // console.log(data)
            if (data.length !== 0) {
                return res.render('./pages/movieinfo', {
                    id: movie_id,
                    loginCheck:req.session.userId,
                    rateMsg: 'You have already rated this Movie'
                })
            
            } 
            next()
        })
        .catch(err => {
        console.log(err)
    })


    
}


module.exports = routetoDetailsPage
