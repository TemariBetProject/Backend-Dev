const express = require('express')
const body_parser = require('body-parser')
const userRouter = require('./routes/user.route')

const app = express()

app.use(body_parser.json())

app.use('/uploads', express.static('uploads'));

app.use('/', userRouter)
module.exports = app

//This is my app.js file