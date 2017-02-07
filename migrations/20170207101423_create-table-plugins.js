exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('plugins', table => {
    table.string('org-address')
    table.string('org-phone')
    table.string('site-color-primary')
    table.string('site-color-secondary')
    table.string('site-photo')
    table.string('site-background-photo')
    table.string('news')
    table.string('events')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('plugins')
  return query
}
