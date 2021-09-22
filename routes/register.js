const express =require('express')
const bcrypt = require('bcrypt')
const db = require("../database") // have not created the database js script
const router = express.Router()

router.get('/', (req, res) => {
    res.render('pages/register') // have not created the register/signup page - might need to change the route
})

router.post('/', (req, res) => {
    const {firstname, lastname, email, password} = req.body
    // 1. validate user data (want to include a function to check whether password confirmation is accurate not sure how)
    // 2. check if the user already exists in the database
    db.oneOrNone("SELECT * FROM users WHERE email =$1,", [email]) // do we have to use cleanedEmail here or email is fine?
    .then(userExists => {
        if(userExists) {
            res.redirect("/login?message=User%20already%20exists")
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
            const cleanedEmail = email
            .toLowerCase()
            .trim()

            db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, cleanedEmail, hash] )
            .then (() => {
                res.redirect('/login?message=User%20successfully%20created')
            })
            catch((err) => {
                console.log(err)
                res.json(err)
            })
        }
    }) 
    .catch((err) => {
        console.log(err)
        res.json(err)
    })
})

module.exports=router