const authRoute = require('express').Router()
const { registerUser, loginUser, logoutUser, verifyUser } = require('../controller/authController')

// register 
authRoute.post(`/register`, registerUser)

// login
authRoute.post(`/login`, loginUser)

// logout
authRoute.get(`/logout`, logoutUser)

// verify user
authRoute.get(`/verify/user`, verifyUser)

module.exports = authRoute