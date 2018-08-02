const express = require('express')
const pageRouter = require('./src/routes/pageRouter.js')
const apiRouter = require('./src/routes/apiRouter.js')

const app = express()
const PORT = 3000

app.use('/', pageRouter)
app.use('/api', apiRouter)
app.use((req, res)=>{
  res.send('<h3> 404 - big error - page no exist</h3>')
})

app.listen(PORT, ()=>{
  console.log(`App listening on localhost:${PORT}`);
})
