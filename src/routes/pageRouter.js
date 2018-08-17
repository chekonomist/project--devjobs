const Router = require('express').Router;
const fs = require('fs-extra')

const pageRouter = Router()

pageRouter
  .get('/', (req, res)=>{
    res.render('home.ejs')
  })

pageRouter
  .get('/about', (req, res)=>{
    res.render('about.ejs')
  })

module.exports = pageRouter
