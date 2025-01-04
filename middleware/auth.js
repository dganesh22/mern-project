const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if (!token)
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "token not found" })

        //verify jwt token
        await jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
            if (err)
                return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: "Invalid token or Token expired" })

            // return res.status(StatusCodes.OK).json({ status: true, data })

            req.userId = data.id

            next() // used to move the data
        })

        // res.json({ msg: "auth middleware", token })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = authMiddleware