const express =require('express')
const bcrypt = require('bcryptjs')
const db = require("../database") // have not created the database js script
const { check, validationResult} = require('express-validator')
const { route } = require('./login')
const router = express.Router()


router.get('/', async(req, res) => {
    try {
        res.render("./pages/register")
    } catch (err) {
        console.log(err)
    }
})

router.post(
    '/',

    // 1. validate user data (want to include a function to check whether password confirmation haven't figured it how to do this
    // 1. Validate email and password
    [
        check("firstname", "Please enter valid firstname")
            .isLength({ min:3}),
        check("lastname", "Please enter valid lastname")
            .isLength({ min:3}),
        check("email", "Please enter valid email")
            .isEmail()
            .trim()
            .toLowerCase(),
        check("password", "Please enter valid password")
            .isLength({ min: 8 })
                .trim(),
        check("password1", "Password does not match!").custom(
            (value, { req }) => value === req.body.password
            ),
          
    ],

      // 2. check if the user already exists in the database
    async(req, res) => {
        try {
             const { firstname,lastname,email, password, password1 } = req.body;
                // const passwordError = ''
            // console.log(req.body)
            let errors = validationResult(req)
            // console.log(errors)
                
            //errors
            if (!errors.isEmpty()) {
                    const errMsgs = errors.array()
                    return res.render('./pages/register', {
                        errMsgs
                 })
            } else {
                data = await db.oneOrNone('SELECT * FROM users WHERE email=$1', email)
                if (data) {
                    res.render('./pages/register', {
                        errMsgs: [{ msg: 'User already exists' }]
                    })
                } else {
                    var salt = bcrypt.genSaltSync(10);
                    var hash = bcrypt.hashSync(password, salt);

                    db.none("INSERT INTO users (firstname,lastname, email, password) VALUES ($1,$2,$3,$4);",
                    [firstname,lastname,email,hash])   
                    .then(() => {
                        //when registration is successful, it redirects the user to the login page
                        res.render('./pages/login', {
                            
                            successMsgs: [{ msg: 'Account is created' }]
                        }) 
                    })
                    .catch(err => {
                        console.log(err);
                })
                }
            }
        } catch (err) {
            console.log(err)
       }
    
    })

module.exports = router;




//         db.oneOrNone("SELECT * FROM users WHERE email =$1,", [email]) // do we have to use cleanedEmail here or email is fine?
//     .then(userExists => {
//         if(userExists) {
//             res.redirect("/login?message=User%20already%20exists")
//         } else {
//             const salt = bcrypt.genSaltSync(10)
//             const hash = bcrypt.hashSync(password, salt)
//             const cleanedEmail = email
//             .toLowerCase()
//             .trim()

//             db.none('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4);', [firstname, lastname, cleanedEmail, hash] )
//             .then (() => {
//                 res.redirect('/login?message=User%20successfully%20created')
//             })
//             .catch((err) => {
//                 console.log(err)
//                 res.json(err)
//             })
//         }
//     }) 
//     .catch((err) => {
//         console.log(err)
//         res.json(err)
//     })
// })