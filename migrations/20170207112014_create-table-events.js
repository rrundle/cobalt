exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('events', table => {
    table.string('site_id')
    table.string('event_name')
    table.string('event_date')
    table.string('location_address')
    table.string('location_city')
    table.string('location_state')
    table.string('location_zipcode')
    table.string('details')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('events')
  return query
}
