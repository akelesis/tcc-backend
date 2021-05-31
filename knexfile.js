// Update with your config settings.

module.exports = {
  production: {
    client: 'mysql2',
    connection: {
      database: 'cronos',
      user: 'root',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  test: {
    client: 'sqlite3',
    connection: ":memory:",
    useNullAsDefault: true
  }
};
