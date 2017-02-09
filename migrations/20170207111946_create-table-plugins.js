
exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('plugins', table => {
    table.string('org_address')
    table.string('org_phone')
    table.string('site_color_primary')
    table.string('site_color_secondary')
    table.string('site_photo')
    table.string('site_background_photo')
    table.string('news')
    table.string('events')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('plugins')
  return query
}
