/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // return knex.schema.alterTable('user', function (t) {
  //   t.password('bifthday_date').alter();
  // });
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('email', 255).unique().notNullable();
    table.string('bio', 255).notNullable();
    table.string('password', 255).notNullable();
    table.string('image', 255).defaultTo('');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
