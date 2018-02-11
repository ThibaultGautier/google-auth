const express = require("express")
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./models/GoogleUsers')
require('./services/passport')

mongoose.connect("mongodb://titi:titi@ds225308.mlab.com:25308/google-auth")

const app = express()

app.use(
    cookieSession({
        maxAge: 60 * 60 * 1000,
        keys: ['kspoefksepofk']
    })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)