const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const db = require('../database') // not yet created database file
const { check, validationResult } = require('express-validator'); // I downloaded express-validator to validate my email and password



router.get('/', async (req, res) => {
    try {
        res.render('./pages/login')
    }
    catch {
        console.log(err)
    }
       
})



// add redirecttoHome if can't logged in --> Home is the movie page
router.post('/',
    // 1. Validate email and password
    [check("email", "Please enter valid email")
        .isEmail()
        // .normalizeEmail()
        .trim()
        .toLowerCase(),
    check("password", "Please enter valid password")
        .isLength({ min: 8 })
        .trim(),
    ],
    async (req, res) => {
        try {
            const { email, password } = req.body;
        const errors = validationResult(req);
        console.log(errors)
    
        if (!errors.isEmpty()) {
            const errMsgs = errors.array();
            return res.render("./pages/login", { errMsgs });
        } else {

            //check if email exists in db
            console.log(email)
            console.log(typeof email)
            const user = await db.oneOrNone('SELECT * FROM users WHERE email =$1',email)
            console.log(user)
            if (!user) {
                return res.render('./pages/login', {
                    message: 'User does not exist.'
                })
            } else {
                if (password === user.password) {
                    req.session.userId = user.user_id;
                    req.session.userEmail = user.email;
                    return res.redirect('/');
                } else {
                    return res.render('./pages/login', {
                        message: "Email or password is incorrect."
                    });
                }
                    
            }
        }
        }
        catch (err) {
            console.log(err)
        }
    
    }
    );
    // 1.1 Insert validation, display error and render login page again

module.exports = router;




//bcrypt code

// bcrypt.compare(password, user.password, (err, result) => {
                        //     try {
                        //         if (result) {
                        //             req.session.userId = user.user_id;
                        //             req.session.userEmail = user.email;
                        //             res.redirect("/");
                                
                        //         } else {
                        //             res.redirect('/login?message=Email%20or%20password%20is%20incorrect.');
                        //         }
                        //     } catch (err) {
                        //         console.log(err);
                        //         res.send(err);
                        //     }
                        // });
