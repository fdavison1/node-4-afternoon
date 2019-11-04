require('dotenv').config()
const express = require('express')
const session= require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env 
const middleware = require('./middleware/checkForSession')
const swagCTRL = require('./controllers/swagController')
const authCTRL = require('./controllers/authController')

const app = express()

//middleware
app.use(express.json())
app.use(session({
    resave: false, 
    saveUninitialized: false, 
    secret: SESSION_SECRET
}))
app.use(middleware.sessionCheck)

//endpoints
app.get('/api/swag', swagCTRL.read)

app.post('/api/login', authCTRL.login)
app.post('/api/register', authCTRL.register)
app.post('/api/signout', authCTRL.signout)
app.get('/api/user', authCTRL.getUser)

//listening
app.listen(SERVER_PORT, ()=> console.log(`Port ${SERVER_PORT} is on and ready to copy`))