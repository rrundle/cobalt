exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('events', table => {
    table.string('site-id')
    table.string('event-name')
    table.string('location-address')
    table.string('location-city')
    table.string('location-state')
    table.string('location-zipcode')
    table.string('site-color-secondary')
    table.string('site-photo')
    table.string('site-background-photo')
    table.string('news')
    table.string('events')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('events')
  return query
}
