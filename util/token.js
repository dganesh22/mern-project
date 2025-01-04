const jwt = require('jsonwebtoken')

const generateToken = async (user) => {
    return jwt.sign({ id: user }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

module.exports = generateToken