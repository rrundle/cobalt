
exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('sites', table => {
    table.increments('site_id')
    table.string('site_url')
    table.string('name')
    table.string('org_name')
    table.string('org_address')
    table.string('org_city')
    table.string('org_state')
    table.string('org_zipcode')
    table.string('org_phone')
    table.string('site_color_primary')
    table.string('site_color_secondary')
    table.string('site_photo')
    table.string('site_background_photo')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('sites')
  return query
}
