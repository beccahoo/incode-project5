const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs")
const db = require('../database') // not yet created database file
const { check, validationResult } = require('express-validator') // I downloaded express-validator to validate my email and password
// router.get('/login', (req, res) => {
//     res.render('./pages/login')
// })
// add redirecttoHome if can't logged in --> Home is the movie page
router.post("/login",
    // 1. Validate email and password
    [check("email", "Please enter valid email")
        .isEmail()
        .normalizeEmail()
        .trim()
        .toLowerCase(),
    check("password", "Please enter valid password")
        .isLength({ min: 8 })
        .trim(),
    ],
    async((req, res) => {
        try {
            const { email, password } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errMsgs = errors.array();
                res.render("../view/pages/login", { errMsgs });
            } else {
                //check if email exists in db
                const user = await db.oneOrNone(
                    "SELECT * FROM users WHERE email = $1;",
                    email
                );
                if (!user) {
                    res.redirect("/login?message=User%20does%20not%20exist.")
                } else {
                    bcrypt.compare(password, user.password, (err, result) => {
                        try {
                            if (result) {
                                req.session.userId = user.user_id;
                                req.session.userEmail = user.email;
                                res.redirect("/");
                            } else {
                                res.redirect('/login?message=Email%20or%20password%20is%20incorrect.');
                            }
                        } catch (err) {
                            console.log(err);
                            res.send(err);
                        }
                    });
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    })
);
    // 1.1 Insert validation, display error and render login page again
module.exports = router