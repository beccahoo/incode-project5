const express = require('express')
const router = express.Router
const bcrypt = require("bcryptjs")
const db = require('../database')
const { check, validationResult } = require('express-validator')

router.post('/', (req, res) => {
    const {email, password} = req.body

    // 1. Validate email 
    [ check( "email", "Please enter valid email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .toLowerCase(),

    check ("password", "Please enter valid password")
    .isLength({min: 8})
    .trim()
],
    // 2. 


})

