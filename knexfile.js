exports.development = {
  client: 'postgresql',
  connection: {
    user: 'ryan',
    database: 'cobalt'
  },
  migrations: {
    directory: './migrations',
    tableName: 'display_settings'
  }
}
