require('dotenv').config()

const fetch = require('node-fetch')
const prismic = require('@prismicio/client')
const prismicH = require('@prismicio/helpers')

const express = require('express')
const app = express()

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

const initApi = req =>
{
  return prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_KEY,
    req,
    fetch
  })
}

const linkResolver = doc =>
{
  return '/'
}

app.use((req, res, next) =>
{
  res.locals.Link = linkResolver
  res.locals.prismicH = prismicH

  next()
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const handleReq = async api =>
{
  const meta = await api.getSingle('metadata')

  return {
    meta
  }
}

app.get('/', async(req, res) =>
{
  const api = initApi(req)
  const defaults = await handleReq(api)
  const home = await api.getSingle('home')

  res.render('pages/home', {
    ...defaults,
    home: home.data
  })
})


app.listen(process.env.PORT, () =>
{
  console.log(`Listening at http://localhost:${process.env.PORT}`)
})
