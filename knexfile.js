// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      user: 'nestjsdb',
      password: process.env.DB_PASSWORD,
      database: 'nestjsdb',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
