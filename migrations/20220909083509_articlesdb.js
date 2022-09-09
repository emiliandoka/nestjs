/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('articlesdb', function (table) {
    table.increments('id');
    table.string('slug', 255).unique().notNullable();
    table.string('description').defaultTo('');
    table.string('body').notNullable();
    table.string('taglist').defaultTo('[]');
    table.integer('favouritesCoun').defaultTo(0);
    table.timestamps('created_at', true);
    table.timestamps('updated_at', true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('articlesdb');
};
