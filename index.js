const express = require('express')
const app = express()
const PORT = process.env.PORT
const Heroku = require('heroku-client')
const heroku = new Heroku({ token: process.env.HEROKU_API_TOKEN })

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
    .insert({
      site_url: req.body.site_url,
      name: req.body.name,
      org_name: req.body.org_name,
      org_address: req.body.org_address,
      org_phone: req.body.org_phone,
      site_color_primary: req.body.site_color_primary,
      site_color_secondary: req.body.site_color_secondary,
      site_photo: req.body.site_photo,
      site_background_photo: req.body.site_background_photo
    })
  query
    .then(result => res.send(result))
    .then(data => {
      heroku.post('https://api.heroku.com/apps/cobaltcms/domains/', {body: {hostname: data.req.body.site_url}})
        .then(response => console.log(response))
        .catch(err => console.log(err))

    })
    .catch(error => res.status(404).send(error))
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })
