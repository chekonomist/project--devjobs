const ejs = require('ejs')
const express = require('express')

const pageRouter = require('./src/routes/pageRouter.js')
const apiRouter = require('./src/routes/apiRouter.js')

const app = express()
const PORT = 3000

app.use( express.static( `${__dirname}/public` ) )

app.engine( 'ejs', ejs.renderFile )
app.set('view engine', 'ejs')
app.set('views', `${__dirname}/src/views`)

app.use('/', pageRouter)
app.use('/api', apiRouter)
app.use((req, res)=>{
  res.render('404.ejs')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})
