
exports.up = (knex, Promise) => {
  const query = knex.schema.createTable('news', table => {
    table.string('site-id')
    table.string('content')
    table.timestamp('timestamp')
  })
  return query
}


exports.down = (knex, Promise) => {
  const query = knex.schema.dropTable('news')
  return query
}
