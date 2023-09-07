/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('news', (table) => {
    table.increments('id');
    table.string('banner');
    table.string('title');
    table.text('content');
    table.text('content_raw');
    table.integer('category_id').references('id').inTable('categories');
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTable('news');
}
