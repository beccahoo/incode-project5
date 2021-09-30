function routetoLogin(req, res, next) {
    if (!req.session.userId) {
        return res.render('./pages/login', {
            errMsg: 'Login is required to rate movie'
        })
    }
    next()
    
        
}

module.exports = routetoLogin