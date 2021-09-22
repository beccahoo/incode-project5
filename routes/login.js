const express = require('express')
const router = express.Router
const bcrypt = require("bcryptjs")
const db = require('../database') // not yet created database file
const { check, validationResult } = require('express-validator') // I downloaded express-validator to validate my email and password

// add redirecttoHome if can't logged in --> Home is the movie page
router.post('/', (req, res) => {
    const {email, password} = req.body

    // 1. Validate email and password
    [ check( "email", "Please enter valid email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .toLowerCase(),

    check ("password", "Please enter valid password")
    .isLength({min: 8})
    .trim()
],
    // 1.1 Insert validation, display error and render login page again
    const {email, password} = req.body
    const errors = validationResult()

    if(!errors.isEmpty()) { //  make sure that an input on a form is not empty
        const errMsgs = errors.array();
        res.render("../view/pages/login", {errMsgs}) // have not created login ejs page
    } else {

        // 2. Check if the email exist in the database
        const cleanedEmail = email.toLowercase().trim()
        db.oneOrNone('SELECT * FROM users WHERE email=$1,', cleanedEmail)
        .then (user => {
            if(!user) {
                res.redirect('/login?message=Email%20or%20password%20is%20invalid')
            } else {

                // 3. If so, verify password and edit session
                bcrypt.compare(password, user.password)
                .then(result => {
                    if(result) {
                        // 3.1 Edit session and redirect with success message
                        req.session.userId = user.userId // check whether userId entered is equal to userID stored in db
                        res.send('Successfully logged in!')
                    
                    } else {
                        res.redirect('/login?message=Email%20or%20password%20is%20incorrect')
                    }
                })
                .catch(error => {
                    console.log(error)
                    res.send(error)
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
    }
})

module.exports = router