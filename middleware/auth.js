const { StatusCodes } = require("http-status-codes")

const authMiddleware = async (req, res, next) => {
    try {
        res.json({ msg: "auth middleware" })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = authMiddleware