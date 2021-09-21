const express = require('express')
const router = express.Router
const bcrypt = require("bcryptjs")
const db = require('../database') // not yet created database file
const { check, validationResult } = require('express-validator') // I downloaded express-validator to validate my email and password

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
        

    }





})

