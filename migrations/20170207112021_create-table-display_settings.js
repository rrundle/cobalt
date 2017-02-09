
exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('display_settings', table => {
    table.string('site_id')
    table.boolean('org_address')
    table.boolean('org_phone')
    table.boolean('site_color_primary')
    table.boolean('site_color_secondary')
    table.boolean('site_photo')
    table.boolean('site_background_photo')
    table.boolean('news')
    table.boolean('events')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('display-settings')
  return query
}
