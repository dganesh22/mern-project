const express = require('express')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDb = require('./db/config')

const PORT = process.env.PORT

const app = express()

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middeware
app.use(cors())
app.use(cookieParser(process.env.SECRET_KEY))

// api routes
app.use(`/api/auth`, require('./route/authRoute'))


app.listen(PORT, () => {
    connectDb()
    console.log(`server is connected and running @ http://localhost:${PORT}`)
})