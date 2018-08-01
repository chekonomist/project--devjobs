const Router = require('express').Router;
const fs = require('fs-extra')

const pageRouter = Router()

pageRouter
  .get('/', (req, res)=>{
    fs.readFile(`${__dirname}/../views/home.html`, 'utf-8')
      .then((htmlData)=>{
        res.send(htmlData)
      })
  })

module.exports = pageRouter
