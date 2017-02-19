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

app.post('/org', (req, res) => {
  const query = knex('sites')
    .where({
      site_url: `http://www.${req.body.url}.cobalt.com`
    })
    .select()
    .returning()
  query
    .then(match => res.json(match))
    .catch(error => res.status(404).send(error))
})

app.post('/site', (req, res) => {
  const query = knex('sites')
    .insert(req.body)
    .returning('site_id')
  query
    .then(result => res.send(result))
    .catch(error => res.status(404).send(error))
})

app.post('/display', (req, res) => {
  const query = knex('sites')
    .insert(req.body)
    .returning('site_id')
  query
    .then(result => res.send(result))
    .catch(error => res.status(404).send(error))
})

app.post('/dashboard', (req, res) => {
  console.log(req.body.site_id)
  const query = knex('sites')
    .where('site_id', `${req.body.site_id}`)
    .update(req.body)
  query
    .then(result => res.send(result))
    .catch(error => res.status(404).send(error))
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
