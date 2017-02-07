exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('display-settings', table => {
    table.string('site-id')
    table.boolean('org-address')
    table.boolean('org-phone')
    table.boolean('site-color-primary')
    table.boolean('site-color-secondary')
    table.boolean('site-photo')
    table.boolean('site-background-photo')
    table.boolean('news')
    table.boolean('events')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('display-settings')
  return query
}
