const express = require('express')
const app = express()
const PORT = process.env.PORT

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const connex = require('knex')
const knex = connex({
  client: 'pg',
  connection: {
    user: 'ryan',
    database: 'cobalt'
  }
})

app.use(jsonParser)
app.use(express.static('public'))
app.use(express.static('modules'))
app.use(express.static('build'))


app.post('/org', (req, res) => {
  const url = req.body.url.toLowerCase()
  const query = knex('sites')
    .where({
      site_url: `http://www.cobaltcms.com/${url}`
    })
    .select()
    .returning()
  query
    .then(match => res.json(match))
    .catch(error => res.sendStatus(404).send(error))
})

app.post('/site', (req, res) => {
  const query = knex('sites')
    .insert(req.body)
    .returning('site_id')
  query
    .then(result => res.send(result))
    .catch(error => res.sendStatus(404).send(error))
})

app.post('/display', (req, res) => {
  const query = knex('display_settings')
    .insert(req.body)
    .returning('site_id')
  query
    .then(result => res.send(result))
    .catch(error => res.sendStatus(404).send(error))
})

app.post('/dash', (req, res) => {
  console.log(req.body)
  const query = knex('sites')
    .where({
      site_url: req.body.site_url
    })
    .update(req.body)
  query
    .then(result => res.send(result))
    .catch(error => res.sendStatus(404).send(error))
})

app.post('/news', (req,res) => {
  console.log(req.body)
  const query = knex('news')
    .insert(req.body)
    .returning('content')
  query
    .then(result => res.send(result))
    .catch(error => res.sendStatus(404).send(error))
})

app.post('/occasion', (req,res) => {
  console.log(req.body)
  const query = knex('events')
    .insert(req.body)
    .returning(['event_name', 'event_date', 'event_start_time', 'event_end_time', 'location_address', 'location_city', 'location_state', 'location_zipcode', 'details', 'happened'])
  query
    .then(result => res.send(result))
    .catch(error => res.sendStatus(404).send(error))
})

app.post('/posts', (req, res) => {
  const query = knex('news')
    .where(knex.raw('site_id = ' + req.body.site_id))
    .select('content', 'happened')
  query
    .then(result => res.send(result))
})

app.post('/incident', (req, res) => {
  const query = knex('events')
    .where(knex.raw('site_id = ' + req.body.site_id))
    .select('event_name', 'event_date', 'location_address', 'location_city', 'location_state', 'location_zipcode', 'details', 'happened')
  query
    .then(result => res.send(result))
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
