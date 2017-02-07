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
  var query = knex('sites')
    .where({
      site_url: `http://www.${req.body.url}.cobalt.com`
    })
    .select()
    .returning()
  query
    .then(match => res.json(match))
    .catch(error => res.send('Sorry, couldn\'t check that', error))
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
