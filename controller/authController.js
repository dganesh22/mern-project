const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const generateToken = require('../util/token')

// home controller
const homeController = async (req, res) => {
    try {
        res.json({ msg: "home controor" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// register user constroller
const registerUser = async (req, res) => {
    try {
        let { email, mobile, password } = req.body

        // validate the email
        let exEmail = await User.findOne({ email })
        if (exEmail)
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${email} is already registered..` })

        // validate the mobile
        let exMobile = await User.findOne({ mobile })
        if (exMobile)
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `${mobile} already registered..` })

        // encrypt the password
        let encPass = await bcrypt.hash(password, 10)

        // validate the model
        let newUser = await User({
            ...req.body,
            password: encPass
        })

        newUser.save()

        res.status(StatusCodes.ACCEPTED).json({
            status: true,
            msg: "new user registered successfully",
            user: newUser
        })


    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// login user controller
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        // email exists or not
        let exEmail = await User.findOne({ email })
        if (!exEmail)
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `requested ${email} not found` })

        // compare the passwords
        let isMatch = await bcrypt.compare(password, exEmail.password)
        if (!isMatch)
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: `invalid password` })

        // generate auth token
        let token = await generateToken(exEmail._id)

        // store the token in cookies
        res.cookie("auth_token", token, {
            httpOnly: true,
            signed: true,
            path: `/`,
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        res.status(StatusCodes.OK).json({ status: true, msg: "login successful", token })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// logout user controller
const logoutUser = async (req, res) => {
    try {
        // clear the cookie
        res.clearCookie("auth_token", { path: "/" })

        res.status(StatusCodes.OK).json({ status: true, msg: "logout successfully" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}


// validate user
const verifyUser = async (req, res) => {
    try {

        let exUser = await User.findById(req.userId).select('-password')

        if (!exUser)
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `requested user id not found` })

        res.status(StatusCodes.ACCEPTED).json({ msg: "verified successfully", user: exUser })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// default controller
const defaultController = async (req, res) => {
    try {
        res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "requested path or data not found " })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { homeController, registerUser, loginUser, logoutUser, verifyUser, defaultController }