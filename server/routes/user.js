const express = require('express')

const {userLogin , userSignup} = require('../controllers/userController')

const router = express.Router();

//loginRoute
router.post('/login', userLogin )

//signupRoute
router.post('/signup', userSignup)

module.exports = router