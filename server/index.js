require('dotenv').config()
const express = require('express')
const session= require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env 

const app = express()

//middleware
app.use(express.json())
app.use(session({
    resave: false, 
    saveUninitialized: false, 
    secret: SESSION_SECRET
}))

//endpoints

//listening
app.listen(SERVER_PORT, ()=> console.log(`Port ${SERVER_PORT} is on and ready to copy`))