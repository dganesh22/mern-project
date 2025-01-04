const authRoute = require('express').Router()
const { registerUser, loginUser, logoutUser, verifyUser } = require('../controller/authController')
const authMiddleware = require('../middleware/auth')

// register 
authRoute.post(`/register`, registerUser)

// login
authRoute.post(`/login`, loginUser)

// logout
authRoute.get(`/logout`, logoutUser)

// verify user
authRoute.get(`/verify/user`, authMiddleware, verifyUser)

module.exports = authRoute