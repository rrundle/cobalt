
exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('sites', table => {
    table.increments('site-id')
    table.string('site-url')
    table.string('name')
    table.string('org-name')
    table.string('org-address')
    table.string('org-city')
    table.string('org-state')
    table.string('org-zipcode')
    table.string('org-phone')
    table.string('site-color-primary')
    table.string('site-color-secondary')
    table.string('site-photo')
    table.string('site-background-photo')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('sites')
  return query
}
