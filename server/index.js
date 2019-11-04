require('dotenv').config()
const express = require('express')
const session= require('express-session')
const {SERVER_PORT, SESSION_SECRET} = process.env 
const middleware = require('./middleware/checkForSession')
const swagCTRL = require('./controllers/swagController')
const authCTRL = require('./controllers/authController')
const cartCTRL = require('./controllers/cartController')
const searchCTRL = require('./controllers/searchController')

const app = express()

//middleware --------------------------------------
app.use(express.json())
app.use(session({
    resave: false, 
    saveUninitialized: false, 
    secret: SESSION_SECRET
}))
app.use(middleware.sessionCheck)
app.use(express.static(`${__dirname}/../build`))
// app.use(express.static(`${__dirname}/../build`))

//endpoints: ----------------------------------------

//SWAG CTRL
app.get('/api/swag', swagCTRL.read)
//AUTH CTRL
app.post('/api/login', authCTRL.login)
app.post('/api/register', authCTRL.register)
app.post('/api/signout', authCTRL.signout)
app.get('/api/user', authCTRL.getUser)
//CART CTRL
app.post('/api/cart/checkout', cartCTRL.checkout)
app.post('/api/cart/:id', cartCTRL.add)
app.delete('/api/cart/:id', cartCTRL.delete)
//SEARCH CTRL
app.get('/api/search', searchCTRL.search)

//listening --------------------------------------------
app.listen(SERVER_PORT, ()=> console.log(`Port ${SERVER_PORT} is on and ready to copy`))