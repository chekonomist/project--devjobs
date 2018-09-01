const ejs = require('ejs')
const express = require('express')

const knex = require('knex')
const { Model } = require('objection')

const bodyParser = require('body-parser')

const passport = require('passport')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser')

const registerLocalStrategy = require('./src/middleware/passport-local--registerLocalStrategy.js')
const { configDeserializeUser, configSerializeUser } = require('./src/helpers/passport-local--sessionActions.js')


const dbConfigObj = require('./knexfile.js')

const pageRouter = require('./src/routes/pageRouter.js')
const apiRouter = require('./src/routes/apiRouter.js')

const authRouter = require('./src/routers/authRouter.js')

const app = express()
const PORT = 3000

// Cookie Parse + Cookie Session middleware
app.use(cookieParser())
app.use(cookieSession({
  name: 'cookiemonster',
  secret: 'superdupersupersecret',
  httpOnly: true,
  signed: false
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
passport.use(registerLocalStrategy())
passport.serializeUser(configSerializeUser())
passport.deserializeUser(configDeserializeUser())

//Knex
const appDb = knex(dbConfigObj.development)
Model.knex(appDb)
app.locals.db = appDb

app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

app.use( express.static( `${__dirname}/public` ) )

app.engine( 'ejs', ejs.renderFile )
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/src/views`)

app.use('/', pageRouter)
app.use('/api', apiRouter)
app.use('/auth', authRouter)

app.use((req, res)=>{
  res.render('404.ejs')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})
